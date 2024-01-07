import { Testimonial } from "@models/Testimonial/interface";
import UserImage from "@templates/listing/Header/UserImage";
import clsx from "clsx";

interface Props {
  testimonial: Testimonial;
  bgColor?: string;
}
const TestimonialRevampCard: React.FC<Props> = ({ testimonial, bgColor }) => {
  return (
    <div
      className={clsx(
        "rounded-3xl h-full p-4 backdrop-blur-3xl",
        bgColor ? bgColor : "bg-[#2A2745]",
        ""
      )}
    >
      <div
        className={clsx(
          "p-4 rounded-3xl",
          bgColor ? bgColor : "bg-[#FD7AFF3D]"
        )}
      >
        <div className="flex  items-center">
          {testimonial.media ? (
            <UserImage
              image={testimonial.media}
              name={testimonial.name}
              boxHeight="h-6"
              boxWidth="w-6"
              dark={true}
              unknown={true}
            />
          ) : null}
          <p className="text-white text-lg font-nunitoB pl-2 line-clamp-1">
            {testimonial.name}
          </p>
        </div>
        <p className="text-white text-sm font-popM pt-2.5 line-clamp-1">
          {testimonial.achievement}
        </p>
      </div>
      {/* <div className="w-4 md:w-6" /> */}
      {/* <div className="flex-1 pl-4">
          <p className="text-white text-sm md:text-base font-bold font-baiEl line-clamp-1">
            {testimonial.achievement}
          </p>
        </div> */}
      {/* <div className="h-6 md:h-8" /> */}
      <p className="whitespace-pre-wrap prose pt-4 px-4 text-white text-sm font-nunitoL">
        {testimonial.quote}
      </p>
    </div>
  );
};

export default TestimonialRevampCard;
