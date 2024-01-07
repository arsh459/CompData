import SwiperCore, { Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { useRef } from "react";
import clsx from "clsx";

interface Props {
  imgArr: string[];
  maxWidth?: string;
}

const PanImg: React.FC<Props> = ({ imgArr, maxWidth }) => {
  SwiperCore.use([Autoplay]);
  const ref = useRef<HTMLImageElement>(null);

  return (
    <div ref={ref} className={clsx("w-full", maxWidth ? maxWidth : "max-w-md")}>
      <Swiper
        effect="coverflow"
        modules={[EffectCoverflow]}
        loop={true}
        autoplay={{ delay: 3000 }}
        slidesPerView={2}
        spaceBetween={-((ref.current ? ref.current.clientWidth : 0) / 3)}
        className="panSwiper"
      >
        {imgArr.map((img, index) => (
          <SwiperSlide key={img}>
            <img
              src={img}
              alt={`Trainer image-${index + 1}`}
              className="object-contain w-full"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PanImg;
