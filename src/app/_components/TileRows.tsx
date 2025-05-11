import React from "react";
import Tile from "./Tile";

function TileRows({
  tiles,
  onClick,
  onDelete,
}: {
  tiles: string[];
  onClick: (letter: string) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex gap-1">
      {tiles.map((letter, i) => (
        <Tile
          key={i}
          character={letter}
          onClick={onClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TileRows;
