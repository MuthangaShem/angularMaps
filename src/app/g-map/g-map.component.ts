import { styledMap } from './../../assets/mapStyles/styledMap';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';
import { HttpClient } from '@angular/common/http';
import { mapNumber } from 'src/assets/functions/mapNumber';
import { GeoJSON } from './geojson.model';
import { AccidentsService } from '../accidents.service';

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
  private markerCluster: any;
  private markers: any;
  private heatMap: any;
  private markerCoordinates: GeoJSON;
  private trial: any;
  heatMapCoordinates = [];
  private themeNumber: number;

  constructor(private load: ScriptLoaderService, private http: HttpClient, private accidentService: AccidentsService) { }

  ngAfterViewInit(): void {
    this.load.loadScript(url, 'gmap', () => {
      this.maps = window['google']['maps'];
      const loc = new this.maps.LatLng(0, 36.81667);


      this.coords = function (x, y) {
        return new this.maps.LatLng(x, y);
      };


      this.map = new this.maps.Map(this.mapElm.nativeElement, {
        zoom: 6.6,
        center: loc,
        scrollwheel: true,
        panControl: true,
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        scaleControl: true,
        // mapTypeId: 'satelite',
        zoomControlOptions: {
          style: this.maps.ZoomControlStyle.LARGE,
          position: this.maps.ControlPosition.RIGHT_BOTTOM
        }
      });

      const darkmap = new this.maps.StyledMapType(styledMap, {name: 'Dark Map'});
      this.map.mapTypes.set('dark_map', darkmap);
      // this.map.setMapTypeId('dark_map');

      // event listener for mouse hover to display name
      this.map.data.addListener('mouseover', (function (e) {
        this.legend.nativeElement.style.display = 'block';
        this.infoBox.nativeElement.innerText = e.feature.getProperty('PLACE');
      }).bind(this));

      // remove county name if not hovering on geojson
      this.map.data.addListener('mouseout', (function (e) {
        this.legend.nativeElement.style.display = 'none';
      }).bind(this));

      // style map according to area
      // this.map.data.setStyle(feature => {
      //   const lon = feature.getProperty('AREA');
      //   const value = 255 - Math.round(mapNumber(lon, 0, 5, 0, 255));
      //   const color = 'rgb(' + value + ',' + (value * 15) + ',' + 150 + ')';
      //   return {
      //     fillColor: color,
      //     strokeWeight: 0.5
      //   };
      // });

      // add pop when you click on a county
      this.map.data.addListener('click', (function (e) {
        console.log(e.latLng);
        this.infowindow.setPosition(e.latLng);
        this.infowindow.setContent(`<div class="overlay">
        ${e.feature.getProperty('PLACE')}
        </div>`);
        this.infowindow.open(this.map);
      }).bind(this));
      this.infowindow = new this.maps.InfoWindow();

      // cluster
      // const MarkerClusterer = window["MarkerClusterer"];
      // this.markerCluster = [];


      });

  }

  loadPoints(){
    const button = document.getElementById('points');
    if(button.innerHTML === 'Load Points') {
      // this.map = new this.maps.Map(this.mapElm.nativeElement, {
      //   zoom: 11.6,
      //   center: new this.maps.LatLng(-1.3, 36.81667)
      // });
      this.map.data.loadGeoJson('assets/accidents.geojson');
      const antenna = new this.maps.MarkerImage('assets/danger.png',
        null,
        null,
        null,
        new this.maps.Size(17, 17)
      );
      this.map.data.setStyle({
        icon: antenna,
      });
      button.innerHTML = 'Hide Points'
    } else {
      button.innerHTML = 'Load Points';
      this.map.data.setStyle({visible: false});
    }
  }

  loadCounties(){
    const button = document.getElementById('counties');
    if(button.innerHTML === 'Load Counties') {
    this.map.data.loadGeoJson('assets/kenyan-counties.geojson');
    this.map.data.setStyle(feature => {
      const lon = feature.getProperty('AREA');
      const value = 255 - Math.round(mapNumber(lon, 0, 5, 0, 255));
      const color = 'rgb(' + value + ',' + (value * 15) + ',' + 150 + ')';
      return {
        fillColor: color,
        strokeWeight: 0.5
      };
    });
    button.innerHTML = 'Hide Counties'
    } else {
      this.map.data.setStyle({visible: false});
      button.innerHTML = 'Load Counties';
    }
  }


  createHeatMap(){
    const button = document.getElementById('heat map');
    if(button.innerHTML === 'Create Heatmap') {
    this.accidentService.getAccidents().subscribe(resp => {
      resp.features.forEach(feature => {
        this.heatMapCoordinates.push(new this.maps.LatLng(feature.properties.LATITUDE, feature.properties.LONGITUDE));
      });
      this.heatMap = new this.maps.visualization.HeatmapLayer({
        data: this.heatMapCoordinates,
        map: this.map,
        radius: 80,
        opacity: 100,
      });
      this.heatMap.setMap(this.map);
    });
    button.innerHTML = 'Remove Heatmap ';
    } else {
      this.heatMap.setMap( null );
      button.innerHTML = 'Create Heatmap';
    }
  }

  changeType() {
    const button = document.getElementById('theme');
    if (button.innerHTML === 'Dark Theme') {
      this.map.setMapTypeId('dark_map');
      button.innerHTML = 'Light Theme';
    } else {
      this.map.setMapTypeId('roadmap');
      button.innerHTML = 'Dark Theme';
    }
   }


  // cluster(bool, clust) {
  //   if (bool) {
  //     const MarkerClusterer = window["MarkerClusterer"];
  //     this.markerCluster = new MarkerClusterer(this.map, this.markers, { imagePath: 'assets/m' });
  //     this.markerCluster.setGridSize(clust);
  //   } else {
  //     this.markerCluster.clearMarkers();
  //   }
  // }

}
