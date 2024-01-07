// import { useCurrentEvent } from "@hooks/editEvent/useCurrentEvent";
import { Link } from "@mui/material";
// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { Divider } from "@mui/material";
import { format } from "date-fns";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import { EventInterface } from "@models/Event/Event";
import { profileClick } from "@analytics/click/wrappers";
import TeamLabel from "./TeamLabel";

interface Props {
  id: string;
  sbEvent: EventInterface;
}

const TeamCard: React.FC<Props> = ({ id, sbEvent }) => {
  const { leader } = useLeaderboard(sbEvent?.ownerUID);

  //   console.log("sel", selectedEvent);
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 shadow-md">
      <Link href={`/${leader?.userKey}/${sbEvent?.eventKey}`}>
        <div className="flex px-4 ">
          <div className="flex-none">
            <UserPhoto
              onImgClick={() => {
                profileClick();
              }}
              nameInvisible={true}
              img={leader?.profileImage}
              size="medium"
            />
          </div>
          <div className="pl-4">
            <p className="text-gray-700 font-semibold text-lg line-clamp-1 break-all">
              {sbEvent?.name}
            </p>

            <div>
              {sbEvent.parentId ? (
                <TeamLabel gameId={sbEvent.parentId} />
              ) : null}
            </div>

            {leader?.name ? (
              <div className="flex ">
                <p className="text-orange-500">Leader</p>
                <p className="text-gray-700 font-semibold pl-1">
                  {leader?.name}
                </p>
              </div>
            ) : null}

            <p className="text-gray-500 text-base line-clamp-2">
              {sbEvent?.recentActivity?.text
                ? sbEvent.recentActivity.text
                : sbEvent?.description}
            </p>
          </div>
        </div>
        <div className="flex justify-end px-4 pt-2">
          <p className="text-gray-500 text-base font-medium">
            {sbEvent?.recentActivity?.createdOn
              ? format(
                  new Date(sbEvent.recentActivity.createdOn),
                  "h:mmaaa d MMM"
                )
              : sbEvent?.updatedOn
              ? format(new Date(sbEvent?.updatedOn), "h:mmaaa d MMM")
              : null}
          </p>
        </div>

        <div className="p-2 px-4 pb-0">{/* <Divider /> */}</div>
      </Link>
    </div>
  );
};

export default TeamCard;
