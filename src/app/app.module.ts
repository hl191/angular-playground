import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
