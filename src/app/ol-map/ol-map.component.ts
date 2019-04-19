import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';

const url = 'https://openlayers.org/en/v4.6.5/build/ol.js';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {

  private stamen: any;
  private osm: any;
  private view: any;
  private map: any;

  constructor(private load: ScriptLoaderService) { }

  ngAfterViewInit() {

    this.load.loadScript(url, 'omap', () => {

      const ol = window['ol'];

      this.osm = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      this.view = new ol.View({
        center: ol.proj.fromLonLat([36.81667, -1.3]),
        zoom: 10
      });

      const source = new ol.source.Vector({ wrapX: false });


      this.stamen = new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'toner'
        })
      });


      const vector = new ol.layer.Vector({
        source: source
      });

      this.map = new ol.Map({
        target: 'olmap',
        layers: [this.osm, vector],
        view: this.view
      });


    });

  }

}
