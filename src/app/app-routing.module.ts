import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Channel1Component } from './channel1/channel1.component';
import { Channel2Component } from './channel2/channel2.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'channel1', component: Channel1Component, canActivate: [AuthGuard] },
  { path: 'channel2', component: Channel2Component, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
