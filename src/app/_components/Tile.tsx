import React from "react";

function Tile({
  character,
  onClick,
  colorStatus,
  onDelete,
}: {
  character: string;
  onClick: (letter: string) => void;
  colorStatus: boolean;
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
      } ${
        colorStatus ? "bg-gray-500" : "bg-green-800"
      } text-white flex flex-col items-center justify-center cursor-pointer rounded-md`}
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
