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
  private point: any;
  private line: any;
  private polygon: any;
  private circle: any;

  constructor(private load: ScriptLoaderService) { }


  draw(type) {
    const maps = window['ol'];
    switch (type) {
      case 'point':
        this.map.removeInteraction(this.polygon);
        this.map.removeInteraction(this.circle);
        this.map.removeInteraction(this.line);
        this.map.addInteraction(this.point);
        break;
      case 'line':
        this.map.removeInteraction(this.point);
        this.map.removeInteraction(this.polygon);
        this.map.removeInteraction(this.circle);
        this.map.addInteraction(this.line);
        break;
      case 'polygon':
        this.map.removeInteraction(this.point);
        this.map.removeInteraction(this.polygon);
        this.map.removeInteraction(this.circle);
        this.map.removeInteraction(this.line);
        this.map.addInteraction(this.polygon);
        break;
      case 'circle':
        this.map.removeInteraction(this.point);
        this.map.removeInteraction(this.line);
        this.map.removeInteraction(this.polygon);
        this.map.addInteraction(this.circle);
        break;

    }
  }

  ngAfterViewInit() {

    this.load.loadScript(url, 'omap', () => {

      const ol = window['ol'];
      console.log(ol);

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
        source,
      });

      this.map = new ol.Map({
        target: 'olmap',
        layers: [this.osm, vector],
        view: this.view
      });

      this.point = new ol.interaction.Draw({
        source,
        type: 'Point'
      });
      // this.map.addInteraction(this.point);

      this.line = new ol.interaction.Draw({
        source,
        type: 'LineString'
      });

      this.polygon = new ol.interaction.Draw({
        source,
        type: 'Polygon'
      });
      this.circle = new ol.interaction.Draw({
        source,
        type: 'Circle'
      });

    });

  }

}
