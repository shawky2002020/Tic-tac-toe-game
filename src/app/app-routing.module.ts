import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { GameOptionsComponent } from './main-page/game-options/game-options.component';


const routes: Routes = [
  { path: '', component: GameOptionsComponent }, // Home route
  { path: '**', redirectTo: '' } // Redirect any unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
