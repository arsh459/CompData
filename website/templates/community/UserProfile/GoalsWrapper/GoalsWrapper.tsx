import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import {
  fitnessGoalKeys,
  FitnessGoalSelect,
  UserInterface,
} from "@models/User/User";
import ImgButton from "@templates/joinBoatTemplate/ImgButton";
import LockedSection from "./LockedSection";

interface Props {
  user: LeaderBoard | UserInterface;
  viewerId?: string;
}

const GoalsWrapper: React.FC<Props> = ({ user, viewerId }) => {
  return user.fitnessGoals ||
    user.fitnessGoalText ||
    user.weight ||
    user.height ||
    user.age ? (
    <div className="px-4">
      {user.fitnessGoalText ? (
        <div>
          <p className="text-gray-700 font-semibold text-center text-2xl">
            Fitness Goal
          </p>
          <p className="text-gray-700 italic text-xl text-center pt-1">
            {`"${user.fitnessGoalText.trim()}"`}
          </p>
        </div>
      ) : null}
      <div className="flex flex-wrap pt-2">
        {user.fitnessGoals &&
          FitnessGoalSelect.map((item) => {
            if (
              user.fitnessGoals &&
              user.fitnessGoals[item.key as fitnessGoalKeys]
            ) {
              return (
                <div key={item.key} className="pr-2">
                  <ImgButton
                    heading={item.heading}
                    selected={true}
                    text={item.text}
                    paddingString="p-2 px-4"
                    roundedString="rounded-full"
                  />
                </div>
              );
            }
          })}
      </div>
      {viewerId &&
      (viewerId === user.uid ||
        user.enrolledCommunities?.includes(viewerId)) ? (
        <div className="pt-8">
          <LockedSection
            weight={user.weight}
            height={user.height}
            age={user.age}
          />
        </div>
      ) : null}
    </div>
  ) : (
    <div>
      <div className="flex flex-col justify-center items-center pt-8">
        <img
          src="https://img.icons8.com/color/96/000000/lazy.png"
          className="w-36 h-46 object-cover"
        />
        <p className="text-center text-xl text-gray-700">Goals are not set</p>
        <p className="text-center text-base text-gray-500">
          Set goals and create accountability
        </p>
      </div>
    </div>
  );
};

export default GoalsWrapper;
