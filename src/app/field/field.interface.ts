import { Cell } from '../cell/cell.interface';

export interface Field {
  count?: Count;

  cells?: Cell[];

  mines?: Cell[];

  disabled?: boolean;
}

export interface Count {
  rows?: number;

  columns?: number;

  mines?: number;

  opened?: number;

  flags?: number;
}