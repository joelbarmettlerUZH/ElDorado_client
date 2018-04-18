import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
// import {LoginComponent} from './login/login.component';
// import {routing} from './app.routing';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {FormsModule} from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SelectCharacterComponent } from './main-menu/select-character/select-character.component';
import { TitleComponent } from './main-menu/title/title.component';
import { ButtonsComponent } from './main-menu/buttons/buttons.component';
import { InGameScreenComponent } from './in-game-screen/in-game-screen.component';
import { OpponentBoardComponent } from './in-game-screen/opponent-board/opponent-board.component';
import { PlayerBoardComponent } from './in-game-screen/player-board/player-board.component';
import { SettingsBoardComponent } from './in-game-screen/settings-board/settings-board.component';
import { MarketplaceComponent } from './in-game-screen/marketplace/marketplace.component';
import { CardBoardComponent } from './in-game-screen/card-board/card-board.component';
import { CardSlotComponent } from './in-game-screen/card-slot/card-slot.component';
import { ButtonBoardComponent } from './in-game-screen/button-board/button-board.component';
import { CardComponent } from './in-game-screen/card/card.component';
import { MarketSlotComponent } from './in-game-screen/market-slot/market-slot.component';
import { MarketboardComponent } from './in-game-screen/marketboard/marketboard.component';
import { MarketreserveComponent } from './in-game-screen/marketreserve/marketreserve.component';
import { AppRoutingModule } from './app-routing.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomService} from './shared/services/room.service';
import { HttpClientModule} from '@angular/common/http';
import { HostComponent } from './host/host.component';
import { MainMenuButtonBoardComponent } from './main-menu/main-menu-button-board/main-menu-button-board.component';
import { HostButtonsComponent } from './main-menu/host-buttons/host-buttons.component';
import { MainMenuButtonsComponent } from './main-menu/main-menu-buttons/main-menu-buttons.component';
import { BoardComponent } from './in-game-screen/map/board/board.component';
import { HexspaceComponent } from './in-game-screen/map/hexspace/hexspace.component';
import { BoardService} from './shared/services/board.service';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
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
    CardBoardComponent,
    CardSlotComponent,
    ButtonBoardComponent,
    CardComponent,
    MarketSlotComponent,
    MarketboardComponent,
    MarketreserveComponent,
    RoomsComponent,
    RoomDetailComponent,
    HostComponent,
    MainMenuButtonBoardComponent,
    HostButtonsComponent,
    MainMenuButtonsComponent,
    BoardComponent,
    HexspaceComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // routing,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, AuthGuardService, RoomService, BoardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
