export interface SpreadsheetData {
  data: any[][];
  fileName: string;
  lastModified?: Date;
}

export interface CellStats {
  totalCells: number;
  filledCells: number;
  rows: number;
  cols: number;
}