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

  private map: any;
  private maps: any;

  constructor(private load: ScriptLoaderService) { }

  ngAfterViewInit(): void {
    this.load.loadScript(url, 'gmap', () => {

      const maps = window['google']['maps'];
      console.log(maps);
      const loc = new maps.LatLng(-1.2, 36.81667);

      this.map = new maps.Map(this.mapElm.nativeElement, {
        zoom: 11,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: maps.ZoomControlStyle.LARGE,
          position: maps.ControlPosition.RIGHT_BOTTOM
        }
      });
    });
  }

}
