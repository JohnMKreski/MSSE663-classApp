import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaFormComponent } from '../pizza-form/pizza-form.component';
import { Pizza } from '../pizza-interface';
import { PizzaService } from '../pizza.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-pizza',
  standalone: true,
  imports: [PizzaFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Pizza</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-pizza-form
          (formSubmitted)="addPizza($event)"
        ></app-pizza-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddPizzaComponent {
  constructor(
    private router: Router,
    private pizzaService: PizzaService
  ) {}

  addPizza(pizza: Pizza) {
    this.pizzaService.createPizza(pizza).subscribe({
      next: () => {
        this.router.navigate(['/pizzas-list']).then(() => {
          window.location.reload()
        });;
      },
      error: (error) => {
        alert('Failed to create pizza');
        console.error(error);
      },
    });
    this.pizzaService.getPizzas();
  }
}