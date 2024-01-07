// import { useTestimonials } from "@hooks/testimonials/useTestimonial";

import { Testimonial } from "@models/Testimonial/interface";
// import AutoScroll from "../components/AutoScroll";
import NewTestimonialCard from "./components/NewTestimonialCard";

interface Props {
  testimonials: Testimonial[];
  bgColor?: string;
}

const TestimonialsLanding: React.FC<Props> = ({ testimonials, bgColor }) => {
  // const { testimonials } = useTestimonials(10);

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <p className="max-w-screen-xl mx-auto text-3xl sm:text-5xl lg:text-7xl font-baib  text-center text-white leading-10 lg:leading-[90px] px-16">
        <span>
          Our Community
          <br /> Lo
        </span>
        <span className="relative">
          <span>v</span>
          <span
            className="absolute left-0 right-0 md:leading-7  text-sm lg:text-lg top-0 lg:top-4 "
            style={{
              // verticalAlign: "8px",
              color: "#F03D5F",
            }}
          >
            &#10084;
          </span>
        </span>
        <span>es Us</span>
      </p>
      <div className="h-16 sm:h-20 lg:h-24" />
      {/* <AutoScroll pauseAnimationOnHover={true}>
      </AutoScroll> */}
      <div
        // className="overflow-x-scroll scrollbar-hide grid gird-flow-col grid-rows-2 auto-cols-[70]%"
        className="overflow-x-scroll scrollbar-hide grid grid-flow-col grid-rows-2 auto-cols-[75%] sm:auto-cols-[55%] md:auto-cols-[40%] lg:auto-cols-[35%] xl:auto-cols-[30%] auto-row-max gap-4 md:gap-8 px-4 md:px-8"
      >
        {testimonials?.map((testimonial) => {
          return !testimonial.isTransformation ? (
            <div key={testimonial.id}>
              <NewTestimonialCard testimonial={testimonial} bgColor={bgColor} />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default TestimonialsLanding;
