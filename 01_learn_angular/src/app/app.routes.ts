import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TodoPageComponent } from './pages/todo/todo-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'todo',
    component: TodoPageComponent
  },
  {
    path: 'counter',
    component: CounterPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
