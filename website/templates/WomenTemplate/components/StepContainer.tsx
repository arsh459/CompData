import React from "react";

interface Props {
  heading: string;
}

const StepContainer: React.FC<Props> = ({ children, heading }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4">
      <p className="text-center font-popR text-xl lg:text-3xl pb-6">
        {heading}
      </p>
      {children}
    </div>
  );
};

export default StepContainer;
