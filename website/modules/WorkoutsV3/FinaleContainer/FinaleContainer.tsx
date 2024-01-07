import React from "react";

interface Props {
  children?: React.ReactNode;
}
const FinaleContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="rounded-3xl h-full p-4 bg-gradient-to-t from-[#080808] to-[#404040] ">
      {children}
    </div>
  );
};

export default FinaleContainer;
