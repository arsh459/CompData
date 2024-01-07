import React from "react";

interface PaginationDotsProps {
  postCount: number;
  currentPostIndex: number;
  setCurrentPostIndex: (index: number) => void;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({
  postCount,
  currentPostIndex,
  setCurrentPostIndex,
}) => {
  const dots = Array.from({ length: postCount }, (_, i) => i);

  return (
    <div className="flex items-center py-8">
      {dots.map((dot, index) => (
        <button
          key={index}
          className={` bg-[#FFFFFF26] rounded-md  w-8 sm:w-14 lg:w-20 h-1.5 mx-2 ${
            currentPostIndex === index ? "bg-[#fff]" : ""
          }`}
          onClick={() => setCurrentPostIndex(index)}
        />
      ))}
    </div>
  );
};

export default PaginationDots;
