import { CellType } from "./actions";

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
