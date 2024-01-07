import MediaCard from "@components/MediaCard";
import { Task } from "@models/Tasks/Task";
import React, { useState } from "react";
interface Props {
  task: Task;
}
const RecipeMedia: React.FC<Props> = ({ task }) => {
  const [_, setIsPaused] = useState<boolean>(false);

  return (
    <div className="sm:w-1/2 aspect-[545/871] rounded-2xl  m-4 z-10">
      {task.reelMedia ? (
        <MediaCard
          media={task.reelMedia}
          setIsPaused={(val) => setIsPaused(val)}
          roundedString="rounded-2xl"
          HWClassStr="w-full  h-full rounded-2xl"
        />
      ) : null}
    </div>
  );
};

export default RecipeMedia;
