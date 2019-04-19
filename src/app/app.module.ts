import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GMapInteractiveComponent } from './g-map-interactive/g-map-interactive.component';
import { GMapComponent } from './g-map/g-map.component';

import { ScriptLoaderService } from './script-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { OlMapComponent } from './ol-map/ol-map.component';


@NgModule({
  declarations: [
    AppComponent,
    GMapComponent,
    GMapInteractiveComponent,
    OlMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ScriptLoaderService],
  bootstrap: [AppComponent],
  exports: [GMapComponent]
})
export class AppModule { }
