import React from "react";

function Loader({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}

export default Loader;
