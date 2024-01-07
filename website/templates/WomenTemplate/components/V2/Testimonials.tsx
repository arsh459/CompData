import { Testimonial } from "@models/Testimonial/interface";
import TestimonialRevampCard from "@templates/LandingPage/V2/LandingTestimonials/components/TestimonialRevampCard";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  testimonials: Testimonial[];
  bgColor?: string;
}

const Testimonials: React.FC<Props> = ({ testimonials, bgColor }) => {
  const [showMore, setSetshowMore] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "w-screen flex flex-col items-center relative z-0 pt-24 overflow-hidden",
        !showMore && "h-[200vh]"
      )}
    >
      <h2 className="w-full sm:text-center text-2xl md:text-3xl lg:text-5xl px-5 py-2 font-popM text-transparent bg-clip-text bg-gradient-to-br from-[#B269FF] via-[#E3C6FF] to-[#D45FFF]">
        Reviews by our community
      </h2>

      <div className="w-full max-w-screen-lg mx-auto columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 px-5 pt-12">
        {testimonials?.map((testimonial, index) => {
          return !testimonial.isTransformation ? (
            <div key={testimonial.id} className="break-inside-avoid">
              <TestimonialRevampCard
                testimonial={testimonial}
                bgColor={randomColors[index % 3]}
              />
            </div>
          ) : null;
        })}
      </div>

      {showMore ? null : (
        <div className="absolute left-0 right-0 bottom-0 top-2/3 z-10 bg-gradient-to-t from-[#FD6DEA] flex flex-col justify-end items-center p-8">
          <button
            onClick={() => setSetshowMore(true)}
            className="bg-white text-black text-center font-popM md:w-1/6 max-w-[300px] p-3 px-6 rounded-full"
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;

const randomColors: { [key: number]: string } = {
  0: `bg-[#FD7AFF3D]`,
  1: `bg-[#B094FF38]`,
  2: `bg-[#7AEFFF3D]`,
};
