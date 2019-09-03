import { Component, OnInit } from '@angular/core';

import { FieldService } from './field.service';

import { Field } from './field.interface';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  field: Field = {
    rows:3,
    columns:3,
    mines:2,
    cells:[]
  };

  constructor(private fieldService: FieldService) { }

  ngOnInit() {
    this.getFieldCells();
  }

  getFieldCells() {
    this.fieldService.getFieldCells(this.field);
  }

}