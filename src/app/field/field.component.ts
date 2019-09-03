import { Component, OnInit } from '@angular/core';

import { Field } from './field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  field: Field;

  constructor() { }

  ngOnInit() {
  }

}