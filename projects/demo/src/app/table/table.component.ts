import { Component, Input, OnInit } from '@angular/core';
import { data, headers } from '../data';

@Component({
  selector: 'ngpq-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  @Input('fixed') isFixed!: boolean;

  data: any;
  headers: any;

  constructor() { }

  ngOnInit() {
    this.headers = headers;
    this.data = data;
  }

}
