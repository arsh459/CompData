import { Activity } from "@models/Activities/Activity";
import { Task } from "@models/Tasks/Task";
import { UserInterface } from "@models/User/User";
import UserImage from "@templates/listing/Header/UserImage";
import React from "react";
import Attempts from "./Attempts";

const FitpointsEarnedActivity: React.FC<{
  task: Task;
  taskDoneLists: {
    user: UserInterface;
    act: Activity;
  }[];
  userRelevantActs: Activity[];
}> = ({ task, taskDoneLists, userRelevantActs }) => (
  <div className="w-2/3">
    {userRelevantActs?.length ? (
      <div className="w-full pb-9">
        <p className="text-white text-xl font-popM pb-4">Fitpoints Earned</p>
        <div className="w-full grid grid-cols-2 justify-center gap-2 items-center">
          {userRelevantActs
            .sort((a, b) => b.updatedOn - a.updatedOn)
            .map((each, index) => (
              <div key={each.id} className=" ">
                <Attempts
                  activity={each}
                  taskFP={task?.fitPoints || 0}
                  index={index}
                  total={userRelevantActs.length}
                />
              </div>
            ))}
        </div>
      </div>
    ) : null}
    <p className="font-popM text-lg text-white">
      {taskDoneLists?.length > 0 && taskDoneLists?.length} People who also
      completed this practice
    </p>

    <div className="w-full py-4 iphoneX:py-6 ">
      <div
        className="grid place-self-center cursor-pointer "
        style={{
          gridTemplateColumns: `repeat(${
            taskDoneLists.length - 1
          }, 1.75rem) max-content`,
        }}
      >
        {taskDoneLists.map(({ user, act }) => (
          <div
            key={user.uid}
            className=" w-16  h-16 rounded-full overflow-hidden"
          >
            <UserImage
              image={user.profileImage}
              name={user.name}
              boxWidth="w-full"
              boxHeight="h-full"
              unknown={!user.profileImage && !user.name}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FitpointsEarnedActivity;
