import { Injectable } from '@angular/core';

import { Field } from './field.interface';
import { Cell } from '../cell/cell.interface';

@Injectable()
export class FieldService {

  constructor() { }

  getFieldCells(field: Field) {
    for (let i = 0; i < field.count.rows; i++) {
      field.cells[i] = [];

      for (let j = 0; j < field.count.columns; j++) {
        field.cells[i][j] = {
          open: false,
          row: i,
          column: j,
          styles: 'bg-dark'
        };
      }
    }

    console.log(field);

    this.setMines(field);
  }

  setMines(field: Field) {
    let mines = field.count.mines;
    while (mines > 0) {
      this.setCellMine(field);
      mines--;
    }
  }

  setCellMine(field: Field) {
    const row = Math.floor(Math.random() * Math.floor(field.count.rows));
    const column = Math.floor(Math.random() * Math.floor(field.count.columns));

    if (field.cells[row] && field.cells[row][column] && !field.cells[row][column].mine) {
      field.cells[row][column].mine = true
    }
    else {
      return this.setCellMine(field);
    }
  }
}