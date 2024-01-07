import ShowMore from "@components/ShowMore";
import { Testimonial } from "@models/Testimonial/interface";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { getHeight } from "../Program/getAspectRatio";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCardV2: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className="relative z-0 w-full h-full">
      <div className="absolute top-0 left-0 right-0 z-10 h-16 iphoneX:h-20 bg-gradient-to-b from-black to-transparent"></div>
      {testimonial.media ? (
        <div className="object-cover h-full ">
          <MediaTile
            media={testimonial.media}
            width={400}
            paused={true}
            alt="boat-img"
            height={getHeight(testimonial.media, 900)}
          />
        </div>
      ) : testimonial.name ? (
        <img
          src={`https://avatars.dicebear.com/api/initials/${testimonial.name}.svg`}
          alt="user"
          className={clsx("h-full object-cover  ")}
        />
      ) : (
        <div className="bg-gray-100 rounded-md shadow-sm w-36 h-36" />
      )}

      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hiddentext-ellipsis bg-[#000]/40 backdrop-blur-[29px] ">
        <div className="flex items-center px-6 py-1.5 border-y border-[#CBCBCB]">
          <div className="rounded-full shadow-sm ">
            {testimonial?.media && (
              <MediaTile
                media={testimonial.media}
                width={48}
                paused={true}
                alt="boat-img"
                height={48}
                roundedString={"rounded-full"}
              />
            )}
          </div>
          <p className="p-4 text-xl font-extrabold text-white">
            {testimonial.name}
          </p>
        </div>
        <div className="h-px " />
        <p className=" text-xl px-6 py-2.5 font-bold  text-white">
          {testimonial.achievement}
        </p>
        <div className="h-px " />
        {testimonial.quote ? (
          <ShowMore
            text={testimonial.quote}
            numChars={250}
            classStr={"px-6  leading-5 italic font-light text-sm text-white "}
          />
        ) : null}
        <div className="h-12 iphoneX:h-16 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
};

export default TestimonialCardV2;
