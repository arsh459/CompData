import WhatYouGetCard from "@templates/WomenTemplate/components/WhatYouGetCard";

const WhatYouGet = () => {
  return (
    <div className="px-4  my-16 md:flex md:justify-evenly w-full  max-w-screen-xl mx-auto">
      <WhatYouGetCard
        imgUri="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,f-auto/Frame_1339_8F74r4YPz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675425719331"
        gradientText="bg-gradient-to-br from-[#2DE6FF]/50 via-[#2DB3FF]/50 to-[#27739D]/50"
        subText=""
        alt="fp badge"
      >
        <h3 className="font-popR text-xl">
          Top 3 win Decathlon <br className="hidden sm:block" /> Vouchers
        </h3>
      </WhatYouGetCard>
      <WhatYouGetCard
        imgUri="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,f-auto/Frame_1339__1__iK12BMa7k.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675425719292"
        gradientText="bg-gradient-to-b from-[#FFC935]/50 to-[#F8C941]/50"
        subText=""
        isReverse={true}
        alt="fittest women badge"
      >
        <h3 className="font-popR text-xl">
          SuperWoman Certificate <br className="hidden sm:block" /> For a 20 day
          streak
        </h3>
      </WhatYouGetCard>
      <WhatYouGetCard
        imgUri="https://ik.imagekit.io/socialboat/tr:w-300,c-maintain_ratio,f-auto/Frame_1339__2__sf11fn722.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675425719322"
        gradientText="bg-gradient-to-tr from-[#FF4FF8]/50 via-[#FF5151]/50 to-[#FF4FF8]/50"
        subText=""
        alt="fittest team trophy"
      >
        <h3 className="font-popR text-xl">
          Free Health consultation <br className="hidden sm:block" /> for
          everyone
        </h3>
      </WhatYouGetCard>
    </div>
  );
};

export default WhatYouGet;
