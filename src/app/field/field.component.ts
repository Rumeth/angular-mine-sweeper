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
      mines: 150
    },
    cells: [],
    mines: []
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

      cell.styles = this.fieldService.getCellStyle(cell);
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
}