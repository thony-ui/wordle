import React from "react";
import Box from "./Box";

const ROW_LENGTH = 5;
function Row({ word, status }: { word: string; status: string[] }) {
  const rowLength = Array.from({ length: ROW_LENGTH }).fill(null);
  return (
    <div className="flex flex-row gap-4">
      {rowLength.map((_, index) => (
        <Box key={index} letter={word[index]} status={status[index]} />
      ))}
    </div>
  );
}

export default Row;
