import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  // Flag so that videos only get triggered once

  // Simple Minute-Interval Schedules
  m15_flag = false;
  m20_flag = false;
  m30_flag = false;

  // Complex Minute-Interval Schedules
  m45_flag = false;
  m90_flag = false;

  // Hourly-Interval Schedules
  h1_flag = false;
  h2_flag = false;
  h3_flag = false;
  h4_flag = false;
  h6_flag = false;
  h8_flag = false;
  h12_flag = false;
  
  track = -1;

  constructor() { }

  // Build schedule with appropriate intervals
  build_schedule(min_intervals:number[], hr_intervals=this.hours) {
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

  /* Generic 15-minute Schedules **************************************************************************
  *
  */
  // Get the current track in the generic 15-minute schedule on initialization
  init_15min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 15, 30, 45]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 96;
      let next = s[j].minutes + 15;
      if(time.getHours() == s[j].hours && time.getMinutes() >= s[j].minutes && time.getMinutes() < next) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 15-minute schedule and trigger flag to prevent duplicate entry
  get_15min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 15, 30, 45]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 96;
      let next = s[j].minutes + 1;
      if(time.getHours() == s[j].hours && time.getMinutes() == s[j].minutes && this.m15_flag == false) {
        this.m15_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == next) {
        this.m15_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }
  
  // Getter for flag to make call act as if singleton 
  get_15min_flag() {
    return this.m15_flag;
  }

  /* Generic 20-minute Schedules **************************************************************************
  *
  */
  // Get the current track in the generic 20-minute schedule on initialization
  init_20min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 20, 40]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 72;
      let next = s[j].minutes + 20;
      if(time.getHours() == s[j].hours && time.getMinutes() >= s[j].minutes && time.getMinutes() < next) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 20-minute schedule and trigger flag to prevent duplicate entry
  get_20min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 20, 40]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 72;
      let next = s[j].minutes + 1;
      if(time.getHours() == s[j].hours && time.getMinutes() == s[j].minutes && this.m20_flag == false) {
        this.m20_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == next) {
        this.m20_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }
  
  // Getter for flag to make call act as if singleton 
  get_20min_flag() {
    return this.m20_flag;
  }

  /* Generic 30-minute Schedules **************************************************************************
  *
  */
  // Get the current track in the generic 30-minute schedule on initialization
  init_30min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 30]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 48;
      let next = s[j].minutes + 30;
      if(time.getHours() == s[j].hours && time.getMinutes() >= s[j].minutes && time.getMinutes() < next) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 30-minute schedule and trigger flag to prevent duplicate entry
  get_30min_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0, 30]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 48;
      let next = s[j].minutes + 1;
      if(time.getHours() == s[j].hours && time.getMinutes() == s[j].minutes && this.m30_flag == false) {
        this.m30_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == next) {
        this.m30_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }
  
  // Getter for flag to make call act as if singleton 
  get_30min_flag() {
    return this.m30_flag;
  }

  /* Generic 1-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 1-hour schedule on initialization
  init_1hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 24;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 1-hour schedule and trigger flag to prevent duplicate entry
  get_1hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 24;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h1_flag == false) {
        this.h1_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h1_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_1hr_flag() {
    return this.h1_flag;
  }

  /* Generic 2-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 2-hour schedule on initialization
  init_2hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 12;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 2-hour schedule and trigger flag to prevent duplicate entry
  get_2hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 12;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h2_flag == false) {
        this.h2_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h2_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_2hr_flag() {
    return this.h2_flag;
  }

  /* Generic 3-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 3-hour schedule on initialization
  init_3hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 3, 6, 9, 12, 15, 18, 21]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 8;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 3-hour schedule and trigger flag to prevent duplicate entry
  get_3hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 3, 6, 9, 12, 15, 18, 21]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 8;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h3_flag == false) {
        this.h3_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h3_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_3hr_flag() {
    return this.h3_flag;
  }

  /* Generic 4-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 4-hour schedule on initialization
  init_4hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 4, 8, 12, 16, 20]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 6;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 4-hour schedule and trigger flag to prevent duplicate entry
  get_4hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 4, 8, 12, 16, 20]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 6;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h4_flag == false) {
        this.h4_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h4_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_4hr_flag() {
    return this.h4_flag;
  }

  /* Generic 6-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 6-hour schedule on initialization
  init_6hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 6, 12, 18]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 4;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 6-hour schedule and trigger flag to prevent duplicate entry
  get_6hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 6, 12, 18]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 6;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h6_flag == false) {
        this.h6_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h6_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_6hr_flag() {
    return this.h6_flag;
  }

  /* Generic 8-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 8-hour schedule on initialization
  init_8hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 8, 16]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 3;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 8-hour schedule and trigger flag to prevent duplicate entry
  get_8hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 8, 16]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 3;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h8_flag == false) {
        this.h8_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h8_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_8hr_flag() {
    return this.h8_flag;
  }

  /* Generic 12-hour Schedules ******************************************************************************
  *
  */
  // Get the current track in the generic 12-hour schedule on initialization
  init_12hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 12]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 2;
      if(time.getHours() == s[j].hours) {
        this.track = i;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Get the current track when a time change happens on generic 8-hour schedule and trigger flag to prevent duplicate entry
  get_12hr_schedule(time:Date, offset=0) {
    const s = this.build_schedule([0], [0, 12]);
    for(let i = 0; i < s.length; i++) {
      let j = (i + offset) % 2;
      if(time.getHours() == s[j].hours && time.getMinutes() == 0 && this.h12_flag == false) {
        this.h12_flag = true;
        this.track = i;
        return this.track;
      } else if(time.getHours() == s[j].hours && time.getMinutes() == 1) {
        this.h12_flag = false;
        this.track = -1;
        return this.track;
      }
    }
    this.track = -1;
    return this.track;
  }

  // Getter for flag to make call act as if singleton 
  get_12hr_flag() {
    return this.h12_flag;
  }
}
