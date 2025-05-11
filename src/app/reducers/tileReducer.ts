export enum TileState {
  SET_STATUS,
  SET_WORDS,

  RESET,
}

export const INITIAL_STATE = {
  status: Array.from({ length: 6 }, () => Array(5).fill("")),
  words: ["", "", "", "", "", ""],
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

export type TileReducerAction =
  | TileStateActionSetStatus
  | TileStateActionSetWords
  | TileStateActionReset;

export interface TileReducerState {
  status: string[][];
  words: string[];
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
    default:
      return INITIAL_STATE as TileReducerState;
  }
};
