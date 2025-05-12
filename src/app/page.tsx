"use client";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import Row from "./_components/Row";
import { useGetWord } from "./queries/use-get-word";
import TileRows from "./_components/TileRows";
import Loader from "./_components/Loader";
import { INITIAL_STATE, tileReducer, TileState } from "./reducers/tileReducer";
import {
  FIRST_ROW_OF_LETTERS,
  SECOND_ROW_OF_LETTERS,
  THIRD_ROW_OF_LETTERS,
} from "./constants/rowOfLetters";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { checkCorrectPosition } from "./helpers/gameHelper";

export default function Home() {
  const [state, dispatch] = useReducer(tileReducer, INITIAL_STATE);
  const [word, setWord] = useState<string>("");
  const index = useMemo(
    () => state.words.findIndex((w) => w === ""),
    [state.words]
  );

  const { data, isLoading, isError } = useGetWord();

  const updateStatusAndWord = (result: string[]) => {
    dispatch({
      type: TileState.SET_STATUS,
      payload: {
        index,
        result,
      },
    });
    dispatch({
      type: TileState.SET_WORDS,
      payload: {
        index,
        currentWord: state.currentWord,
      },
    });
  };
  const checkWinOrLose = (currentWord: string, word: string) => {
    if (currentWord !== word && index !== state.words.length - 1) {
      return;
    }
    if (currentWord === word || index === state.words.length - 1) {
      const isWin = currentWord === word;
      setTimeout(() => {
        Swal.fire({
          title: `${isWin ? "Congratulations!" : "Game Over"}`,
          text: `${
            isWin ? `You guessed the word! ${word}` : `Try and guess again!`
          }`,
          icon: `${isWin ? "success" : "error"}`,
          confirmButtonText: "Play Again",
        }).then(() => {
          resetState();
        });
      }, 0);
    }
  };

  const resetState = () => {
    dispatch({
      type: TileState.RESET,
    });
  };
  const updateCurrentWord = useCallback((letter: string) => {
    dispatch({
      type: TileState.UPDATE_CURRENT_WORD,
      payload: {
        letter: letter,
      },
    });
  }, []);

  const clickTile = (letter: string) => {
    const lower = letter.toLowerCase();

    if (lower === "backspace") {
      deleteWordInTile();
      return;
    }

    if (lower === "enter" && state.currentWord.length === 5) {
      const result = Array(5).fill(undefined);
      const answerLetters = word.split("");
      const inputLetters = state.currentWord.split("");
      checkCorrectPosition(result, answerLetters, inputLetters);
      updateStatusAndWord(result);
      dispatch({
        type: TileState.UPDATE_TILE_COLOR,
        payload: {
          seenLetters: state.seenLetters,
        },
      });
      checkWinOrLose(state.currentWord, word);
      dispatch({
        type: TileState.RESET_CURRENT_WORD,
      });
      return;
    }

    if (/^[a-zA-Z]$/.test(lower) && state.currentWord.length < 5) {
      updateCurrentWord(lower);
    }
  };

  const deleteWordInTile = useCallback(() => {
    dispatch({
      type: TileState.DELETE_LAST_LETTER,
    });
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    clickTile(event.key);
  };

  useEffect(() => {
    Swal.fire({
      title: "Welcome to Wordle",
      text: "Try to guess the word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.",
      icon: "info",
      confirmButtonText: "OK",
    });
  }, []);

  useEffect(() => {
    setWord(data?.word ?? "");
  }, [data]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.currentWord]);

  if (isLoading) return <Loader>Loading...</Loader>;
  if (isError) return <Loader>Error</Loader>;

  return (
    <div className="flex flex-col gap-4 items-center">
      <motion.h1
        className="text-6xl font-bold text-center text-green-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Wordle
      </motion.h1>
      {state.words.map((word, i) => (
        <Row
          key={i}
          word={i === index ? state.currentWord : word}
          status={state.status[i]}
        />
      ))}
      <TileRows
        tiles={FIRST_ROW_OF_LETTERS}
        onClick={clickTile}
        status={state.firstRow}
      />
      <TileRows
        tiles={SECOND_ROW_OF_LETTERS}
        onClick={clickTile}
        status={state.secondRow}
      />
      <TileRows
        tiles={THIRD_ROW_OF_LETTERS}
        onClick={clickTile}
        status={state.thirdRow}
        onDelete={deleteWordInTile}
      />
    </div>
  );
}
