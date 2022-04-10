import { Injectable } from '@angular/core';

import * as playlist1 from 'src/assets/playlists/playlist1.json'
import * as schedule1 from 'src/assets/schedules/schedule1.json'

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {  

  constructor() { }

  load_playlist(playlist_selector:number) { 
    const schedule = this.select_playlist(playlist_selector);   
    // Get the index of the JSON import which contains the valid array data
    let index = Object.keys(schedule).length - 1;
    // Return that data to a playlist array
    const playlist = Object.values(schedule)[index];
    return playlist
  }

  select_playlist(playlist_selector:number) {
    if(playlist_selector == 1) {
      return playlist1;
    } else {
      return playlist1;
    }
  }
}
