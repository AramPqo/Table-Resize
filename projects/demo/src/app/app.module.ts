import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResizerModule } from 'projects/resize/src/lib/resizer.module';

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
    ResizerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
