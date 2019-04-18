import { styledMap } from './../../assets/mapStyles/styledMap';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';
import { HttpClient } from '@angular/common/http';


const apiKey = 'AIzaSyAwVnwE1bEZf_Bkk_pSkGM0XlBSXJocVUY';
const url = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=visualization';


@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css'],
})
export class GMapComponent implements AfterViewInit {

  @ViewChild('mapElement') mapElm: ElementRef;
  @ViewChild('legend') legend: ElementRef;
  @ViewChild('info') infoBox: ElementRef;

  private maps: any;
  private map: any;
  private coords: any;

  constructor(private load: ScriptLoaderService, private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.load.loadScript(url, 'gmap', () => {
      this.maps = window['google']['maps'];
      console.log(this.maps);
      const loc = new this.maps.LatLng(0.4, 36.81667);

      const darkmap = new this.maps.StyledMapType(styledMap, { name: 'Dark Map' });

      this.coords = function (x, y) {
        return new this.maps.LatLng(x, y);
      };

      this.map = new this.maps.Map(this.mapElm.nativeElement, {
        zoom: 6.5,
        center: loc,
        scrollwheel: true,
        panControl: false,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        zoomControlOptions: {
          style: this.maps.ZoomControlStyle.LARGE,
          position: this.maps.ControlPosition.RIGHT_BOTTOM
        }
      });
      this.map.data.loadGeoJson('assets/kenyan-counties.geojson');

      // event listener for mouse hover
      this.map.data.addListener('mouseover', (function (e) {
        this.legend.nativeElement.style.display = 'block';
        this.infoBox.nativeElement.innerText = e.feature.getProperty('COUNTY');
      }).bind(this));
    });
  }
}
