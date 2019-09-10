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

      field.mines.push(field.cells[row][column]);
    }
    else {
      return this.setCellMine(field);
    }
  }

  getCellStyle(cell: Cell) {
    const styles = [];

    if (!cell.mine && cell.open) {
      if (cell.proximity > 0) {
        if (cell.proximity < 3) {
          styles.push('text-success');
        }
        else if (cell.proximity < 5) {
          styles.push('text-primary');
        }
        else if (cell.proximity < 7) {
          styles.push('text-warning');
        }
        else {
          styles.push('text-danger');
        }
      }
    }

    return styles.join(' ');
  }

  getChance() {
    return Math.random() >= 0.5;
  }
}