import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';

const routes: Routes = [
  {path: '', redirectTo: '/main-menu', pathMatch: 'full'},
  // // otherwise redirect to home
  // { path: '**', redirectTo: '' },
  {path: 'main-menu', component: MainMenuComponent},
  {path: 'rooms', component: RoomsComponent},
  { path: 'detail/:name', component: RoomDetailComponent },
  {path: 'in-game-screen', component: InGameScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
