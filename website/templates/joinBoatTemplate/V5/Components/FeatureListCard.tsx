import React from "react";
import { ListCard } from "@templates/joinBoatTemplate/utils";
interface Props {
  featureList: ListCard;
  isLast: boolean;
}
const FeatureListCard: React.FC<Props> = ({ featureList, isLast }) => {
  return (
    <div className="flex flex-row   justify-center  items-center ">
      <img src={featureList?.iconUri} className="  p-3 md:p-5  pl-0 pb-1" />

      <div className="flex-1 pr-2 md:pr-4">
        <p className="text-base md:text-2xl text-white font-baib pb-1">
          {featureList.heading}
        </p>
        {/* <ul className="list-disc list-inside ">
            {featureList.list.map((list, index) => (
              <li className="text-xs pixelXl:text-sm text-[#FFFFFFF2] font-baim leading-relaxed">
                {list}
              </li>
            ))}
          </ul> */}
        {featureList.list.map((list, index) => (
          <p
            className="text-sm md:text-lg text-[#FFFFFFF2] font-bair "
            key={index}
          >
            <span className="text-2xl">{`\u2022  `}</span>
            {list}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeatureListCard;
