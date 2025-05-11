import React from "react";

function Tile({
  character,
  onClick,
  onDelete,
}: {
  character: string;
  onClick: (letter: string) => void;
  onDelete?: () => void;
}) {
  return (
    <div
      className={`h-[30px] ${
        character === "delete"
          ? "w-[90px]"
          : character === "enter"
          ? "w-[60px]"
          : "w-[30px]"
      } bg-gray-400 text-white flex flex-col items-center justify-center cursor-pointer rounded-md`}
      onClick={() => {
        if (character === "delete" && onDelete) {
          onDelete();
          return;
        }
        onClick(character);
      }}
    >
      {character}
    </div>
  );
}

export default Tile;
