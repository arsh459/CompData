import { introDiet, introHome, introPeriod } from "@constants/icons/iconURLs";

import { Autoplay, EffectFade, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const introImages = [introPeriod, introDiet, introHome];

const IntroRight = () => {
  return (
    <div className="w-full h-full flex justify-center md:justify-center items-center">
      <Swiper
        loop={true}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, EffectFade, Pagination]}
        className="pointer-events-none h-full md:h-[70%] aspect-[254/517]"
      >
        {introImages.map((each, index) => (
          <SwiperSlide key={`IntroImg-${index}`} className="pb-8">
            <img
              src={each}
              alt="hero section women image"
              className="h-full object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IntroRight;
