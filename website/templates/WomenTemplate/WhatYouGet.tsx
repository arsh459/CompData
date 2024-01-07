import {
  whatYouGetBadge1,
  whatYouGetBadge2,
  whatYouGetBadge3,
} from "@constants/icons/iconURLs";
import React from "react";
import WhatYouGetCard from "./components/WhatYouGetCard";

const WhatYouGet = () => {
  return (
    <div className="px-4  my-16 md:flex md:justify-evenly w-full  max-w-screen-xl mx-auto">
      <WhatYouGetCard
        imgUri={whatYouGetBadge1}
        gradientText="bg-gradient-to-b from-[#ABFF6A99] to-[#FCFF6A99]"
        subText=""
      >
        <h3 className="font-baiSb text-xl">
          <span className="text-[#FF4266] font-baiSb  text-2xl">
            {" "}
            SB Athlete{" "}
          </span>{" "}
          in <br /> 300 Fitpoints
        </h3>
      </WhatYouGetCard>
      <WhatYouGetCard
        imgUri={whatYouGetBadge2}
        gradientText="bg-gradient-to-b from-[#F49AE2] to-[#B896FF]"
        subText=""
        isReverse={true}
      >
        <h3 className="font-baiSb text-xl">
          <span className="text-[#FF4266] font-baiSb  text-2xl">
            {" "}
            Fittest Women{" "}
          </span>{" "}
          for <br /> maximum Fitpoints
        </h3>
      </WhatYouGetCard>
      <WhatYouGetCard
        gradientText="bg-gradient-to-b from-[#FFC93599] to-[#F8C94199]"
        imgUri={whatYouGetBadge3}
        subText=""
      >
        <h3 className="font-baiSb text-xl">
          <span className="text-[#FF4266] font-baiSb text-2xl">
            {" "}
            Fittest Team{" "}
          </span>{" "}
          for <br /> maximum Fitpoints
        </h3>
      </WhatYouGetCard>
    </div>
  );
};

export default WhatYouGet;
