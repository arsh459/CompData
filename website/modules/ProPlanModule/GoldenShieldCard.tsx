import React from "react";

const GoldenShieldCard = () => {
  return (
    <div className="flex flex-col flex-1   mt-44 bg-[#00000066] rounded-[35px]  relative z-0 border-2 border-[#FFFFFF47]">
      <div className="flex items-center justify-center px-8 md:px-12 py-4 md:py-8">
        <div className="w-2/5 max-w-[164px] aspect-1">
          <img
            src="https://ik.imagekit.io/socialboat/Group_1653_M6yTFH7mT.png?updatedAt=1683140873638"
            className="w-full aspect-1 rounded-full"
          />
        </div>
        <p className="text-3xl sm:text-5xl md:text-7xl font-nunitoEB whitespace-nowrap text-white pl-4">
          <span className="font-spectralR">Welcome to</span>
          <br />
          Socialboat Pro
        </p>
      </div>
      <p className="text-xl md:text-2xl pt-2 px-4 font-nunitoSB py-4 text-white/60  text-center">
        In the Next 3 Months we will reverse your PCOS
      </p>
      <div className="rounded-b-[35px] py-4 border-t-[.5px]  border-[#9A907D]">
        {/* <p className="text-xs md:text-sm py-2 font-nunitoSB  text-white/60 text-center ">
          Expiring on 3rd March 2024
        </p> */}
      </div>
    </div>
  );
};

export default GoldenShieldCard;
