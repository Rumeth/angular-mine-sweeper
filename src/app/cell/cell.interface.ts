export interface Cell {
  open?:boolean;

  mine?:boolean;

  flag?:boolean;

  row?:number;

  column?:number;

  proximity?:number;
}