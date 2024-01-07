import MediaCard from "@components/MediaCard";
import {
  getCurrentMonthForPurchase,
  // getCurrentMonthV2,
  // getCurrentWeekV3,
} from "@hooks/community/challengeWeekUtils/utils";
import { EventInterface } from "@models/Event/Event";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import { format } from "date-fns";
import { useCallback, useRef, useState } from "react";

const dayLength = 24 * 60 * 60 * 1000;

interface Props {
  leader: UserInterface;
  game: EventInterface;
  setShowImg: (val: boolean) => void;
}

const EventMedia: React.FC<Props> = ({ leader, game, setShowImg }) => {
  // const { roundStartUnix, roundEndUnix } = getCurrentWeekV3(
  //   game.configuration?.rounds,
  //   game.configuration?.starts,
  //   game.configuration?.challengeLength
  // );

  const { start, end } = getCurrentMonthForPurchase(
    game.configuration?.sprints,
    game.configuration?.starts,
    game.configuration?.challengeLength,
    game.configuration?.activeSprintId
  );

  // console.log("s", start, end);

  const gameStarts = start ? start : game.configuration?.starts;
  const gameEnds = end
    ? end
    : game.configuration?.starts
    ? game.configuration?.starts +
      (game.configuration?.challengeLength
        ? game.configuration?.challengeLength
        : 0) *
        dayLength
    : -1;

  const [isPaused, setIsPaused] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((element) => {
          if (element.isIntersecting) {
            setShowImg(false);
          } else {
            setShowImg(true);
          }
        });
      }, {});

      if (node) observer?.current.observe(node);
    },
    [setShowImg]
  );

  return (
    <div
      ref={targetRef}
      className={clsx(
        "max-h-60 iphoneX:max-h-max flex flex-col justify-center items-center overflow-hidden relative z-0"
      )}
    >
      {game.media.length > 0 ? (
        <MediaCard
          media={game.media[0]}
          thumbnail={game.thumbnail}
          setIsPaused={setIsPaused}
          HWClassStr="h-full w-fit mx-auto"
        />
      ) : leader.profileImage ? (
        <MediaCard
          media={leader.profileImage}
          HWClassStr="h-full w-fit mx-auto"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-b from-black to-gray-800" />
      )}
      {isPaused ? (
        <div className="absolute top-0 left-0 right-0 z-10 h-16 iphoneX:h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      ) : null}
      {isPaused ? (
        <div className="absolute bottom-0 left-0 right-0 z-10 h-16 iphoneX:h-20 flex items-end bg-gradient-to-t from-black to-transparent pointer-events-none px-4 iphoneX:px-6">
          <div className="flex-1 flex items-center pb-2">
            <img
              src={`https://ik.imagekit.io/socialboat/Group_U6WQeUX61.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655486635480`}
              className="w-4 iphoneX:w-6 mr-2"
              alt="team icon"
            />
            {gameStarts ? (
              <p className="text-center text-sm iphoneX:text-base italic">
                Game starts -{" "}
                <span className="font-bold whitespace-nowrap">
                  {format(new Date(gameStarts), "d MMMM h:mmaaa")}
                </span>{" "}
                -{" "}
                <span className="font-bold whitespace-nowrap">
                  {format(new Date(gameEnds), "d MMMM")}
                </span>
              </p>
            ) : (
              <p className="text-center text-xs iphoneX:text-base">
                Starts soon
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventMedia;
