import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import UserImage from "@templates/listing/Header/UserImage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialsComp = () => {
  const { testimonials } = useTestimonials(14);

  return testimonials ? (
    <div className="p-4">
      <h1 className="text-white font-nunitoSB text-xl my-6">Reviews</h1>
      <Swiper spaceBetween={20} slidesPerView="auto">
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="TestimonialsCompSlide">
            <div className="w-full h-full flex-1 bg-[#343150] rounded-xl p-4">
              <div className="w-full flex flex-row justify-between items-center">
                <UserImage
                  image={testimonial.image}
                  name={testimonial.name}
                  boxWidth="w-6"
                  boxHeight="aspect-1"
                />
                <p
                  className="text-white text-sm iphoneX:text-base flex-1 ml-3"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {testimonial.name}
                </p>
                <div
                  className="w-16 iphoneX:w-20"
                  style={{ aspectRatio: 72 / 12 }}
                >
                  <div
                    style={{ width: `${(5 / 5) * 100}%` }} // Here first 5 will be rating from 0 to 5
                    className="h-full overflow-hidden"
                  >
                    <img
                      src="https://ik.imagekit.io/socialboat/Component_49_8kdkqM6tF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666176307073"
                      className="w-16 iphoneX:w-20 h-full object-contain"
                      alt="stars"
                    />
                  </div>
                </div>
              </div>
              <div className="h-2" />
              <p
                className="text-white/70 text-xs iphoneX:text-sm line-clamp-4"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                {testimonial.quote}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
};

export default TestimonialsComp;
