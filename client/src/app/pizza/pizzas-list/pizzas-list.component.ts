import { Component, OnInit, WritableSignal } from '@angular/core';
import { Pizza } from '../../pizza/pizza-interface';
import { PizzaService } from '../../shared/services/pizza.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pizzas-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  //[datasource]="pizzas$()" is the signal we created in the service
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Pizzas List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="pizzas$()">
          <ng-container matColumnDef="col-size">
            <th mat-header-cell *matHeaderCellDef>Size</th>
            <td mat-cell *matCellDef="let element">{{ element.size }}</td>
          </ng-container>
          <ng-container matColumnDef="col-toppings">
            <th mat-header-cell *matHeaderCellDef>Toppings</th>
            <td mat-cell *matCellDef="let element">{{ element.toppings }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deletePizza(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['add-pizza']">
          Add a New Pizza
        </button>
      </mat-card-actions>
    </mat-card>
    <router-outlet></router-outlet>
  `,
})
export class PizzasListComponent implements OnInit {
  pizzas$ = {} as WritableSignal<Pizza[]>;
  displayedColumns: string[] = [
    'col-size',
    'col-toppings',
    'col-action',
  ];

  constructor(private pizzasService: PizzaService) {}

  ngOnInit() {
    this.fetchPizzas();
  }

  /**
   * 
   * after a Pizza is deleted
   *       next: () => this.fetchPizzas()
   * it calls the fetchPizzas method to refresh the list
   */

  deletePizza(id: string): void {
    this.pizzasService.deletePizza(id).subscribe({
      next: () => this.fetchPizzas(),
    });
  }

  private fetchPizzas(): void {
    this.pizzas$ = this.pizzasService.pizzas$;
    this.pizzasService.getPizzas();
  }
}