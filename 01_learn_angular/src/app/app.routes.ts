import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

    {
        path: "counter",
        component: CounterPageComponent

    },
    {
        path:"**",
        component:NotFoundComponent
    }
];
