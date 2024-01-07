import { ListCard } from "@templates/joinBoatTemplate/utils";
import clsx from "clsx";

interface Props {
  featureList: ListCard;
  isLast: boolean;
}
const FeatureListCard: React.FC<Props> = ({ featureList, isLast }) => {
  return (
    <>
      <div className="w-full flex lg:flex-col items-center lg:p-4">
        <img
          src={featureList?.iconUri}
          className="w-1/4 lg:w-1/2 aspect-1"
          alt={featureList.heading}
        />

        <div className="w-5 aspect-1" />

        <div className="flex-1 lg:flex flex-col justify-center items-center">
          <h6
            className="text-sm lg:text-base font-popM"
            style={{ color: featureList.textColor }}
          >
            {featureList.heading}
          </h6>

          <div>
            {featureList.list.map((list, index) => (
              <p
                className="text-xs lg:text-sm text-[#FFFFFFF2] font-popL"
                key={index}
              >
                <span className="text-lg">{`\u2022  `}</span>
                {list}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "w-full lg:hidden relative z-0",
          isLast ? "hidden" : "h-px"
        )}
      >
        <div className="absolute -left-8 -right-8 top-0 bottom-0 bg-white/20" />
      </div>
    </>
  );
};

export default FeatureListCard;
