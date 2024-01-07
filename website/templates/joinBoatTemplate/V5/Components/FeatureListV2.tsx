import React from "react";
import clsx from "clsx";
import { ListCard } from "@templates/joinBoatTemplate/utils";
interface Props {
  featureList: ListCard;
  isLast: boolean;
}
const FeatureListCardV2: React.FC<Props> = ({ featureList, isLast }) => {
  return (
    <div className=" ">
      <div className="flex flex-row   justify-center  items-center">
        <div className="p-4  pt-0  pb-0 ">
          <img
            src={featureList?.iconUri}
            className="  max-w-[5rem]  mx-auto aspect-[82/83] "
          />
        </div>
        <div className="flex-1 ">
          <p className="text-sm iphoneX:text-base pixelXl:text-lg text-white font-baib pb-1">
            {featureList.heading}
          </p>
          <ul className="list-disc list-inside ">
            {featureList.list.map((list, index) => (
              <li
                key={`${list}-${index}`}
                className="text-xs pixelXl:text-sm text-[#FFFFFFF2] font-baim leading-relaxed"
              >
                {list}
              </li>
            ))}
          </ul>
          {/* {featureList.list.map((list, index) => (
            <p className="text-xs text-[#FFFFFFF2] font-baim pb-2" key={index}>
              <span className="text-sm">{`\u2022  `}</span>
              {list}
            </p>
          ))} */}
        </div>
      </div>
      <div
        className={clsx(" w-full bg-[#FFFFFF36] ", isLast ? "" : "my-5  h-px")}
      />
    </div>
  );
};

export default FeatureListCardV2;
