import React from "react";
import Box from "./Box";
import { motion } from "framer-motion";

const ROW_LENGTH = 5;
function Row({ word, status }: { word: string; status: string[] }) {
  const rowLength = Array.from({ length: ROW_LENGTH }).fill(null);
  return (
    <motion.div
      className="flex flex-row gap-4"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {rowLength.map((_, index) => (
        <Box key={index} letter={word[index]} status={status[index]} />
      ))}
    </motion.div>
  );
}

export default Row;
