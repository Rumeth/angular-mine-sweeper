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
  field: Field;

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
    this.field = this.fieldService.getField();
  }

  open(cell: Cell) {
    if (!this.field.disabled && !cell.flag && !cell.open) {
      if (!cell.mine && !cell.proximity) {
        let proximity = 0;
        const spread = this.fieldService.getChance();
        for (let row of this.proximity) {
          if (this.field.cells[cell.row + row[0]] && this.field.cells[cell.row + row[0]][cell.column + row[1]]) {
            const proximityCell: Cell = this.field.cells[cell.row + row[0]][cell.column + row[1]];
            if (proximityCell.mine) {
              proximity++;
            }

            if (spread && proximityCell.hash !== cell.hash && !proximityCell.mine && !proximityCell.flag && this.fieldService.getChance()) {
              proximityCell.hash = cell.hash;
              this.open(proximityCell);
            }
          }
        }
        cell.proximity = proximity;
      }
      cell.open = true;

      this.field.count.opened++;

      cell.styles = this.fieldService.getCellStyle(cell);

      if (cell.mine || (this.field.count.opened === (this.field.count.rows * this.field.count.rows) - this.field.count.mines)) {
        this.field.disabled = true;

        if (cell.mine) {
          this.showAllMines();
        }
        else {
          this.flagAllMines();
        }
      }
    }
  }

  flag(cell: Cell) {
    if (!this.field.disabled && !cell.open) {
      cell.flag = !cell.flag;
      if (cell.flag) {
        this.field.count.flags++;
      } else {
        this.field.count.flags--;
      }
    }
  }

  showAllMines() {
    for (let mine of this.field.mines) {
      if (!mine.flag) {
        mine.open = true;
      }
      mine.styles = '';
    }
  }

  flagAllMines() {
    for (let mine of this.field.mines) {
      if (!mine.open) {
        mine.flag = true;
      }
      mine.styles = '';
    }
  }

  reset() {
    this.getFieldCells();
  }
}