import React from "react";
interface Props {
  heading?: string;
}
const SectionHeader: React.FC<Props> = ({ heading }) => {
  return (
    <div className="w-screen flex items-center bg-[#FFECF5] ">
      <p className=" py-1.5 px-4 text-lg font-popSB text-black/70 ">
        {heading}
      </p>
      <p className="bg-black/70 flex-[.7] h-px "></p>
    </div>
  );
};

export default SectionHeader;
