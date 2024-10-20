import { Component, OnInit, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaFormComponent } from '../../pizza/pizza-form/pizza-form.component';
import { Pizza } from '../../pizza/pizza-interface';
import { PizzaService } from '../../shared/services/pizza.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-pizza',
  standalone: true,
  imports: [PizzaFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit a Pizza</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-pizza-form
          [initialState]="pizza()"
          (formSubmitted)="editPizza($event)"
        ></app-pizza-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditPizzaComponent implements OnInit {
  pizza = {} as WritableSignal<Pizza>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pizzaService: PizzaService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.pizzaService.getPizza(id!);
    this.pizza = this.pizzaService.pizza$;
  }

  editPizza(pizza: Pizza) {
    this.pizzaService
      .updatePizza(this.pizza()._id || '', pizza)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Failed to update pizza');
          console.error(error);
        },
      });
  }
}