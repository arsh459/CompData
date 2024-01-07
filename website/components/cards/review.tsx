import clsx from "clsx";
import React from "react";
import Rating from "@components/rating/rating";
import { getCloudinaryURLWithParams } from "@utils/cloudinary";

interface Props {
  name: string;
  url: string;
  text: string;
  rating: number;
  heading: string;
}

const ReviewCard: React.FC<Props> = ({ url, name, text, rating, heading }) => {
  return (
    <div className={clsx("w-full shadow-2xl flex p-2 rounded-lg")}>
      <div className="flex-none">
        <img
          alt={`img-${name}`}
          src={getCloudinaryURLWithParams(url, 50, 50, "c_fill")}
          className={clsx("rounded-full shadow-2xl w-12 h-12")}
          loading="lazy"
        />
      </div>
      <div className={"pl-4"}>
        <p className={clsx("text-gray-700 text-sm")}>{heading}</p>
        <div className="pt-1 flex items-center">
          <p className={clsx("pr-1 text-gray-600 text-xs")}>{rating}</p>
          <Rating rating={rating} />
        </div>

        <p className={clsx("text-gray-600 italic text-xs")}>
          &ldquo;{text}&ldquo;
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
