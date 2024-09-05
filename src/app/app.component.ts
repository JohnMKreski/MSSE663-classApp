import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./nav-bar/nav-bar.component";

//Components for all of the app
//add components to the imports that are sharedover the entire app
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
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
