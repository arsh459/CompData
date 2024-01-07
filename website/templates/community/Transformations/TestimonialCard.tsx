import MoreText from "@components/MoreText/MoreText";
import { Testimonial } from "@models/Testimonial/interface";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { getHeight } from "../Program/getAspectRatio";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<Props> = ({ testimonial }) => {
  return (
    <div>
      {testimonial.media ? (
        <div>
          <MediaTile
            media={testimonial.media}
            width={900}
            paused={true}
            rounded={true}
            alt="boat-img"
            height={getHeight(testimonial.media, 900)}
          />
        </div>
      ) : testimonial.name ? (
        <img
          src={`https://avatars.dicebear.com/api/initials/${testimonial.name}.svg`}
          alt="user"
          className={clsx("w-36 h-36 object-cover rounded-md")}
        />
      ) : (
        <div className="w-36 h-36 bg-gray-100 rounded-md shadow-sm" />
      )}
      <div className="pt-1">
        <p className="text-gray-700 font-semibold">{testimonial.name}</p>
        {testimonial.achievement ? (
          <p className="text-gray-700 text-sm font-medium">
            {testimonial.achievement}
          </p>
        ) : null}
        {testimonial.quote ? (
          <MoreText text={`"${testimonial.quote}"`} numChars={120} />
        ) : // <p className="text-gray-500 text-sm italic line-clamp-3">{`"${testimonial.quote}"`}</p>
        null}
      </div>
    </div>
  );
};

export default TestimonialCard;
