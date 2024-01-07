import { useEffect, useState } from "react";
import { badgeTypes, SBPrize } from "@models/Prizes/PrizeV2";
import BadgeSelector from "./Badges/BadgeSelector";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getHeight } from "../../getAspectRatio";

interface Props {
  badgeType: badgeTypes;
  prizes: SBPrize[];
  onCloseModal: () => void;
}

const ShowPrize: React.FC<Props> = ({ badgeType, prizes, onCloseModal }) => {
  const [showInteraction, setShowInteraction] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setShowInteraction(false);
    }, 2000);
  }, []);

  return (
    <div className="max-w-xs flex-1">
      <div className="flex flex-col justify-between items-center pb-8">
        <BadgeSelector
          badgeType={badgeType}
          effect={showInteraction ? "spin" : "ripple"}
        />
        <p className="text-center text-xl font-extrabold">
          You have unlocked this reward.
        </p>
        <h3 className="text-lg text-center pb-4">
          Reach us on +91 9599014590 if you have any questions
        </h3>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="growAnimation transition-all"
      >
        {prizes.map((each, index) => (
          <SwiperSlide
            key={`${each.name}-${index}`}
            className="flex flex-col justify-center items-center"
          >
            <div className="w-1/2 m-8 relative z-0">
              <MediaTile
                media={each.media}
                alt="media"
                width={400}
                height={getHeight(each.media, 400)}
                rounded
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#6AA0D1] to-[#5FABC2] blur-lg" />
            </div>
            <p className="text-center text-xl font-extrabold">
              {each.description}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShowPrize;
