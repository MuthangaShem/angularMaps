import { ScriptLoaderService } from './../script-loader.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

const apiKey = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=drawing';

@Component({
  selector: 'app-g-map-interactive',
  templateUrl: './g-map-interactive.component.html',
  styleUrls: ['./g-map-interactive.component.css']
})
export class GMapInteractiveComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  constructor(private load: ScriptLoaderService) { }

  ngAfterViewInit(): void {
    this.load.loadScript(url, 'gmap', () => {
    });
  }

}
