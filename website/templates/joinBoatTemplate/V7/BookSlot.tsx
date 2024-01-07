import React from "react";
interface Props {
  text?: string;
  img?: string;
}
const BookSlot: React.FC<Props> = ({ img, text }) => {
  return (
    <div className="w-full aspect-[154/199] px-4 bg-[#852F75] border-2 border-white/30 backdrop-blur-md overflow-hidden rounded-3xl mx-auto">
      <div className="w-full h-full flex flex-col items-center justify-between">
        <p
          className="text-xs sm:text-sm  text-white font-nunitoSB flex-1  pt-4    "
          style={{ lineHeight: 0.97, letterSpacing: ".28px" }}
        >
          {text}
        </p>
        <img
          src={img}
          alt=""
          className="w-full aspect-[121/128] object-contain"
        />
      </div>
    </div>
  );
};

export default BookSlot;
