import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Channel1Component } from './channel1/channel1.component';
import { Channel2Component } from './channel2/channel2.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'channel1', component: Channel1Component },
  { path: 'channel2', component: Channel2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
