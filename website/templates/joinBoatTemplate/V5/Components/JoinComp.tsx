import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Testimonial } from "@models/Testimonial/interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";

interface Props {
  onGetStarted: () => void;
  ctaText?: string;
}

const JoinComp: React.FC<Props> = ({ onGetStarted, ctaText }) => {
  const { testimonials } = useTestimonials(8);
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A]">
      <div className="w-full h-full max-w-md mx-auto z-0 flex flex-col">
        <div className="flex-1 relative z-0">
          <div className="absolute left-0 right-0 top-0 z-10 flex justify-between items-center p-4">
            <img
              src={`https://ik.imagekit.io/socialboat/Vector_qeTUiyHTG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658904429443`}
              className="w-6 iphoneX:w-8 h-6 iphoneX:h-8 object-contain cursor-pointer"
              onClick={router.back}
              alt="backIcon"
            />
          </div>
          <video
            preload="auto"
            autoPlay
            playsInline
            loop
            muted={true}
            controls={false}
            src={"https://d2cjy81ufi4f1m.cloudfront.net/videoo.MP4"}
            className="w-full h-full object-cover"
            poster="https://ik.imagekit.io/socialboat/pexels-zakaria-boumliha-2827400_1_6w7U2-XSo.png?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1655234361614"
          />
          <div className="absolute left-0 right-0 bottom-0 z-10 bg-gradient-to-b from-transparent to-[#100F1A]">
            <Swiper
              slidesPerView={1.1}
              spaceBetween={16}
              style={{ paddingInline: 16 }}
            >
              {testimonials?.map((item) =>
                item.name && item.quote ? (
                  <SwiperSlide key={item.id}>
                    <TestimonialComp key={item.id} testimonial={item} />
                  </SwiperSlide>
                ) : null
              )}
            </Swiper>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <p className="text-[#F1F1F1] text-xl iphoneX:text-2xl font-baib py-8">
            Make a change in your life and join our fitness revolution!
          </p>
          <button
            className="bg-white w-full cursor-pointer flex justify-center items-center rounded-full py-3 m-4"
            onClick={onGetStarted}
          >
            <p className="text-[#100F1A] text-base iphoneX:text-xl font-baib">
              {ctaText ? ctaText : "Get Started"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinComp;

interface TestimonialProps {
  testimonial: Testimonial;
}

const TestimonialComp: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <div className="h-full bg-[#100F1A]/40 border border-white/20 rounded-xl p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <p
          className="text-[#F1F1F1] text-sm iphoneX:text-base flex-1"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {testimonial.name}
        </p>
        <div className="w-16 iphoneX:w-20 aspect-[72/12]">
          <div
            style={{ width: `${(5 / 5) * 100}%` }} // Here first 5 will be rating from 0 to 5
            className="h-full overflow-hidden"
          >
            <img
              src="https://ik.imagekit.io/socialboat/Component_49_8kdkqM6tF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666176307073"
              className="w-16 iphoneX:w-20 h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="h-2" />
      <p className="text-[#C5C5C5] font-baim text-xs iphoneX:text-sm line-clamp-3">
        {testimonial.quote}
      </p>
    </div>
  );
};
