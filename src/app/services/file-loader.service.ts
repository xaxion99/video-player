import { Injectable } from '@angular/core';

import * as ygo_schedule from 'src/assets/YGO_Schedule.json'

@Injectable({
  providedIn: 'root'
})
export class FileLoaderService {  

  constructor() { }

  load_schedule(schedule_selector:number) { 
    const schedule = this.select_schedule(schedule_selector);   
    // Get the index of the JSON import which contains the valid array data
    let index = Object.keys(schedule).length - 1;
    // Return that data to a playlist array
    const playlist = Object.values(schedule)[index];
    return playlist

    // Code to manually loop through JSON, never got working as expected
    // for(let i = 0; i < 27; i++) {
    //   playlist.push({
    //     "name": ygo_schedule[i].name,
    //     "sources": [{
    //       "src": ygo_schedule[i].sources[0].src,
    //       "type": ygo_schedule[i].sources[0].type
    //     }],
    //     "thumbnail": [{
    //       "src": ygo_schedule[i].thumbnail[0].src
    //     }],
    //     "poster": ygo_schedule[i].poster
    //   });
    // }
  }

  select_schedule(schedule_selector:number) {
    if(schedule_selector == 1) {
      return ygo_schedule;
    } else {
      return ygo_schedule;
    }
  }
}
