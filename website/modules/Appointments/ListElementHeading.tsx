import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react";
interface Props {
  onClick: () => void;
  text?: string;
}
const ListElementHeading: React.FC<Props> = ({ onClick, text }) => {
  return (
    <>
      <div className="flex items-center">
        <div onClick={onClick} className="cursor-pointer">
          <ChevronLeftIcon className="w-8 h-8" color="#5F647E" />
        </div>

        <p className="text-black text-sm font-popM w-full  py-5">{text}</p>
      </div>
      <div className="px-4  border-b border-[#00000014]" />
    </>
  );
};

export default ListElementHeading;
