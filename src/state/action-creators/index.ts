import { ActionType } from "../action-type";
import {
  CellType,
  DeleteCellAction,
  Direction,
  InsertCellBeforeAction,
  MoveCellAction,
  UpdateCellAction,
} from "../actions";

export const updateCell = (
  cellId: string,
  content: string
): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: cellId,
      content,
    },
  };
};

export const deleteCell = (cellId: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: cellId,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellBefore = (
  id: string,
  cellType: CellType
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
