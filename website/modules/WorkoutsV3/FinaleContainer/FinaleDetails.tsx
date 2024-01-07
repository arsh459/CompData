import React from "react";
interface Props {
  textPrimary?: string;
  textSecondary?: string;
}
const FinaleDetails: React.FC<Props> = ({ textPrimary, textSecondary }) => {
  return (
    <div className="text-white flex-2 mr-2">
      <p className=" font-extrabold text-lg iphoneX:text-2xl italic  text-transparent bg-clip-text bg-gradient-to-b from-[#FFE497] via-[#D1B76E] to-[#9F894C] tracking-wider whitespace-nowrap">
        {textPrimary ? textPrimary : "Grand Finale"}
      </p>
      <p className="text-base font-semibold iphoneX:text-xl italic line-clamp-1  text-transparent bg-clip-text bg-gradient-to-b from-white via-white/70 to-black ">
        {textSecondary}
      </p>
    </div>
  );
};

export default FinaleDetails;
