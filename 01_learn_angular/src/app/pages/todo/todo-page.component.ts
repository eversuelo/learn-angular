import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, afterNextRender, computed, effect, inject, signal } from '@angular/core';

type TodoFilter = 'all' | 'active' | 'completed';

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {
  private readonly storageKey = 'learn-angular.todos';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly storageReady = signal(false);

  // signal guarda el estado principal: la lista completa de tareas.
  protected readonly todos = signal<TodoItem[]>([]);
  protected readonly newTitle = signal('');
  protected readonly editTitle = signal('');
  protected readonly editingId = signal<number | null>(null);
  protected readonly filter = signal<TodoFilter>('all');

  // computed deriva datos desde otros signals sin duplicar estado.
  protected readonly pendingCount = computed(
    () => this.todos().filter((todo) => !todo.completed).length
  );
  protected readonly completedCount = computed(
    () => this.todos().filter((todo) => todo.completed).length
  );
  protected readonly visibleTodos = computed(() => {
    const currentFilter = this.filter();

    if (currentFilter === 'active') {
      return this.todos().filter((todo) => !todo.completed);
    }

    if (currentFilter === 'completed') {
      return this.todos().filter((todo) => todo.completed);
    }

    return this.todos();
  });

  constructor() {
    if (this.isBrowser) {
      afterNextRender(() => {
        this.loadTodos();
        this.storageReady.set(true);
      });
    }

    effect(() => {
      const todos = this.todos();
      const storageReady = this.storageReady();

      if (this.isBrowser && storageReady) {
        localStorage.setItem(this.storageKey, JSON.stringify(todos));
      }
    });
  }

  protected updateNewTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newTitle.set(input.value);
  }

  protected updateEditTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.editTitle.set(input.value);
  }

  // CREATE: agrega una tarea nueva al estado.
  protected createTodo(): void {
    const title = this.newTitle().trim();

    if (!title) {
      return;
    }

    const now = new Date().toISOString();
    const todo: TodoItem = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now
    };

    this.todos.update((todos) => [todo, ...todos]);
    this.newTitle.set('');
  }

  // READ: la lectura ocurre en el template usando visibleTodos().
  protected setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  // UPDATE: cambia el estado completed de una tarea.
  protected toggleTodo(id: number): void {
    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  }

  protected startEdit(todo: TodoItem): void {
    this.editingId.set(todo.id);
    this.editTitle.set(todo.title);
  }

  // UPDATE: guarda el nuevo texto editado.
  protected saveEdit(id: number): void {
    const title = this.editTitle().trim();

    if (!title) {
      return;
    }

    this.todos.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, updatedAt: new Date().toISOString() } : todo
      )
    );
    this.cancelEdit();
  }

  protected cancelEdit(): void {
    this.editingId.set(null);
    this.editTitle.set('');
  }

  // DELETE: elimina una tarea por id.
  protected deleteTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  protected deleteCompleted(): void {
    this.todos.update((todos) => todos.filter((todo) => !todo.completed));
  }

  private loadTodos(): void {
    if (!this.isBrowser) {
      return;
    }

    const rawTodos = localStorage.getItem(this.storageKey);

    if (!rawTodos) {
      return;
    }

    try {
      const parsedTodos = JSON.parse(rawTodos) as TodoItem[];

      if (Array.isArray(parsedTodos)) {
        this.todos.set(parsedTodos);
      }
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }
}
