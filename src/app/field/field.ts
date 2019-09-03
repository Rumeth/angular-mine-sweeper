import { Cell } from '../cell/cell';

export interface Field {
  rows?: number;

  columns?: number;

  cells?: Cell[][];
}