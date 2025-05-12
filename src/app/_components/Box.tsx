import React from "react";

function Box({ letter, status }: { letter: string; status: string }) {
  let bgColor = "";
  if (status === "present") {
    bgColor = "bg-yellow-300";
  } else if (status === "absent") {
    bgColor = "bg-gray-300";
  } else if (status === "correct") {
    bgColor = "bg-green-300";
  } else {
    bgColor = "bg-green-100";
  }

  return (
    <div
      className={`w-[50px] h-[50px]  border-1 border-green-100 flex items-center justify-center ${bgColor} text-green-800 font-bold`}
    >
      <p>{letter}</p>
    </div>
  );
}

export default Box;
