import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { PizzasListComponent } from './pizzas-list/pizzas-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';



//Components for all of the app
//add components to the imports that are sharedover the entire app
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hello World (app.component.ts)!';

  // @HostListener('window:scroll')
  // onScroll() {
  //   console.log("Scrolling")
  // }
  // @HostListener('contextmenu')
  // orRightClick(event: any) {
  //  // event.preventDefault();
  // }
}
