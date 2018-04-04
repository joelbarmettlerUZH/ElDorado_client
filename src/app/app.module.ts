import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './shared/services/user.service';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SelectCharacterComponent } from './main-menu/select-character/select-character.component';
import { TitleComponent } from './main-menu/title/title.component';
import { ButtonsComponent } from './main-menu/buttons/buttons.component';
import { InGameScreenComponent } from './in-game-screen/in-game-screen.component';
import { OpponentBoardComponent } from './in-game-screen/opponent-board/opponent-board.component';
import { PlayerBoardComponent } from './in-game-screen/player-board/player-board.component';
import { SettingsBoardComponent } from './in-game-screen/settings-board/settings-board.component';
import { MarketplaceComponent } from './in-game-screen/marketplace/marketplace.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    MainMenuComponent,
    SelectCharacterComponent,
    TitleComponent,
    ButtonsComponent,
    InGameScreenComponent,
    OpponentBoardComponent,
    PlayerBoardComponent,
    SettingsBoardComponent,
    MarketplaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [AuthenticationService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
