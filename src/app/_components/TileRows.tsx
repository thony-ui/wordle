import React from "react";
import Tile from "./Tile";
import { motion } from "framer-motion";

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
    <motion.div
      className="flex gap-1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {tiles.map((letter, i) => (
        <Tile
          key={i}
          character={letter}
          onClick={onClick}
          colorStatus={status[i]}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
}

export default TileRows;
