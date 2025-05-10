"use client";
import { useEffect, useMemo, useState } from "react";
import Row from "./_components/Row";

const ANSWER = "hello";

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
  const [currentWord, setCurrentWord] = useState<string>("");
  const index = useMemo(() => words.findIndex((w) => w === ""), [words]);
  const [status, setStatus] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        setCurrentWord((prev) => prev.slice(0, -1));
        return;
      }
      if (currentWord.length < 5 && event.key.match(/^[a-zA-Z]$/)) {
        setCurrentWord((prev) => prev + event.key);
        return;
      }
      if (currentWord.length === 5 && event.key === "Enter") {
        // check if its a current word when user press enter
        const result = Array(5).fill(undefined);
        const answerLetters = ANSWER.split("");
        const inputLetters = currentWord.split("");
        checkCorrectPosition(result, answerLetters, inputLetters);
        // update the status of the current word
        setStatus((prev) => {
          const next = [...prev];
          next[index] = result;
          return next;
        });

        // update the words array with the current word
        setWords((prev) => {
          const next = [...prev];
          next[index] = currentWord;
          return next;
        });
        setCurrentWord("");
        if (currentWord === ANSWER) {
          alert("You Win");
        } else if (index === words.length - 1) {
          alert("You Lose");
        }
        return;
      }
    };
    // listen for onkeydown event
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);
  return (
    <div className="flex flex-col gap-2">
      {words.map((word, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Row
          key={i}
          word={i === index ? currentWord : word}
          status={status[i]}
        />
      ))}
    </div>
  );
}
