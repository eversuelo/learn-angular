import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface MenuItem {
  label: string;
  path: string;
  exact: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('01_learn_angular');

  // Menu dinamico: agrega, quita o reordena enlaces cambiando solo este signal.
  protected readonly menuItems = signal<MenuItem[]>([
    { label: 'Inicio', path: '/', exact: true },
    { label: 'ToDo CRUD', path: '/todo', exact: false },
    { label: 'Contador', path: '/counter', exact: false }
  ]);
}
