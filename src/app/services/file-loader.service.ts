import { Injectable } from '@angular/core';

import * as playlist1 from 'src/assets/playlists/playlist1.json'
import * as playlist2 from 'src/assets/playlists/playlist2.json'
import * as schedule1 from 'src/assets/schedules/schedule1.json'
import * as schedule2 from 'src/assets/schedules/schedule2.json'

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {  

  constructor() { }

  load_playlist(playlist_selector:number) { 
    const pl = this.select_playlist(playlist_selector);   
    // Get the index of the JSON import which contains the valid array data
    let index = Object.keys(pl).length - 1;
    // Return that data to a playlist array
    const playlist = Object.values(pl)[index];
    return playlist;
  }

  select_playlist(playlist_selector:number) {
    if(playlist_selector == 1) {
      return playlist1;
    } else if(playlist_selector == 2) {
      return playlist2;
    } else {
      return playlist1;
    }
  }

  load_schedule(schedule_selector:number) { 
    const s = this.select_schedule(schedule_selector);   
    // Get the index of the JSON import which contains the valid array data
    let index = Object.keys(s).length - 1;
    // Return that data to a playlist array
    const schedule = Object.values(s)[index];
    return schedule;
  }

  select_schedule(schedule_selector:number) {
    if(schedule_selector == 1) {
      return schedule1;
    } else if(schedule_selector == 2) {
      return schedule2;
    } else {
      return schedule1;
    }
  }
}
