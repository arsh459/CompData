import { EventInterface } from "@models/Event/Event";
import clsx from "clsx";
import { useState } from "react";
import UserImage from "@templates/listing/Header/UserImage";
import Linkify from "react-linkify";
import EventSubBrief from "./EventBrifLockedSubComponents/EventSubBrief";
import EventMedia from "./EventBrifLockedSubComponents/EventMedia";
import { UserInterface } from "@models/User/User";
import ShowMore from "@components/ShowMore";

interface Props {
  leader: UserInterface;
  game: EventInterface;
  team?: EventInterface;
  setShowImg: (val: boolean) => void;
}

const EventBriefLocked: React.FC<Props> = ({
  leader,
  game,
  team,
  setShowImg,
}) => {
  // const [contentToShow, setContentToShow] = useState<contentType>({});
  const [showDescription, setShowDescription] = useState<boolean>(false);

  return (
    <>
      <EventMedia leader={leader} game={game} setShowImg={setShowImg} />
      <div className="bg-[#1F1F1F]/50 border border-[#373737] mx-4 my-2 iphoneX:my-4 p-2 iphoneX:p-4 rounded-xl">
        <div className="text-[#CECECE]/80 relative z-0">
          <h3
            className={clsx(
              "text-lg iphoneX:text-2xl font-bold",
              showDescription && "pb-2 iphoneX:pb-4"
            )}
          >
            {game.courseGoal}
            <span className="text-[#D74559] whitespace-nowrap">
              {game.courseGoalPrimary}
            </span>
            <span
              className={clsx(
                "rounded-full px-2 iphoneX:px-4 py-0.5 iphoneX:py-1",
                "text-[10px] iphoneX:text-xs whitespace-nowrap opacity-0"
              )}
            >
              Show {showDescription ? "Less" : "More"}
            </span>
          </h3>
          <button
            className={clsx(
              "rounded-full px-2 iphoneX:px-4 py-0.5 iphoneX:py-1",
              "text-[10px] iphoneX:text-xs whitespace-nowrap",
              "absolute right-2",
              showDescription
                ? "bg-white text-[#404040] bottom-3 iphoneX:bottom-5"
                : "bg-[#484848] text-white bottom-1"
            )}
            onClick={() => {
              setShowDescription(!showDescription);
            }}
          >
            Show {showDescription ? "Less" : "More"}
          </button>
        </div>
        {showDescription ? (
          <p className="text-[#EBEBEB] text-xs iphoneX:text-base prose whitespace-pre-wrap">
            <Linkify>{game.description}</Linkify>
          </p>
        ) : null}
      </div>
      <EventSubBrief
        weight={
          game.equipmentNeed
            ? `Need ${game.equipmentNeed}`
            : "No Equipment needed"
        }
        workout={
          game.nbWorkouts
            ? `You get ${game.nbWorkouts} workouts`
            : "You get 45+ workouts"
        }
        teams={
          team && team.students
            ? `${team.students} players in team`
            : game && game.students
            ? `${game.students} teams in game`
            : ""
        }
        worth={game.awardsWorth}
      />
      <div className="bg-[#1F1F1F]/25 border border-[#373737] mx-4 my-2 iphoneX:my-4 p-2 iphoneX:p-4 rounded-xl relative z-0">
        <div className="flex items-center mb-2 iphoneX:mb-4">
          <div className="flex-none">
            <UserImage
              image={leader.profileImage}
              boxWidth="w-14"
              boxHeight="h-14"
            />
          </div>
          <h6 className="pl-2 iphoneX:text-xl font-semibold">
            Created by {leader.name}
          </h6>
        </div>
        <ShowMore
          text={leader.bio}
          classStr="text-[#EBEBEB] text-xs iphoneX:text-base"
          classStrBtn="text-[#D74559]"
        />
      </div>
    </>
  );
};

export default EventBriefLocked;
