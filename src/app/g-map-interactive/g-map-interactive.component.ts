import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-g-map-interactive',
  templateUrl: './g-map-interactive.component.html',
  styleUrls: ['./g-map-interactive.component.css']
})
export class GMapInteractiveComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  constructor() { }

  ngAfterViewInit() {
  }

}
