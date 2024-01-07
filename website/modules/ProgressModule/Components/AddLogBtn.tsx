import React from "react";
interface Props {
  text?: string;
  replaceText?: string;
}
const AddLogBtn: React.FC<Props> = ({ text, replaceText }) => {
  return (
    <div className="border-2 border-[#FF60A3] text-[#FF60A3] rounded-3xl p-4 sm:py-6 cursor-pointer  text-center">
      <p className="text-xl sm:text-2xl font-nunitoSB leading-6">
        {"+ "}
        {replaceText || `Add New ${text}`}
      </p>
    </div>
  );
};

export default AddLogBtn;
