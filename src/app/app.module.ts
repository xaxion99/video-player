import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { Channel1Component } from './channel1/channel1.component';
import { Channel2Component } from './channel2/channel2.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayerComponent } from './player/player.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    Channel1Component,
    NavigationComponent,
    Channel2Component,
    PlayerComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
