import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  bool:boolean=true;
  options:boolean=true;
  gameup:boolean=true; //board up
  displaygame(){
    this.options=!this.options
  }
}
