import { Cell } from '../cell/cell.interface';

export interface Field {
  rows?: number;

  columns?: number;

  mines?: number;

  cells?: Cell[]; 
}