import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Cell } from './cell.interface';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;

  @Output() opened = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  open() {
    if (!this.cell.flag && !this.cell.open) {
      this.cell.open = true;
      this.opened.emit(this.cell);
    }
  }

  onRightClick() {
    this.cell.flag = !this.cell.flag;
    return false;
  }
}