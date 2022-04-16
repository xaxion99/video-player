import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'videojs-playlist';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.js';
import videojs from 'video.js';

import { AuthService } from '../services/auth.service';
import { DateTimeConverterService } from '../services/date-time-converter.service';
import { FileLoaderService } from '../services/file-loader.service';
import { SchedulesService } from '../services/schedules.service';

@Component({
  selector: 'app-channel1',
  templateUrl: './channel1.component.html',
  styleUrls: ['./channel1.component.scss']
})

export class Channel1Component implements OnInit, DoCheck, OnDestroy {
  video: any;
  player: any;
  start_time: any;
  current_time: any;
  offset:number = 0;
  interval:number = 30;
  manual = false;
  playlist = 1;
  schedule = 1;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dtc: DateTimeConverterService,
    private fl: FileLoaderService,
    private s: SchedulesService
  ) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()) {
      this.start_time = new Date();
    
      this.video = document.getElementById('player');
      this.player = videojs('player');

      // Set the playlist and then start loop
      const pl:any = this.fl.load_playlist(this.playlist);
      this.player.playlist(pl);
      this.player.playlist.repeat(true);

      // Create the Playlist UI
      this.player.playlistUi();

      let val:number;
      if(this.manual == true) {
        const sched = this.fl.load_schedule(this.schedule);
        val = this.s.init_manual_schedule(this.start_time, sched, this.offset);
      } else {
        val = this.s.init_schedule(this.start_time, this.interval, this.offset);
      }
      val = val % pl.length; // Used to repeat playlist to eliminate downtime

      if(val > -1) {
        console.log(val);
        this.player.playlist.currentItem(val); // Play the chosen index in the playlist
        this.player.play();
        this.player.controlBar.progressControl.disable();
        
        // Get the correct video placement N.B. Software currently considers gap part of play 
        // time an thus will restart full video if within differential
        const diff = 1800 - pl[val].duration;
        this.current_time = new Date();
        const time_since_start = ((this.current_time.getMinutes() % this.interval) * 60) + this.current_time.getSeconds();  // I think its fixed
        if( time_since_start > diff) {
          this.player.currentTime(time_since_start - diff);
        }
      } else {
        console.log("First");
        this.player.playlist.first(); // Play the first video in the playlist
      }

      // Play through the playlist automatically
      // this.player.playlist.autoadvance(0);
    } else {
      this.router.navigate(['']);
    }
  }

  ngDoCheck(): void {
    this.current_time = new Date();
    const pl:any = this.fl.load_playlist(this.playlist);

    let val:number;
    if(this.manual == true) {
      const sched = this.fl.load_schedule(this.schedule);
      val = this.s.get_manual_schedule(this.current_time, sched, this.offset);
    } else {
      val = this.s.get_schedule(this.current_time, this.interval, this.offset);
    }
    val = val % pl.length; // Used to repeat playlist to eliminate downtime
    
    if(this.s.get_flag() && this.manual == false) {
      if(val > -1) {
        console.log(val);
      }
      this.player.playlist.currentItem(val);
      this.player.play();
      this.player.controlBar.progressControl.disable();
    } else if(this.s.get_manual_flag() && this.manual == true) {
      if(val > -1) {
        console.log(val);
      }
      this.player.playlist.currentItem(val);
      this.player.play();
      this.player.controlBar.progressControl.disable();
    }
  }

  ngOnDestroy() {
    this.player.dispose();
  }
}
