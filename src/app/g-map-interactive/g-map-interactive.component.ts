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
  private drawingManager: any;

  constructor(private load: ScriptLoaderService) { }

  draw(type) {
    const maps = window['google']['maps'];
    switch (type) {
      case 'polygon':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.POLYGON);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#9c4d4f',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#401619',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'me':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.MARKER);
        let me = new maps.MarkerImage('assets/me.png',
          null,
          null,
          null,
          new maps.Size(70, 70)
        );
        this.drawingManager.setOptions({
          markerOptions: {
            icon: me,
            clickable: true,
            draggable: true
          }
        });
        break;
      case 'marker':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.MARKER);
        let point = new window['google']['maps'].MarkerImage('assets/point.png',
          null,
          null,
          null,
          new maps.Size(30, 30)
        );
        this.drawingManager.setOptions({
          markerOptions: {
            icon: point,
            clickable: true,
            draggable: true
          }
        });
        break;
      case 'polygon':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.POLYGON);
        this.drawingManager.setOptions({
          polygonOptions: {
            fillColor: '#9c4d4f',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#401619',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'square':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.RECTANGLE);
        this.drawingManager.setOptions({
          rectangleOptions: {
            fillColor: '#fff82e',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#c8a535',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
      case 'polyline':
        this.drawingManager.setDrawingMode(maps.drawing.OverlayType.POLYLINE);
        this.drawingManager.setOptions({
          polylineOptions: {
            fillColor: '#00b801',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#00b801',
            clickable: true,
            editable: true,
            draggable: true
          }
        });
        break;
    }
  }

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
      const drawControl = document.getElementById('draw-buttons');
      this.map.controls[maps.ControlPosition.TOP_LEFT].push(drawControl);

      this.drawingManager = new maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false  // i have my custom tools so i don't need the defaults to be displayed
      });
      this.drawingManager.setMap(this.map);

      maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
        // console.log(event.type);
        event.overlay.addListener('rightclick', function () {
          event.overlay.setMap(null);
        });
        switch (event.type) {
          case 'polygon':
            this.map.data.add(new maps.Data.Feature({
              geometry: new maps.Data.Polygon([event.overlay.getPath().getArray()])
            }));
            break;
          default:
            console.log('end');
        }
      });
    });
  }

}
