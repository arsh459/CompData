import { SBPrize } from "@models/Prizes/PrizeV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "../../getAspectRatio";
import clsx from "clsx";
import { getLevelColor } from "@templates/LandingPage/levelColor";

interface Props {
  prizes: SBPrize[];
}

const AllPrizesV2: React.FC<Props> = ({ prizes }) => {
  return (
    <div
      className={clsx("w-full self-start grid px-4 overflow-x-scroll")}
      style={{
        gridTemplateColumns: `repeat(${
          prizes.length >= 6 ? prizes.length / 2 : prizes.length
        }, ${
          prizes.length >= 6 ? "45%" : prizes.length >= 2 ? "85%" : "100%"
        })`,
      }}
    >
      {prizes.map((each, index) => (
        <div
          key={`${each.name}-${index}`}
          className={clsx(
            prizes.length >= 6
              ? "max-h-20 iphoneX:max-h-36"
              : "max-h-40 iphoneX:max-h-60",
            "bg-[#D9D9D9]/10 border border-[#646363] backdrop-blur-md rounded-xl flex flex-col justify-center items-center m-1.5 p-2.5"
          )}
        >
          <div
            className={clsx(
              prizes.length >= 6
                ? "max-h-10 iphoneX:max-h-16"
                : "max-h-20 iphoneX:max-h-32"
            )}
          >
            <MediaTile
              media={each.media}
              alt="media"
              width={400}
              height={getHeight(each.media, 400)}
              rounded
            />
          </div>
          <div className="text-[8px] iphoneX:text-sm pt-0.5">
            <p className="text-white font-medium line-clamp-1">
              {each.name}
              {each.level ? (
                <span>
                  {" · "}
                  <span
                    style={{ color: getLevelColor(each.level).colorPrimary }}
                  >
                    {each.level}
                  </span>
                </span>
              ) : null}
            </p>
            <p className="text-gray-50 line-clamp-2">{each.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPrizesV2;
