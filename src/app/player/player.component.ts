import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  default:string = "assets/MP4/Yu-Gi-Oh_-_01.mp4"

  constructor() { }

  ngOnInit(): void {
  }

}
