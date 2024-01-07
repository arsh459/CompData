import { homeDomain } from "@constants/seo";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { formatWithCommas } from "@utils/number";
import clsx from "clsx";
import { useEffect } from "react";
import CreatorSnippet from "./CreatorSnippet";

interface Props {
  boatEvent: EventInterface;
  selected?: boolean;
  // onSelectFire?: (key: string) => void;
}
const ChallengeCard: React.FC<Props> = ({
  boatEvent,
  selected,
  // onSelectFire,
}) => {
  const { leader } = useLeaderboard(boatEvent.ownerUID);

  useEffect(() => {
    if (selected && leader?.userKey) {
      // onSelectFire(leader?.userKey);
    }
  }, [selected, leader?.userKey]);

  return (
    <Link
      href={`https://${leader?.userKey}.${homeDomain}/?eventId=${boatEvent.id}`}
      // href={`/${leader?.userKey}/?eventId=${boatEvent.id}`}
      target="_blank"
    >
      <div className="rounded-xl relative  cursor-pointer">
        <div>
          {boatEvent.media.length > 0 ? (
            <div
              className={clsx(
                "aspect-w-3 aspect-h-4 md:aspect-h-3 rounded-xl",
                selected ? "border-blue-500 border-4" : "border"
              )}
            >
              <MediaTile
                media={boatEvent.media[0]}
                width={400}
                roundedString="rounded-lg"
                height={400}
                alt="media"
              />
            </div>
          ) : (
            <div className="bg-gray-200 aspect-w-3 aspect-h-4 border rounded-xl"></div>
          )}
        </div>
        <div className="pt-2">
          <CreatorSnippet
            selected={selected}
            leader={leader}
            numStudents={boatEvent?.students}
          />

          <p className="pt-2 text-sm text-gray-700 font-medium line-clamp-3">
            {boatEvent.name}
          </p>
          {boatEvent.cost ? (
            <div className="absolute top-0 right-0 bg-white p-1 rounded-bl-lg">
              <p className="pt-0 text-sm text-orange-500 font-medium">
                {boatEvent.currency}
                {formatWithCommas(boatEvent.cost)}
              </p>
            </div>
          ) : null}
          {/* <p className="pt-0 text-xs text-gray-500 line-clamp-2">
            {boatEvent.description}
          </p> */}
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
