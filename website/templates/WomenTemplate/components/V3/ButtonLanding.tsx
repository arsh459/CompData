import React from "react";
interface Props {
  text: string;
}
const ButtonLanding: React.FC<Props> = ({ text }) => {
  return (
    <div className="px-6 py-2 w-full text-center md:w-fit cursor-pointer  whitespace-nowrap text-xs md:text-sm font-popM rounded-full bg-white">
      <p className="text-[#000]">{text}</p>
    </div>
  );
};

export default ButtonLanding;
