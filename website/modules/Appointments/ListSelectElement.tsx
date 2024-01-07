import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
interface Props {
  onClick: (val: boolean) => void;
  text?: string;
}
const ListSelectElement: React.FC<Props> = ({ onClick, text }) => {
  return (
    <div
      onClick={() => onClick(true)}
      className="bg-[#FFECF5] cursor-pointer items-center flex-1 mb-2 lg:mb-0 lg:w-1/2 flex justify-between rounded-2xl px-4 py-2 mx-4 "
    >
      <p className="text-[#00000080] font-popR text-sm flex ">
        <span className="font-popM text-black">{text}</span>
      </p>
      <div>
        <ChevronDownIcon className="w-8 h-8" color="#5F647E" />
      </div>
    </div>
  );
};

export default ListSelectElement;
