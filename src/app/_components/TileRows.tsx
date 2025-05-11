import React from "react";
import Tile from "./Tile";

function TileRows({
  tiles,
  onClick,
  status,
  onDelete,
}: {
  tiles: string[];
  onClick: (letter: string) => void;
  status: boolean[];
  onDelete?: () => void;
}) {
  return (
    <div className="flex gap-1">
      {tiles.map((letter, i) => (
        <Tile
          key={i}
          character={letter}
          onClick={onClick}
          colorStatus={status[i]}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TileRows;
