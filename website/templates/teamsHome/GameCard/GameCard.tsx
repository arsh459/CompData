import MediaCard from "@components/MediaCard";
import { useParentEvent } from "@hooks/community/v2/useParentEvent";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
// import { Divider } from "@mui/material";
// import { getHeight } from "@templates/community/Program/getAspectRatio";
// import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import ChallengeEnds from "./ChallengeEnds";
import GamesKPIs from "./GamesKPIs";
import OtherCoaches from "./OtherCoaches";
import RecentActivity from "./RecentActivity";

interface Props {
  event: EventInterface;
  showMembers: boolean;
}

const GamesCard: React.FC<Props> = ({ event, showMembers }) => {
  const { parentEvent } = useParentEvent(event.parentId);
  return (
    <Link href={`/teams/${event?.eventKey}`}>
      <>
        {event.media.length ? (
          <div>
            <MediaCard media={event.media[0]} thumbnail={event.thumbnail} />
          </div>
        ) : null}
        <div className="p-4 border rounded-sm shadow-sm bg-gray-50">
          <p className="text-2xl text-gray-700 font-semibold">{event.name}</p>
          <div className="pt-0">
            <GamesKPIs
              cals={
                parentEvent?.calThForStreak
                  ? parentEvent?.calThForStreak
                  : event.calThForStreak
              }
              challengeLength={
                parentEvent?.sprintLength
                  ? parentEvent?.sprintLength
                  : event.sprintLength
              }
              rewardsWorth={
                parentEvent?.awardsWorth
                  ? parentEvent.awardsWorth
                  : event.awardsWorth
              }
            />
          </div>
          {event.recentActivity ? (
            <div className="pt-2">
              <RecentActivity
                img={event.recentActivity.img}
                text={event.recentActivity.text}
                name={event.recentActivity.createdBy}
                createdOn={event.recentActivity.createdOn}
              />
            </div>
          ) : (
            <div className="pt-2">
              <OtherCoaches
                id={event.id}
                numCoaches={event.students}
                showMembers={showMembers}
              />
              <div className="pt-2">
                <p className="text-gray-500 line-clamp-2 whitespace-pre-wrap font-sans">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {parentEvent?.eventStarts ? (
            <div className="pt-2">
              <ChallengeEnds
                after={parentEvent?.eventStarts}
                challengeLength={parentEvent?.challengeLength}
                sprintLength={parentEvent?.sprintLength}
                roundLength={parentEvent?.roundLength}
              />
            </div>
          ) : event.eventStarts ? (
            <div className="pt-2">
              <ChallengeEnds
                after={event?.eventStarts}
                challengeLength={event?.challengeLength}
                sprintLength={event?.sprintLength}
                roundLength={event?.roundLength}
              />
            </div>
          ) : null}
        </div>
      </>
    </Link>
  );
};

export default GamesCard;
