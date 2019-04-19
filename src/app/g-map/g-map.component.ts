import { styledMap } from './../../assets/mapStyles/styledMap';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';
import { HttpClient } from '@angular/common/http';
import { mapNumber } from 'src/assets/functions/mapNumber';


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
  private infowindow: any;

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
      this.map.data.addGeoJson('assets/kenyan-counties.geojson');

      // event listener for mouse hover to display name
      this.map.data.addListener('mouseover', (function (e) {
        this.legend.nativeElement.style.display = 'block';
        this.infoBox.nativeElement.innerText = e.feature.getProperty('COUNTY');
      }).bind(this));

      // remove county name if not hovering on geojson
      this.map.data.addListener('mouseout', (function (e) {
        this.legend.nativeElement.style.display = 'none';
      }).bind(this));

      // style map according to name
      this.map.data.setStyle(feature => {
        const lon = feature.getProperty('AREA');
        const value = 255 - Math.round(mapNumber(lon, 0, 5, 0, 255));
        const color = 'rgb(' + value + ',' + (value * 15) + ',' + 150 + ')';
        return {
          fillColor: color,
          strokeWeight: 0.5
        };
      });

      // add pop when you click on a county
      this.map.data.addListener('click', (function (e) {
        console.log(e.latLng);
        this.infowindow.setPosition(e.latLng);
        this.infowindow.setContent(`<div class="overlay">
        ${e.feature.getProperty('COUNTY')}
        </div>`);
        this.infowindow.open(this.map);
      }).bind(this));
      this.infowindow = new this.maps.InfoWindow();
    });

  }
}
