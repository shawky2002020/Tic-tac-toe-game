import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './main-page/board/board.component';
import { CellComponent } from './main-page/board/cell/cell.component';
import { GameOptionsComponent } from './main-page/game-options/game-options.component';
import { ModeComponent } from './main-page/game-options/mode/mode.component';
import { DifficultyComponent } from './main-page/game-options/difficulty/difficulty.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrialComponent } from './trial/trial.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './partials/start/start.component';
import { HeaderComponent } from './partials/header/header.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    GameOptionsComponent,
    ModeComponent,
    DifficultyComponent,
    MainPageComponent,
    TrialComponent,
    StartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      newestOnTop:false,
      preventDuplicates:true,
      progressBar: true,
    }), // ToastrModule added
    // Other modules
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
