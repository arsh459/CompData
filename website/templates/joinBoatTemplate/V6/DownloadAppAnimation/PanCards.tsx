import SwiperCore, { Autoplay, EffectCards, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import WhatYouGetCard from "./WhatYouGetCard";

interface Props {
  cards: { text: string; img: string }[];
}

const PanCards: React.FC<Props> = ({ cards }) => {
  SwiperCore.use([Autoplay]);

  return (
    <div className="w-5/6 h-full aspect-[312/405] mx-auto block md:hidden">
      <Swiper
        effect="cards"
        modules={[EffectCards, Pagination]}
        loop={true}
        pagination={true}
        autoplay={{ delay: 3000 }}
        // slidesPerView={1.2}
        className="w-full h-full panCards"
      >
        {cards[0] ? (
          <SwiperSlide className="pb-12">
            <WhatYouGetCard data={cards[0]} />
          </SwiperSlide>
        ) : null}
        {cards[1] ? (
          <SwiperSlide className="pb-12">
            <WhatYouGetCard data={cards[1]} />
          </SwiperSlide>
        ) : null}
        {cards[2] ? (
          <SwiperSlide className="pb-12">
            <WhatYouGetCard
              data={{
                text: "Free Health Consultation call",
                img: "https://ik.imagekit.io/socialboat/Frame%201905_C9W7ZpUeB8.png?updatedAt=1692693308920",
              }}
            />
          </SwiperSlide>
        ) : null}
      </Swiper>
    </div>
  );
};

export default PanCards;
