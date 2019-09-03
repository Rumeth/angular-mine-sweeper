import { Injectable } from '@angular/core';

import { Cell } from '../cell/cell';

@Injectable()
export class FieldService {

  constructor() { }

  getFieldCells(rows: number, columns: number, mines: number) {
    const cells: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
      cells[i] = [];

      for (let j = 0; j < columns; j++) {
        cells[i][j] = {
          open: false
        };
      }
    }

    this.setMines(cells, mines);

    return cells;
  }

  setMines(cells: Cell[][], mines: number) {
    const rows = cells.length;
    const columns = cells[0].length;

    while (mines > 0) {
      this.setCellMine(rows, columns, cells);
      mines--;
    }
  }

  setCellMine(rows: number, columns: number, cells: Cell[][]) {
    const row = Math.floor(Math.random() * Math.floor(rows));
    const column = Math.floor(Math.random() * Math.floor(columns));

    if (cells[row] && cells[row][column] && !cells[row][column].mine) {
      return cells[row][column];
    }
    else {
      return this.setCellMine(rows, columns, cells);
    }
  }
}