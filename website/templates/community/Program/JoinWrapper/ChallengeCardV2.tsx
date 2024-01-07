// import { homeDomain } from "@constants/seo";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";
import { useEffect } from "react";
// import CreatorSnippet from "./CreatorSnippet";
import CreatorSnippetV2 from "./CreatorSnippetV2";

interface Props {
  boatEvent: EventInterface;
  selected?: boolean;
  onSelectFire?: (key: string) => void;
}
const ChallengeCardV2: React.FC<Props> = ({
  boatEvent,
  selected,
  onSelectFire,
}) => {
  const { leader } = useLeaderboard(boatEvent.ownerUID);

  // console.log("boatEvent", boatEvent.ownerDetails);

  useEffect(() => {
    if (selected && leader?.userKey && onSelectFire) {
      onSelectFire(leader?.userKey);
    }
  }, [selected, leader?.userKey, onSelectFire]);

  return (
    <>
      <Link href={`/${leader?.userKey}/${boatEvent.eventKey}`}>
        <div className="rounded-xl  cursor-pointer">
          <div>
            {leader?.profileImage ? (
              <div
                className={clsx(
                  "aspect-w-1 aspect-h-1 rounded-full",
                  selected ? "border-blue-500 border-4" : ""
                )}
              >
                <MediaTile
                  media={leader?.profileImage}
                  width={400}
                  roundedString="rounded-full"
                  height={400}
                  alt="media"
                />
              </div>
            ) : (
              <div className="bg-gray-200 aspect-w-1 aspect-h-1 border rounded-full">
                <img
                  src={`https://avatars.dicebear.com/api/initials/${
                    boatEvent.name
                      ? boatEvent.name
                      : leader?.name
                      ? leader.name
                      : "user"
                  }.svg`}
                  alt="user"
                  className={clsx(
                    "w-full, h-full",
                    " object-cover rounded-full"
                  )}
                />
              </div>
            )}
          </div>
          <div className="pt-2">
            <CreatorSnippetV2
              selected={selected}
              teamName={boatEvent.name}
              // leader={leader}
              numStudents={
                boatEvent.enrolledUserUIDs
                  ? boatEvent.enrolledUserUIDs.length
                  : 0
              }
            />

            {/* <p className="pt-0 text-xs font-semibold line-clamp-3 text-gray-500 text-center">
            {boatEvent.name}
          </p> */}
          </div>
        </div>
      </Link>

      {leader?.instagramLink ? (
        <Link href={leader?.instagramLink} target="_blank">
          <p className="text-sm text-gray-500 text-center underline">
            instagram
          </p>
        </Link>
      ) : null}
    </>
  );
};

export default ChallengeCardV2;
