import { Component, OnInit } from '@angular/core';

import { FieldService } from './field.service';

import { Field } from './field.interface';
import { Cell } from '../cell/cell.interface';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  field: Field = {
    rows: 150,
    columns: 150, 
    mines: 15,
    cells: []
  };

  proximity = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1],
  ]

  constructor(private fieldService: FieldService) { }

  ngOnInit() {
    this.getFieldCells();
  }

  getFieldCells() {
    this.fieldService.getFieldCells(this.field);
  }

  open(cell: Cell) {
    if (!cell.mine) {
      let proximity = 0;
      for (let row of this.proximity) {
        if (this.field.cells[cell.row + row[0]] && this.field.cells[cell.row + row[0]][cell.column + row[1]] && this.field.cells[cell.row + row[0]][cell.column + row[1]].mine) {
          proximity++;
        }
      }
      cell.proximity = proximity;
    }
  }
}