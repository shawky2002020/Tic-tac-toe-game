import { Component } from '@angular/core';
import { GameService } from '../services/ai.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(public gameservice:GameService){}
  bool:boolean=true;
  options:boolean=true;
  gameup:boolean=true; //board up
  displaygame(){
    this.options=!this.options
  }
}
