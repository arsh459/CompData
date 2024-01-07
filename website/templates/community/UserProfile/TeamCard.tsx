import { EventInterface } from "@models/Event/Event";
import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import TeamCardMedia from "./TeamCardMedia";
import { nFormatter } from "@utils/number";
import clsx from "clsx";
import Link from "next/link";
import { getPrefixAndSuffix } from "@templates/teamsHome/GameCard/utils";

interface Props {
  team: EventInterface;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  const { selectedEvent } = useCommunityEvent(team.parentId);

  const { prefix, suffix } = getPrefixAndSuffix(
    selectedEvent?.configuration?.starts,
    selectedEvent?.configuration?.challengeLength
    // selectedEvent?.sprintLength,
    // selectedEvent?.roundLength
  );

  return (
    <>
      {selectedEvent ? (
        <div
          className={clsx(
            "text-[#C2C2C2] p-4 my-8",
            "bg-gradient-to-r from-white to-stone-100",
            "border border-stone-200 rounded-2xl"
          )}
        >
          <h3 className="text-2xl font-bold italic line-clamp-1">
            {team.name}
          </h3>
          <hr className="my-4 -mx-4" />
          <div className="flex justify-center items-center text-center">
            <div className="flex-1 flex flex-col justify-center items-center">
              {selectedEvent.enrolledUserUIDs ? (
                <TeamCardMedia
                  eventId={team.id}
                  enrolledUIDs={selectedEvent.enrolledUserUIDs}
                />
              ) : null}
              <div className="pt-2">
                {`${team.students ? team.students : 0} Players`}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-[#ED7760] max-w-[100px]">{prefix}</p>
              <p className="text-xl">{suffix}</p>
            </div>
          </div>
          <hr className="my-4 -mx-4" />
          <div className="flex justify-between items-center text-lg font-bold">
            <div
              className={clsx(
                "flex items-center bg-clip-text text-transparent",
                "bg-gradient-to-b from-[#F19B38] to-[#F15454]"
              )}
            >
              <img
                className="pr-1"
                src="https://img.icons8.com/ios-glyphs/20/F19B38/fire-element--v1.png"
              />
              {selectedEvent.calThForStreak} cals
            </div>
            <div
              className={clsx(
                "flex items-center bg-clip-text text-transparent",
                "bg-gradient-to-b from-[#9BCF2D] to-[#48B536]"
              )}
            >
              <img
                className="pr-1"
                src="https://img.icons8.com/ios-filled/20/9BCF2D/running.png"
              />
              {selectedEvent.sprintLength} days
            </div>
            <div
              className={clsx(
                "flex items-center bg-clip-text text-transparent",
                "bg-gradient-to-b from-[#09B3D9] to-[#039CDD]"
              )}
            >
              <img
                className="pr-1"
                src="https://img.icons8.com/ios-glyphs/20/09B3D9/trophy.png"
              />
              {nFormatter(
                selectedEvent?.awardsWorth ? selectedEvent.awardsWorth : 0
              )}
            </div>
          </div>
          <hr className="my-4 -mx-4" />
          <div className="flex justify-between items-center">
            <h5 className="text-xl font-bold italic line-clamp-1 mr-4">
              {selectedEvent.name}
            </h5>
            <Link href={`/teams/${team.eventKey}`} passHref>
              <button
                className={clsx(
                  "text-white px-12 py-1 rounded-full",
                  "bg-gradient-to-r from-[#EB7963] to-[#F6A064]"
                )}
              >
                Join
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TeamCard;
