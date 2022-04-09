import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeConverterService {

  constructor() { }

  convert_time(t:Date) {
    return t.getHours();
  }
}
