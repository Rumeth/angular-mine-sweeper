import { Cell } from '../cell/cell.interface';

export interface Field {
  count?: Count;

  cells?: Cell[];

  mines?:Cell[];
}

export interface Count {
  rows?: number;

  columns?: number;

  mines?: number;
}