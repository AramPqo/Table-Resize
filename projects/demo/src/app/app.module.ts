import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizeModule } from 'ngpq-table-resize';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { FixedComponent } from './fixed/fixed.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    FixedComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ResizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
