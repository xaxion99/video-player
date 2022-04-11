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

  // Automated Scheduling (Currently only works with equal-interval time slots, although some interesting customs configs are possible)
  // Function to get timing intervals for a day. Genericized all the timings.
  timings(interval:string) {
    const array = [];
    if(interval == "1_min") {
      array.push(this.hours);
      array.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
    } else if(interval == "2_min") {
      array.push(this.hours);
      array.push([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58]);
    } else if(interval == "3_min") {
      array.push(this.hours);
      array.push([0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57]);
    } else if(interval == "4_min") {
      array.push(this.hours);
      array.push([0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56]);
    } else if(interval == "5_min") {
      array.push(this.hours);
      array.push([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    } else if(interval == "6_min") {
      array.push(this.hours);
      array.push([0, 6, 12, 18, 24, 30, 36, 42, 48, 54]);
    } else if(interval == "10_min") {
      array.push(this.hours);
      array.push([0, 10, 20, 30, 40, 50]);
    } else if(interval == "12_min") {
      array.push(this.hours);
      array.push([0, 12, 24, 36, 48]);
    } else if(interval == "15_min") {
      array.push(this.hours);
      array.push([0, 15, 30, 45]);
    } else if(interval == "20_min") {
      array.push(this.hours);
      array.push([0, 20, 40]);
    } else if(interval == "30_min") {
      array.push(this.hours);
      array.push([0, 30]);
    } else if(interval == "45_min") {  // NOTE: Does not work
      array.push(this.hours);
      array.push(this.minutes);
    } else if(interval == "1_hr") {
      array.push(this.hours);
      array.push(this.minutes);
    } else if(interval == "1.5_hr") {  // NOTE: Does not work
      array.push(this.hours);
      array.push(this.minutes);
    } else if(interval == "2_hr") {
      array.push([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
      array.push(this.minutes);
    } else if(interval == "3_hr") {
      array.push([0, 3, 6, 9, 12, 15, 18, 21]);
      array.push(this.minutes);
    } else if(interval == "4_hr") {
      array.push([0, 4, 8, 12, 16, 20]);
      array.push(this.minutes);
    } else if(interval == "6_hr") {
      array.push([0, 6, 12, 18]);
      array.push(this.minutes);
    } else if(interval == "8_hr") {
      array.push([0, 8, 16]);
      array.push(this.minutes);
    } else if(interval == "12_hr") {
      array.push([0, 12]);
      array.push(this.minutes);
    } else if(interval == "24_hr") {
      array.push([0]);
      array.push(this.minutes);
    }
    return array;
  }

  // Build schedule with appropriate intervals
  build_schedule(hr_intervals:number[]=this.hours, min_intervals:number[]=this.minutes) {
    const minutes = min_intervals;
    const hours = hr_intervals;
    const intervals = [];
    for(let i = 0; i < hours.length; i++) {
      for(let j = 0; j < minutes.length; j++) {
        intervals.push({
          "hours": hours[i],
          "minutes": minutes[j]
        });
      }
    }
    return intervals;
  }

  // Get the current track in the generic equal-interval schedule on initialization
  init_schedule(time:Date, interval:string, offset=0) {
    const tmg = this.timings(interval);
    const s = this.build_schedule(tmg[0], tmg[1]);
    const mod = tmg[0].length * tmg[1].length;
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
  get_schedule(time:Date, interval:string, offset=0) {
    const tmg = this.timings(interval);
    const s = this.build_schedule(tmg[0], tmg[1]);
    const mod = tmg[0].length * tmg[1].length;
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

      console.log("Start Hr: " + schedule[j].start_hour + ", Next Hr: " + nexthr + ", Start Min: " + schedule[j].start_minute 
      + ", Next Min: " + nextmin + ", Current Hour: " + time.getHours() + ", Current Min: " + time.getMinutes());

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
