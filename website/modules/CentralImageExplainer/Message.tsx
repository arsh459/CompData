import clsx from "clsx";
import React from "react";

interface Props {
  text: string;
  heading: string;
}

const Message: React.FC<Props> = ({ text, heading, children }) => {
  return (
    // <div className="w-full md:w-1/4 h-48 p-4 m-4 rounded-xl shadow-2xl bg-gray-50 flex flex-col justify-between">
    <div
      className={clsx(
        // "max-w-sm",
        "w-full sm:max-w-sm"
        // "justify-self-stretch",
        // "bg-red-400"
        // "p-4 shadow-2xl hover:bg-gray-50 rounded-xl",
        // "flex flex-col justify-between"
        // "w-48"
        // "w-6"
      )}
    >
      <div>{children}</div>
      <div className={clsx("pt-4")}>
        <p className="font-semibold">{heading}</p>
        <p className="text-base lg:text-base text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Message;
