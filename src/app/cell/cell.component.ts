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
    this.cell.hash = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    this.opened.emit(this.cell);
  }

  onRightClick() {
    this.cell.flag = !this.cell.flag;
    return false;
  }
}