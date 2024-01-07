import { Story } from "@models/Stories/interface";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";

interface Props {
  story: Story;
  bgColor?: string;
}
const NewStoryCard: React.FC<Props> = ({ story, bgColor }) => {
  return (
    <div
      className={clsx(
        "rounded-2xl h-full w-full   p-4",
        bgColor ? bgColor : "bg-[#2A2745]"
      )}
    >
      <div className="flex items-center ">
        <div className=" rounded-full ">
          {story.media ? (
            <MediaTile
              height={242}
              width={173}
              media={story.media}
              alt={`${story.title}-Story`}
            />
          ) : null}
        </div>

        <div className="flex-1  pl-4">
          <p className="text-white text-xl pb-3 md:text-2xl font-bold font-baiEl line-clamp-1">
            {story.title}
          </p>
          <p className="text-[#FFFFFFBF] text-sm md:text-base  font-popR">
            {story.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewStoryCard;
