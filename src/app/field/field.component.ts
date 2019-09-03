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
    rows:15,
    columns:15,
    mines:5,
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