import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
interface Props {
  text?: string;
}
const PatientDetailElement: React.FC<Props> = ({ text }) => {
  return (
    <div
      onClick={() => {}}
      className="bg-white cursor-pointer items-center flex-1 mb-4   flex justify-between rounded-xl p-4  mx-4 "
    >
      <p className="hidden md:block"></p>
      <p className="text-[#383838] font-popM text-base flex justify-self-center ">
        <span className="font-popM text-black">{text}</span>
      </p>
      <div>
        <ChevronDownIcon className="w-6 h-6" color="#5F647E" />
      </div>
    </div>
  );
};

export default PatientDetailElement;
