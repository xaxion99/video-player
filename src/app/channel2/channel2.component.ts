import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';

import 'videojs-playlist';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.js';
import videojs from 'video.js';

import { DateTimeConverterService } from '../services/date-time-converter.service';
import { SchedulesService } from '../services/schedules.service';
import { FileLoaderService } from '../services/file-loader.service';

@Component({
  selector: 'app-channel2',
  templateUrl: './channel2.component.html',
  styleUrls: ['./channel2.component.scss']
})
export class Channel2Component implements OnInit, DoCheck, OnDestroy {
  video: any;
  player: any;
  start_time: any;
  current_time: any;
  offset:number = 0;
  interval:string = "30_min";

  constructor(
    private dtc: DateTimeConverterService,
    private fl: FileLoaderService,
    private s: SchedulesService
  ) { }

  ngOnInit(): void {
    this.start_time = new Date();
    
    this.video = document.getElementById('player');
    this.player = videojs('player');

    // Set the playlist and then start loop
    const pl:any = this.fl.load_schedule(1);
    this.player.playlist(pl);
    this.player.playlist.repeat(true);

    // Create the Playlist UI
    this.player.playlistUi();
    
    // Setup the initial video
    let val = this.s.init_schedule(this.start_time, this.interval, this.offset);
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
      const time_since_start = ((this.current_time.getMinutes() % 30) * 60) + this.current_time.getSeconds();
      if( time_since_start > diff) {
        this.player.currentTime(time_since_start - diff);
      }
    } else {
      console.log("First");
      this.player.playlist.first(); // Play the first video in the playlist
    }

    // Play through the playlist automatically
    // this.player.playlist.autoadvance(0);
  }

  ngDoCheck(): void {
    this.current_time = new Date();

    let val = this.s.get_schedule(this.current_time, this.interval, this.offset);
    
    if(this.s.get_flag()) {
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
