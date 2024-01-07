import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
// import { EventInterface } from "@models/Event/Event";

import { useTestimonials } from "@hooks/testimonials/useTestimonial";

import TestimonialCardV2 from "./TestimonialCardV2";
// import clsx from "clsx";

interface Props {
  // parentEvent: EventInterface;
  // paddingTop?: boolean;
}

const TestimonialContainer: React.FC<Props> = ({}) => {
  const { testimonials, onNext } = useTestimonials(4);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="inset-0 w-full h-full -z-10"
      onReachEnd={onNext}
    >
      {testimonials?.map((item, index) => (
        <SwiperSlide
          key={`${item.name}-${index}`}
          className="flex flex-col items-center justify-center"
        >
          <TestimonialCardV2 testimonial={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialContainer;
