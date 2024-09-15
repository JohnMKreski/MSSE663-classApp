import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Pizza } from '../pizza-interface';

@Component({
  selector: 'app-pizza-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .pizza-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="pizza-form"
      autocomplete="off"
      [formGroup]="pizzaForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Size</mat-label>
        <input matInput placeholder="Size" formControlName="size" required />
        @if (size.invalid) {
        <mat-error>Size must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Toppings</mat-label>
        <input
          matInput
          placeholder="Toppings"
          formControlName="toppings"
          required
        />
        @if (toppings.invalid) {
        <mat-error>Toppings must be at least 5 char long</mat-error>
        }
      </mat-form-field>

      <!-- <mat-radio-group formControlName="level" aria-label="Select an option">
        <mat-radio-button name="level" value="junior" required 
          >Junior</mat-radio-button
        >
        <mat-radio-button name="level" value="mid"
          >Mid</mat-radio-button
        >
        <mat-radio-button name="level" value="senior"
          >Senior</mat-radio-button
        >
      </mat-radio-group> -->
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="pizzaForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})

export class PizzaFormComponent {
  initialState = input<Pizza>();

  pizzaForm: any;
  
  @Output()
  formValuesChanged = new EventEmitter<Pizza>();
  
  @Output()
  formSubmitted = new EventEmitter<Pizza>();
  
  
  constructor(private formBuilder: FormBuilder) {
    this.pizzaForm = this.formBuilder.group({
      size: ['', [Validators.required, Validators.minLength(3)]],
      toppings: ['', [Validators.required, Validators.minLength(5)]]
      // level: ['junior', [Validators.required]],
    });
    effect(() => {
      this.pizzaForm.setValue({
        size: this.initialState()?.size || '',
        toppings: this.initialState()?.toppings || '',
      });
    });
  }

  get size() {
    return this.pizzaForm.get('size')!;
  }
  get toppings() {
    return this.pizzaForm.get('toppings')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.pizzaForm.value as Pizza);
  }
}