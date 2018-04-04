import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';

const routes: Routes = [
  { path: 'InGameScreen', component: InGameScreenComponent },
  // { path: '', redirectTo: '/InGameScreen', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
