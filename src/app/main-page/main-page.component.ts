import { Component } from '@angular/core';
import { GameService } from '../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MainPageComponent {

  constructor(public gameservice:GameService,private router: Router){}
  bool:boolean=true;
  options:boolean=true;
  gameup:boolean=true; //board up
  displaygame(){
    this.options=!this.options
  }
  
}
