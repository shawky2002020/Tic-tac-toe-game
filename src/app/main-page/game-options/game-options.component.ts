import { Component, EventEmitter, Output } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css'
})
export class GameOptionsComponent {
  mode!:string;
  modebool:boolean=true; //to show playgame button after selecting mode


  modesave($event:string){
    this.mode=$event;
    this.modebool=!this.modebool;
    
  }
  bool:boolean=true;
  toogle(){
    this.bool=!this.bool;
  }


  @Output () playnow = new EventEmitter<void>();
  play(){
    this.playnow.emit();
  }
}
