import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PizzaAppComponent } from '../pizza/pizza-app/pizza-app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Hello World!';
}
