import clsx from "clsx";

interface Props {
  rating: number;
}

const Rating: React.FC<Props> = ({ rating }) => {
  return (
    <div className={clsx("flex gap-x-1")}>
      {Array(Math.floor(rating))
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index}>
              <img
                alt="star-icon"
                src="./images/star.svg"
                className={clsx("w-3 h-3")}
              />
            </div>
          );
        })}
      {Array(5 - Math.floor(rating))
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index}>
              <img
                alt="star-empty"
                src="./images/star-outline.svg"
                className={clsx("w-3 h-3")}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Rating;
