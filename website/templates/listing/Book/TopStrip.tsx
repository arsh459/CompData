import React from "react";

interface Props {
  registerBy?: Date | null;
  text?: string;
}
const TopStrip: React.FC<Props> = ({ registerBy, text }) => {
  return (
    <div>
      {registerBy ? (
        <div className="bg-orange-500 p-1 flex justify-center">
          <p className="text-gray-100 text-xs pr-1">Program starts:</p>
          <p className="text-gray-50 text-xs font-bold">
            {registerBy.toLocaleDateString("default", {
              month: "short",
              day: "2-digit",
              hour: "numeric",
              weekday: "short",
              hour12: true,
              minute: "2-digit",
            })}
          </p>
        </div>
      ) : text ? (
        <div className="bg-orange-500 p-1 flex justify-center">
          <p className="text-gray-50 text-xs font-bold">{text}</p>
        </div>
      ) : null}
    </div>
  );
};

export default TopStrip;
