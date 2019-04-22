import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeoJSON } from './g-map/geojson.model';

@Injectable({
  providedIn: 'root'
})
export class AccidentsService {

  constructor(private http: HttpClient) { }

  getAccidents() {
     return this.http.get<GeoJSON>('../assets/accidents.geojson');
  }
}
