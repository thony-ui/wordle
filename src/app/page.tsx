"use client";
import { useEffect, useMemo, useState } from "react";
import Row from "./_components/Row";
import { useGetWord } from "./queries/use-get-word";
import TileRows from "./_components/TileRows";
import Loader from "./_components/Loader";

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
  const [words, setWords] = useState<string[]>(["", "", "", "", "", ""]);
  const [word, setWord] = useState<string>("");
  const [currentWord, setCurrentWord] = useState<string>("");
  const index = useMemo(() => words.findIndex((w) => w === ""), [words]);
  const [status, setStatus] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const { data, isLoading, isError } = useGetWord();
  const firstRowOfLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRowOfLetters = [
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "enter",
  ];
  const thirdRowOfLetters = ["Z", "X", "C", "V", "B", "N", "M", "delete"];
  const updateStatusAndWord = (result: string[]) => {
    setStatus((prev) => {
      const next = [...prev];
      next[index] = result;
      return next;
    });
    setWords((prev) => {
      const next = [...prev];
      next[index] = currentWord;
      return next;
    });
  };
  const checkWinOrLose = () => {
    if (currentWord === word) {
      alert("You Win");
      resetState();
    } else if (index === words.length - 1) {
      alert("You Lose. The word was " + word);
      resetState();
    }
  };
  const resetState = () => {
    setWords(["", "", "", "", "", ""]);
    setStatus(Array.from({ length: 6 }, () => Array(5).fill("")));
  };
  const clickTile = (letter: string) => {
    if (letter === "enter" && currentWord.length === 5) {
      const result = Array(5).fill(undefined);
      const answerLetters = word.split("");
      const inputLetters = currentWord.split("");
      checkCorrectPosition(result, answerLetters, inputLetters);
      updateStatusAndWord(result);
      checkWinOrLose();
      setCurrentWord("");
      return;
    }
    if (currentWord.length < 5) {
      setCurrentWord((prev) => prev + letter.toLowerCase());
    }
  };
  const deleteWordInTile = () => {
    setCurrentWord((prev) => prev.slice(0, -1));
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      deleteWordInTile();
      return;
    }
    if (currentWord.length < 5 && event.key.match(/^[a-zA-Z]$/)) {
      setCurrentWord((prev) => prev + event.key.toLocaleLowerCase());
      return;
    }
    if (currentWord.length === 5 && event.key === "Enter") {
      // check if its a current word when user press enter
      const result = Array(5).fill(undefined);
      const answerLetters = word.split("");
      const inputLetters = currentWord.split("");
      checkCorrectPosition(result, answerLetters, inputLetters);
      updateStatusAndWord(result);
      checkWinOrLose();
      setCurrentWord("");
      return;
    }
  };
  useEffect(() => {
    setWord(data?.word ?? "");
  }, [data]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  if (isLoading) return <Loader>Loading...</Loader>;
  if (isError) return <Loader>Error</Loader>;

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-6xl font-bold text-center">Wordle</h1>
      {words.map((word, i) => (
        <Row
          key={i}
          word={i === index ? currentWord : word}
          status={status[i]}
        />
      ))}
      <TileRows tiles={firstRowOfLetters} onClick={clickTile} />
      <TileRows tiles={secondRowOfLetters} onClick={clickTile} />
      <TileRows
        tiles={thirdRowOfLetters}
        onClick={clickTile}
        onDelete={deleteWordInTile}
      />
    </div>
  );
}
