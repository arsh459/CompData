import React from "react";
// import ShowMore from "@components/ShowMore";
import { Testimonial } from "@models/Testimonial/interface";
import UserImage from "@templates/listing/Header/UserImage";

interface Props {
  testimonial: Testimonial;
}
const TestimonialCardV3: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className="p-2 iphoneX:p-4 border no-scrollbar scrollbar-hide w-44 iphoneX:w-48 m-1 iphoneX:m-2 rounded-xl  bg-gray-900 bg-opacity-30 ">
      <div className="flex items-center">
        {testimonial?.media && (
          <UserImage
            boxHeight="h-4 iphoneX:h-6 "
            boxWidth="w-4 iphoneX:w-6"
            image={testimonial?.media}
            name={testimonial?.name}
            unknown={!testimonial?.media && !testimonial?.name}
          />
        )}
        <p className=" ml-2  w-full flex-1 text-base  font-heavy text-gray-100 line-clamp-1">
          {testimonial.name}
        </p>
      </div>
      {testimonial.quote ? (
        // <ShowMore
        //   text={testimonial.quote}
        //   numChars={88}
        //   classStr={"font-roman h-16 w-40 text-xs text-gray-200 "}
        // />
        <div className="pt-1">
          <p className="text-sm py-1 iphoneX:tex-base capitalize text-white line-clamp-1">
            {testimonial.achievement?.toLocaleLowerCase()}
          </p>
          <p className="text-[.6rem] iphoneX:text-xs flex-1  text-gray-300">
            {testimonial.quote.substring(0, 88)}
            {testimonial.quote.length > 88 ? "..." : ""}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default TestimonialCardV3;
