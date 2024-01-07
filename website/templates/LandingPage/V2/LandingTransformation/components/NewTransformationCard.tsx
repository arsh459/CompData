import { Testimonial } from "@models/Testimonial/interface";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import React from "react";
import { setChar } from "../../utils/utils";
interface Props {
  testimonial: Testimonial;
}

const NewTransformationCard: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className="rounded-2xl flex max-w-[314px] md:max-w-[635px] h-full justify-center flex-col items-center bg-[#1F1D34]">
      <div className="w-full aspect-[233/267] rounded-2xl flex-1">
        {testimonial.media ? (
          <MediaTile
            media={testimonial.media}
            height={566}
            width={534}
            alt="transformations"
            rounded={true}
            objectString="contain"
          />
        ) : null}
      </div>
      <div className="flex-1 p-3">
        <p className="text-[#A9AEF1] text-base md:text-3xl w-full font-baib line-clamp-1 ">
          {testimonial.name}
        </p>
        <div className="h-4" />
        <p className="text-xs md:text-base font-bail tracking-wide text-[#9494C5]">
          {/* {staff.description} */}
          {testimonial.quote ? `${setChar(testimonial.quote, 120)}....` : null}
        </p>
      </div>
    </div>
  );
};

export default NewTransformationCard;
