import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { FooterModule } from './shared/footer/footer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { AppComponent } from './app.component';
import { ROCK_CHAIN_ROUTES } from './routes';
import { HomepageComponent } from './pages/homepage/homepage';
import { NavBarComponent } from './shared/navbar/navbar';
import { NowPlayingComponent } from './cards/now-playing/now-playing.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WalletComponent } from './cards/wallet/wallet.component';
import { CharityStandingsComponent } from './cards/charity-standings/charity-standings.component';
import { SongFeedbackComponent } from './dialogs/song-feedback/song-feedback.component';
import { RegistrationComponent, RegistrationDialogComponent } from './cards/registration/registration.component';
import { WagerService } from './services/wager.service';
import { BlockchainService } from './services/blockchain.service';
import { CharityService } from './services/charity.service';
import { RegisterService } from './services/register.service';
import { WalletStandingsComponent } from './cards/wallet-standings/wallet-standings.component';
import { BetListComponent } from './cards/bet-list/bet-list.component';
import { FaqComponent } from './cards/faq/faq.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { PlayingComponent } from './pages/playing/playing.component';
import { BetPlacementComponent } from './cards/bet-placement/bet-placement.component';
import { LoginPageComponent } from './pages/loginpage/loginpage.component';
import { LoginComponent } from './cards/login/login.component';
import { CurrentRoundComponent } from './cards/current-round/current-round.component';
import { BetsComponent } from './pages/bets/bets.component';

import {
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NowPlayingComponent,
        HomeComponent,
        AboutComponent,
        WalletComponent,
        CharityStandingsComponent,
        HomepageComponent,
        NavBarComponent,
        RegistrationComponent,
        RegistrationDialogComponent,
        SongFeedbackComponent,
        WalletStandingsComponent,
        BetListComponent,
        FaqComponent,
        StandingsComponent,
        PlayingComponent,
        BetPlacementComponent,
        LoginPageComponent,
        LoginComponent,
        CurrentRoundComponent,
        BetsComponent
    ],
    entryComponents: [
        SongFeedbackComponent,
        RegistrationComponent,
        RegistrationDialogComponent,
        HomepageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatGridListModule,
        MatTabsModule,
        FooterModule,
        RouterModule.forRoot(ROCK_CHAIN_ROUTES),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpModule
    ],
    providers: [
        WagerService,
        BlockchainService,
        RegisterService,
        CharityService,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
