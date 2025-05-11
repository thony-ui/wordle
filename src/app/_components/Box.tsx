import React from "react";

function Box({ letter, status }: { letter: string; status: string }) {
  let bgColor = "";
  if (status === "present") {
    bgColor = "bg-yellow-200";
  } else if (status === "absent") {
    bgColor = "bg-gray-200";
  } else if (status === "correct") {
    bgColor = "bg-green-200";
  }

  return (
    <div
      className={`w-[50px] h-[50px]  border-1 border-black flex items-center justify-center ${bgColor}`}
    >
      <p>{letter}</p>
    </div>
  );
}

export default Box;
