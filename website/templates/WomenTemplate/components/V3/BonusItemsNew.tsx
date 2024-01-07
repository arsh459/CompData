import { useRef, useState } from "react";
import {
  bonusItem1,
  bonusItem2,
  bonusItem3,
  bonusItem4,
  bonusItem5,
  bonusItem6,
  chatAiIcon,
  communityIcon,
  giftRewardIcon,
  greenStepIcon,
  mealCookerIcon,
  rewardToEarnIcon,
  tripleArrowIcon,
} from "@constants/icons/iconURLs";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  FreeMode,
  Navigation,
  Thumbs,
} from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";

const bonusItems = [
  { text: "500+ Healthy Recipe", img: bonusItem1, icon: mealCookerIcon },
  { text: "Step counter", img: bonusItem2, icon: greenStepIcon },
  { text: "Chat with AI Sakhi ", img: bonusItem3, icon: chatAiIcon },
  {
    text: "Rewards for goal achievement",
    img: bonusItem4,
    icon: giftRewardIcon,
  },
  {
    text: "Access to female wellness community",
    img: bonusItem5,
    icon: communityIcon,
  },
  { text: "Rewards to Earn", img: bonusItem6, icon: rewardToEarnIcon },
];

const BonusItemsNew = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="h-screen w-screen max-w-screen-md mx-auto flex flex-col justify-around items-center py-20 px-4">
      <p className="text-3xl md:text-5xl font-popM w-3/4 p-2 text-center text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
        Bonus items <span className="font-popL">you get!</span>
      </p>

      <div className="flex flex-col justify-center w-full">
        <div className="w-full flex justify-center items-center relative z-0">
          <img
            src={tripleArrowIcon}
            alt=""
            className="w-7 aspect-1 cursor-pointer rotate-180 "
            onClick={() =>
              swiperRef.current &&
              swiperRef.current.swiper &&
              swiperRef.current.swiper.slidePrev()
            }
          />
          <Swiper
            loop={true}
            spaceBetween={10}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full pointer-events-none"
            onSwiper={setThumbsSwiper}
          >
            {bonusItems.map((each, index) => (
              <SwiperSlide key={`BonusItem-${index}`}>
                <div className="flex flex-col w-full">
                  <p className="text-xl w-4/5 mx-auto md:w-full md:text-4xl font-popL  text-center text-[#EEE9FF]">
                    {each.text}
                  </p>
                  <div className="flex-1 w-full md:w-4/5 mx-auto flex justify-center items-center my-[8vh] lg:my-[4vh]">
                    <img
                      src={each.img}
                      alt="hero section women image"
                      className="w-full object-contain"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            src={tripleArrowIcon}
            alt=""
            className="w-7 aspect-1 cursor-pointer"
            onClick={() =>
              swiperRef.current &&
              swiperRef.current.swiper &&
              swiperRef.current.swiper.slideNext()
            }
          />
        </div>

        <Swiper
          ref={swiperRef}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
            scale: 0.75,
          }}
          modules={[Autoplay, FreeMode, Navigation, EffectCoverflow, Thumbs]}
          className="w-1/2 mx-auto pointer-events-none BonusItems-Swiper"
          thumbs={{ swiper: thumbsSwiper }}
        >
          {bonusItems.map((each, index) => (
            <SwiperSlide
              key={`BonusItem-${index}`}
              className="flex justify-center items-center"
            >
              <div
                key={`BonusItemsIcon-${index}`}
                className="BonusItems-SwiperSlide w-[62%] aspect-1 rounded-full bg-white flex justify-center items-center object-center"
              >
                <img
                  src={bonusItems[index].icon}
                  alt={`BonusItemsIcon-${index}`}
                  className="w-1/2 aspect-1 cursor-pointer object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BonusItemsNew;
