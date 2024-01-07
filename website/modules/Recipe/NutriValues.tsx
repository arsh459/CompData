import React from "react";
interface Props {
  icon?: string;
  text?: string;
  value?: string;
}
const NutriValues: React.FC<Props> = ({ icon, text, value }) => {
  return (
    <div className="flex  items-center font-nunitoR text-sm sm:text-base md:text-lg text-white/50">
      {icon ? <img src={icon} alt="" className="w-4 h-4 " /> : null}
      <p className="pl-1">
        {text} : {value}
      </p>
    </div>
  );
};

export default NutriValues;
