export function checkCorrectPosition(
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
