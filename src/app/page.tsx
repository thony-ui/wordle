"use client";
import { useEffect, useMemo, useReducer, useState } from "react";
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

function checkCorrectPosition(
  result: string[],
  answer: string[],
  word: string[]
) {
  const letterCount = new Map<string, number>();

  for (let i = 0; i < word.length; i++) {
    if (word[i] === answer[i]) {
      result[i] = "correct";
    } else {
      letterCount.set(answer[i], (letterCount.get(answer[i]) || 0) + 1);
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (result[i]) continue;
    if (letterCount.get(word[i])) {
      result[i] = "present";
      letterCount.set(word[i], letterCount.get(word[i])! - 1);
    } else {
      result[i] = "absent";
    }
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(tileReducer, INITIAL_STATE);
  const [word, setWord] = useState<string>("");
  const [seenLetters, setSeenLetters] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
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
        currentWord,
      },
    });
  };
  const checkWinOrLose = () => {
    if (currentWord === word) {
      alert("You win!");
      resetState();
    } else if (index === state.words.length - 1) {
      alert("You lose!");
      resetState();
    }
  };
  const resetState = () => {
    dispatch({
      type: TileState.RESET,
    });
  };
  const clickTile = (letter: string) => {
    if (letter != "enter" && currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter.toLowerCase());
      setSeenLetters((prev) => [...prev, letter.toUpperCase()]);
      return;
    }
    if (letter === "enter" && currentWord.length === 5) {
      const result = Array(5).fill(undefined);
      const answerLetters = word.split("");
      const inputLetters = currentWord.split("");
      checkCorrectPosition(result, answerLetters, inputLetters);
      updateStatusAndWord(result);
      dispatch({
        type: TileState.UPDATE_TILE_COLOR,
        payload: {
          seenLetters,
        },
      });

      checkWinOrLose();
      setCurrentWord("");
    }
  };
  const deleteWordInTile = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
    setSeenLetters((prev) => prev.slice(0, -1));
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      deleteWordInTile();
      return;
    }
    if (currentWord.length < 5 && event.key.match(/^[a-zA-Z]$/)) {
      setCurrentWord((prev) => prev + event.key.toLocaleLowerCase());
      setSeenLetters((prev) => [...prev, event.key.toUpperCase()]);
      return;
    }
    if (currentWord.length === 5 && event.key === "Enter") {
      // check if its a current word when user press enter

      const result = Array(5).fill(undefined);
      const answerLetters = word.split("");
      const inputLetters = currentWord.split("");
      checkCorrectPosition(result, answerLetters, inputLetters);
      updateStatusAndWord(result);
      dispatch({
        type: TileState.UPDATE_TILE_COLOR,
        payload: {
          seenLetters,
        },
      });
      checkWinOrLose();
      setCurrentWord("");
    }
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
  }, [currentWord]);

  if (isLoading) return <Loader>Loading...</Loader>;
  if (isError) return <Loader>Error</Loader>;

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-6xl font-bold text-center">Wordle</h1>
      {state.words.map((word, i) => (
        <Row
          key={i}
          word={i === index ? currentWord : word}
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
