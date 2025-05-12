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
  UPDATE_CURRENT_WORD,

  DELETE_LAST_LETTER,

  RESET_CURRENT_WORD,
}

export const INITIAL_STATE = {
  status: Array.from({ length: 6 }, () => Array(5).fill("")),
  words: ["", "", "", "", "", ""],
  firstRow: Array.from({ length: 10 }).fill(false) as boolean[],
  secondRow: Array.from({ length: 9 }).fill(false) as boolean[],
  thirdRow: Array.from({ length: 7 }).fill(false) as boolean[],
  seenLetters: [] as string[],
  currentWord: "",
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

export interface TileStateActionUpdateCurrentWord {
  type: TileState.UPDATE_CURRENT_WORD;
  payload: {
    letter: string;
  };
}

export interface TileStateActionDeleteLastLetter {
  type: TileState.DELETE_LAST_LETTER;
}

export interface TileStateActionResetCurrentWord {
  type: TileState.RESET_CURRENT_WORD;
}

export type TileReducerAction =
  | TileStateActionSetStatus
  | TileStateActionSetWords
  | TileStateActionReset
  | TileStateActionUpdateTileColor
  | TileStateActionUpdateCurrentWord
  | TileStateActionDeleteLastLetter
  | TileStateActionResetCurrentWord;

export interface TileReducerState {
  status: string[][];
  words: string[];
  firstRow: boolean[];
  secondRow: boolean[];
  thirdRow: boolean[];

  seenLetters: string[];
  currentWord: string;
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
    case TileState.UPDATE_CURRENT_WORD: {
      const { letter } = action.payload;
      const nextSeenLetters = [...state.seenLetters, letter];
      const nextCurrentWord = state.currentWord + letter;
      return {
        ...state,
        seenLetters: nextSeenLetters,
        currentWord: nextCurrentWord,
      };
    }
    case TileState.DELETE_LAST_LETTER: {
      const nextSeenLetters = [...state.seenLetters.slice(0, -1)];
      const nextCurrentWord = state.currentWord.slice(0, -1);
      return {
        ...state,
        seenLetters: nextSeenLetters,
        currentWord: nextCurrentWord,
      };
    }
    case TileState.RESET_CURRENT_WORD: {
      return {
        ...state,
        currentWord: "",
      };
    }
    default:
      return INITIAL_STATE;
  }
};
