import { Course } from "./constants";
import VideoCard from "@components/cards/videoCard";
import clsx from "clsx";

interface Props {
  courses: Course[];
}

const Section1: React.FC<Props> = ({ courses }) => {
  return (
    <div>
      <p className={clsx("font-semibold text-sm text-gray-700 pb-1")}>
        Upcoming events
      </p>
      <div className={clsx("flex", "overflow-x-auto max-w-full", "space-x-4")}>
        {courses.map((item) => {
          return (
            <div key={item.name} className={clsx("")}>
              <VideoCard
                name={item.name}
                url={item.url}
                live={false}
                imgMode={true}
                // paused={true}
                numCardsInWidth={2}
                cost={item.cost}
                currency={item.currency}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section1;
