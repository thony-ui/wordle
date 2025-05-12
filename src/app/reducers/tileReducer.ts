import {
  FIRST_ROW_OF_LETTERS,
  SECOND_ROW_OF_LETTERS,
  THIRD_ROW_OF_LETTERS,
} from "../constants/rowOfLetters";

export enum TileState {
  SET_STATUS,
  SET_WORDS,

  RESET,

  UPDATE_TILE_COLOR,
}

export const INITIAL_STATE = {
  status: Array.from({ length: 6 }, () => Array(5).fill("")),
  words: ["", "", "", "", "", ""],
  firstRow: Array.from({ length: 10 }).fill(false) as boolean[],
  secondRow: Array.from({ length: 9 }).fill(false) as boolean[],
  thirdRow: Array.from({ length: 7 }).fill(false) as boolean[],
};

export interface TileStateActionSetStatus {
  type: TileState.SET_STATUS;
  payload: {
    index: number;
    result: string[];
  };
}

export interface TileStateActionSetWords {
  type: TileState.SET_WORDS;
  payload: {
    index: number;
    currentWord: string;
  };
}

export interface TileStateActionReset {
  type: TileState.RESET;
}

export interface TileStateActionUpdateTileColor {
  type: TileState.UPDATE_TILE_COLOR;
  payload: {
    seenLetters: string[];
  };
}

export type TileReducerAction =
  | TileStateActionSetStatus
  | TileStateActionSetWords
  | TileStateActionReset
  | TileStateActionUpdateTileColor;

export interface TileReducerState {
  status: string[][];
  words: string[];
  firstRow: boolean[];
  secondRow: boolean[];
  thirdRow: boolean[];
}

export const tileReducer = (
  state: TileReducerState,
  action: TileReducerAction
): TileReducerState => {
  switch (action.type) {
    case TileState.SET_STATUS: {
      const { index, result } = action.payload;
      const nextStatus = [...state.status];
      nextStatus[index] = result;
      return {
        ...state,
        status: nextStatus,
      };
    }
    case TileState.SET_WORDS: {
      const { index, currentWord } = action.payload;
      const nextWords = [...state.words];
      nextWords[index] = currentWord;
      return {
        ...state,
        words: nextWords,
      };
    }
    case TileState.RESET:
      return INITIAL_STATE;
    case TileState.UPDATE_TILE_COLOR: {
      const { seenLetters } = action.payload;
      const nextFirstRow = [...state.firstRow];
      const nextSecondRow = [...state.secondRow];
      const nextThirdRow = [...state.thirdRow];
      seenLetters.forEach((letter) => {
        FIRST_ROW_OF_LETTERS.forEach((l, j) => {
          if (letter === l) {
            nextFirstRow[j] = true;
          }
        });
        SECOND_ROW_OF_LETTERS.forEach((l, j) => {
          if (letter === l) {
            nextSecondRow[j] = true;
          }
          THIRD_ROW_OF_LETTERS.forEach((l, j) => {
            if (letter === l) {
              nextThirdRow[j] = true;
            }
          });
        });
      });
      return {
        ...state,
        firstRow: nextFirstRow,
        secondRow: nextSecondRow,
        thirdRow: nextThirdRow,
      };
    }
    default:
      return INITIAL_STATE;
  }
};
