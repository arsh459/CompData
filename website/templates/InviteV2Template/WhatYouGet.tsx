import { whatYouGetType } from "@constants/inviteV2/whatYouGet";
import WhatYouGetCard from "@templates/WomenTemplate/components/WhatYouGetCard";

interface Props {
  whatYouGet: whatYouGetType[];
}

const WhatYouGet: React.FC<Props> = ({ whatYouGet }) => {
  return (
    <div className="px-4 my-16 md:flex md:justify-evenly w-full max-w-screen-xl mx-auto">
      {whatYouGet.map((item, index) => (
        <WhatYouGetCard
          key={`WhatYouGet-${index}`}
          imgUri={item.image}
          backgroundColor={item.backgroundColor}
          alt={`${item.text} badge image`}
          isReverse={index % 2 === 0}
        >
          {item.text.split("\n").map((each) => (
            <h3 key={each} className="font-popR text-xl">
              {each}
            </h3>
          ))}
        </WhatYouGetCard>
      ))}
    </div>
  );
};

export default WhatYouGet;
