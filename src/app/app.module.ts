import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { FieldComponent } from './field/field.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, FieldComponent, CellComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
