import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PizzaAppComponent } from './pizza/pizza-app/pizza-app.component';
import { AboutComponent } from './about/about.component';
import { PizzasListComponent } from './pizza/pizzas-list/pizzas-list.component';
import { AddPizzaComponent } from './pizza/add-pizza/add-pizza.component';
import { EditPizzaComponent } from './pizza/edit-pizza/edit-pizza.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'pizzas',
    component: PizzaAppComponent,
  },
  {
    path: 'pizzas-list',
    component: PizzasListComponent,
    title: 'Pizza List',
    children: [
      {
        path: 'add-pizza',
        component: AddPizzaComponent,
      },
      {
        path: 'edit/:id',
        component: EditPizzaComponent,
      },
    ]
  },

  {
    path: 'about',
    component: AboutComponent,
  },
];
