import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../script-loader.service';

const url = 'https://openlayers.org/en/v4.6.4/build/ol.js';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements AfterViewInit {

  constructor(private load: ScriptLoaderService) { }

  ngAfterViewInit() {
  }

}
