import clsx from "clsx";
import React from "react";

interface Props {
  editing?: boolean;
  active?: boolean;
}
const TextLayout: React.FC<Props> = ({ children, editing, active }) => {
  return (
    <div
      className={clsx(
        "relative",
        editing ? "cursor-pointer p-1 shadow-sm" : "",
        editing && active ? "bg-white" : ""
        // editing ? "transform hover:-translate-y-1" : ""
        // !active && editing ? "bg-smoke-400 hover:bg-gray-100" : ""
        // !active && editing ? "" : ""
      )}
    >
      {/* {!active && editing ? (
        <div className="opacity-30 bg-black hover:opacity-0 hover:shadow-2xl absolute left-0 top-0 right-0 bottom-0" />
      ) : null} */}

      {children}
    </div>
  );
};

export default TextLayout;
