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
    count: {
      rows: 15,
      columns: 15,
      mines: 15
    },
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
    console.log(cell);
    if (!cell.flag && !cell.open) {
      if (!cell.mine && !cell.proximity) {
        let proximity = 0;
        const spread = this.getChance();
        for (let row of this.proximity) {
          if (this.field.cells[cell.row + row[0]] && this.field.cells[cell.row + row[0]][cell.column + row[1]]) {
            const proximityCell: Cell = this.field.cells[cell.row + row[0]][cell.column + row[1]];
            if (proximityCell.mine) {
              proximity++;
            }

            if (spread && proximityCell.hash !== cell.hash && !proximityCell.mine && !proximityCell.flag && this.getChance()) {
              proximityCell.hash = cell.hash;
              this.open(proximityCell);
            }
          }
        }
        cell.proximity = proximity;
      }
      cell.open = true;

      cell.styles = this.getCellStyle(cell);
    }
  }

  flag(cell: Cell) {
    if (!cell.open) {
      cell.flag = !cell.flag;
      if (cell.flag) {
        this.field.count.mines--;
      } else {
        this.field.count.mines++;
      }
    }
  }

  getChance() {
    return Math.random() >= 0.5;
  }

  getCellStyle(cell: Cell) {
    const styles = [];

    if (!cell.mine && cell.open) {
      if (cell.proximity > 0) {
        styles.push('text-success');
      }
    }

    return styles.join(' ');
  }
}