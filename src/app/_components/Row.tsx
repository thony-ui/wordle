import React from "react";
import Box from "./Box";

const ROW_LENGTH = 5;
function Row({ word, status }: { word: string; status: string[] }) {
  const rowLength = Array.from({ length: ROW_LENGTH }).fill(null);
  return (
    <div className="flex flex-row gap-2">
      {rowLength.map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Box key={index} letter={word[index]} status={status[index]} />
      ))}
    </div>
  );
}

export default Row;
