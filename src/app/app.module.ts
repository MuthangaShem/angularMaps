import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GMapComponent } from './g-map/g-map.component';

import { ScriptLoaderService } from './script-loader.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GMapComponent
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
