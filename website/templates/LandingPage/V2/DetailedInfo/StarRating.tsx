import clsx from "clsx";
import React from "react";

function StarIcon(props: { key: number; className: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
interface Props {
  rating: number;
}
const StarRating: React.FC<Props> = ({ rating }) => {
  return (
    <div className="flex py-2.5">
      {[...Array.from(Array(5).keys())].map((index) => (
        <StarIcon
          key={index}
          className={clsx(
            "w-4 sm:w-5 lg:w-6 aspect-1",
            rating > index ? "fill-white" : "fill-[#1B192B]"
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;