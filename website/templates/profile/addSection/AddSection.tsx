import clsx from "clsx";
import React from "react";

interface Props {}
const AddSection: React.FC<Props> = ({}) => {
  return (
    <div
      className={clsx(
        "border border-gray-200 rounded-lg",
        "bg-gray-50",
        "flex justify-center items-center",
        "p-4 shadow-lg"
      )}
    >
      <div>
        <p className="text-gray-600 font-semibold text-base">Add section</p>
      </div>
    </div>
  );
};

export default AddSection;
