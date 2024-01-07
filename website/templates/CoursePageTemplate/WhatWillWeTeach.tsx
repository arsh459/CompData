import { TextAndImgType } from "@models/Prizes/PrizeV2";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";

interface Props {
  whatWeTeach?: TextAndImgType[];
}

const WhatWillWeTeach: React.FC<Props> = ({ whatWeTeach }) => {
  return (
    <div className="bg-black/30 p-4 rounded-2xl">
      <p
        className="text-sm px-4 iphoneX:text-sm text-white/60"
        style={{
          fontFamily: "BaiJamjuree-SemiBold",
        }}
      >
        What will we teach
      </p>
      <div className="flex flex-row p-2">
        {whatWeTeach?.map((item, index) => (
          <div
            key={`${item.text}_${index}`}
            className="flex-1 flex flex-col items-center p-2"
          >
            <div className="w-1/2 flex justify-center items-center">
              {item.icon ? (
                <MediaTile
                  media={item.icon}
                  alt="icon"
                  width={100}
                  height={100}
                />
              ) : null}
            </div>
            <p className="text-white/60 text-xs w-3/5 text-center font-sans pt-2">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWillWeTeach;
