import { Component, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../../services/ai.service';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-mode',
  templateUrl: './mode.component.html',
  styleUrl: './mode.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class ModeComponent {
  mode: string = '';
  @Output() modeclicked = new EventEmitter<string>();
  constructor(public gameservice:GameService){
    
  }

  save(mode:string){
    this.gameservice.saveMode(mode);
  }
}
