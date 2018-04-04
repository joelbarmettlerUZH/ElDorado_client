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
import { MapComponent } from './in-game-screen/map/map.component';
import { CardBoardComponent } from './in-game-screen/card-board/card-board.component';
import { CardSlotComponent } from './in-game-screen/card-slot/card-slot.component';
import { ButtonBoardComponent } from './in-game-screen/button-board/button-board.component';
import { CardComponent } from './in-game-screen/card/card.component';
import { MarketSlotComponent } from './in-game-screen/market-slot/market-slot.component';
import { MarketboardComponent } from './in-game-screen/marketboard/marketboard.component';
import { MarketreserveComponent } from './in-game-screen/marketreserve/marketreserve.component';
import { AppRoutingModule } from './/app-routing.module';


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
    MarketplaceComponent,
    MapComponent,
    CardBoardComponent,
    CardSlotComponent,
    ButtonBoardComponent,
    CardComponent,
    MarketSlotComponent,
    MarketboardComponent,
    MarketreserveComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AppRoutingModule
  ],
  providers: [AuthenticationService, AuthGuardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
