import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  minutes = [0];
  flag = false;  // Flags so that videos only get triggered once
  manual_flag = false;
  track = -1;

  constructor() { }

  // Build schedule with appropriate intervals
  build_schedule(interval:number) {
    const intervals = [];
    for(let i = 0; i < 1440; i++) {
      if(i % interval == 0) {
        let hours = Math.floor(i / 60);
        let minutes = i - (60 * hours);
        intervals.push({
          "hours": hours,
          "minutes": minutes
        });
      }
    }
    return intervals;
  }

  // Get the current track in the generic equal-interval schedule on initialization
  init_schedule(time:Date, interval:number, offset=0) {
    const s = this.build_schedule(interval);
    const mod = 1440 / interval;
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % mod;
      let nexthr:number;
      let nextmin:number;
      if(j == (s.length - 1)) {
        if(s[0].minutes == s[j].minutes) {
          nexthr = s[0].hours + 24;
          nextmin = s[0].minutes;
        } else if(s[0].minutes == 0) {
          nexthr = s[0].hours;
          nextmin = 60;
        } else {
          nexthr = s[0].hours + 24;
          nextmin = s[0].minutes;
        }
      } else {
        let k = j + 1;
        if(s[k].minutes == s[j].minutes) {
          nexthr = s[k].hours;
          nextmin = s[k].minutes;
        } else if(s[k].minutes == 0) {
          nexthr = s[j].hours;
          nextmin = 60;
        } else {
          nexthr = s[k].hours;
          nextmin = s[k].minutes;
        }
      }
      
      if(time.getHours() >= s[j].hours && time.getHours() <= nexthr) {
        if(time.getMinutes() >= s[j].minutes && time.getMinutes() < nextmin) {
          this.track = i;
          return this.track;
        }
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic equal-interval schedule 
  // and trigger flag to prevent duplicate entry
  get_schedule(time:Date, interval:number, offset=0) {
    const s = this.build_schedule(interval);
    const mod = interval;
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % mod;
      let next = s[j].minutes + 1;
      if(time.getHours() == s[j].hours && time.getMinutes() == s[j].minutes && this.get_flag() == false) {
        this.flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == next) {
        this.flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_flag() {
    return this.flag;
  }

  // Manual Scheduling (Builds schedule from schedule loaded from a JSON file.)
  // Get the current track in the generic equal-interval schedule on initialization
  init_manual_schedule(time:Date, schedule:any, offset=0) {
    const mod = schedule.length;
    for(let i = 0; i < schedule.length; i++) {
      let j = (i + offset) % mod;
      let nexthr:number;
      let nextmin: number;
      if(j == (schedule.length - 1)) {
        if(schedule[0].start_minute == schedule[j].start_minute) {
          nexthr = schedule[0].start_hour + 24;
          nextmin = schedule[0].start_minute + 60;
        } else if(schedule[0].start_minute == 0) {
          nexthr = schedule[0].start_hour;
          nextmin = 60;
        } else {
          nexthr = schedule[0].start_hour + 24;
          nextmin = schedule[0].start_minute;
        }
      } else {
        let k = j + 1;
        if(schedule[k].start_minute == schedule[j].start_minute) {
          nexthr = schedule[k].start_hour;
          nextmin = schedule[k].start_minute + 60;
        } else if(schedule[k].start_minute == 0) {
          nexthr = schedule[j].start_hour;
          nextmin = 60;
        } else {
          nexthr = schedule[k].start_hour;
          nextmin = schedule[k].start_minute;
        }
      }

      // console.log("Start Hr: " + schedule[j].start_hour + ", Next Hr: " + nexthr + ", Start Min: " + schedule[j].start_minute 
      // + ", Next Min: " + nextmin + ", Current Hour: " + time.getHours() + ", Current Min: " + time.getMinutes());

      if(time.getHours() >= schedule[j].start_hour && time.getHours() <= nexthr) {
        if(time.getMinutes() >= schedule[j].start_minute && time.getMinutes() <= nextmin) {
          this.track = i;
          return this.track;
        }
      } 
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic equal-interval schedule 
  // and trigger flag to prevent duplicate entry
  get_manual_schedule(time:Date, schedule:any, offset=0) {
    const mod = schedule.length;
    for(let i = 0; i < schedule.length; i++) {
      let j = (i + offset) % mod;
      let next = schedule[j].start_minute + 1;
      if(time.getHours() == schedule[j].start_hour && time.getMinutes() == schedule[j].start_minute && this.get_manual_flag() == false) {
        this.manual_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == schedule[j].start_hour && time.getMinutes() == next) {
        this.manual_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_manual_flag() {
    return this.manual_flag;
  }
}
