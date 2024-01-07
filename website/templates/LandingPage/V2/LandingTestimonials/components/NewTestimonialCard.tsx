import { Testimonial } from "@models/Testimonial/interface";
import UserImage from "@templates/listing/Header/UserImage";
import clsx from "clsx";

interface Props {
  testimonial: Testimonial;
  bgColor?: string;
}
const NewTestimonialCard: React.FC<Props> = ({ testimonial, bgColor }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl h-full p-4 backdrop-blur-3xl",
        bgColor ? bgColor : "bg-[#2A2745]"
      )}
    >
      <div className="flex items-center">
        <div className="border rounded-full">
          {testimonial.media ? (
            <UserImage
              image={testimonial.media}
              name={testimonial.name}
              boxHeight="h-8 md:h-12"
              boxWidth="w-8 md:w-12"
              dark={true}
              unknown={true}
            />
          ) : null}
        </div>
        {/* <div className="w-4 md:w-6" /> */}
        <div className="flex-1 pl-4">
          <p className="text-white text-lg md:text-2xl font-bold font-baib line-clamp-1">
            {testimonial.name}
          </p>
          <p className="text-white text-sm md:text-base font-bold font-baiEl line-clamp-1">
            {testimonial.achievement}
          </p>
        </div>
      </div>
      {/* <div className="h-6 md:h-8" /> */}
      <p className="line-clamp-6 pt-4 text-white text-base md:text-lg font-baiEl">
        {testimonial.quote}
      </p>
    </div>
  );
};

export default NewTestimonialCard;
