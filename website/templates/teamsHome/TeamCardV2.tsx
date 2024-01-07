// import { usePostsV2 } from "@hooks/community/usePostsV2";
// import { useParentEvent } from "@hooks/community/v2/useParentEvent";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import { useLatestPost } from "@hooks/community/v3/leaderboard/useLatestPost";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import TeamMembers from "@templates/community/LeaderboardWrapper/TeamMembers";
import UserImage from "@templates/listing/Header/UserImage";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { formatDistanceToNow } from "date-fns";
// import Link from "next/link";

interface Props {
  sbEvent: EventInterface;
}

const TeamCardV2: React.FC<Props> = ({ sbEvent }) => {
  // const { parentEvent } = useParentEvent(sbEvent.parentId);
  const { leader } = useLeaderboard(sbEvent.ownerUID);
  const { post } = useLatestPost(sbEvent.parentId ? sbEvent.parentId : "");
  // console.log("post", post);

  return (
    <Link
      href={`/${encodeURI(leader?.userKey ? leader.userKey : "")}/${encodeURI(
        sbEvent.eventKey ? sbEvent.eventKey : ""
      )}`}
      onClick={() =>
        weEventTrack("teamsHome_teamClick", {
          teamName: post?.teamName ? post.teamName : "no_teamName",
        })
      }
      // passHref
    >
      <div className="flex flex-col cursor-pointer justify-between bg-gradient-to-b from-[#335E7D] to-[#736969] text-white italic rounded-xl">
        <div className="flex px-2.5 iphoneX:px-4">
          <div className="py-2.5 iphoneX:py-4">
            <TeamMembers eventId={sbEvent.id} pxSize={22} noumberOfMember={3} />
          </div>
          <div className="w-px mx-2.5 iphoneX:mx-4 bg-white" />
          <div className="py-2.5 iphoneX:py-4">
            <h4 className="iphoneX:text-xl line-clamp-2 font-bold pb-[3px]">
              {sbEvent?.name}
            </h4>
            <h5 className="text-xs iphoneX:text-sm">
              {getGameNameReadable(sbEvent.parentId)}
            </h5>
          </div>
        </div>
        <div className="h-px bg-white" />
        {post ? (
          <div className="bg-white rounded-xl m-2.5 iphoneX:m-4 p-2 flex">
            <UserImage
              boxWidth="w-12 iphoneX:w-16"
              boxHeight="h-12 iphoneX:h-16"
              image={post.creatorImg}
              name={post.creatorName}
              unknown={!post.creatorImg && !post.creatorName}
            />
            <div className="text-[#335E7D] pl-2 flex-1 flex flex-col">
              <h6 className="font-bold leading-tight line-clamp-1 text-sm iphoneX:text-base">{`${post.creatorName} posted recently`}</h6>
              <div className="flex-1 flex items-center">
                <div className="flex-1 pr-2 flex flex-col justify-evenly">
                  {post.taskName ? (
                    <p className="text-[10px] iphoneX:text-xs line-clamp-1 leading-tight">
                      {post.taskName}
                    </p>
                  ) : post.teamName ? (
                    <p className="text-[10px] iphoneX:text-xs line-clamp-1 leading-tight">
                      @{post.teamName}
                    </p>
                  ) : null}
                  <p className="text-[8px] leading-tight">
                    {formatDistanceToNow(new Date(post.updatedOn))} ago
                  </p>
                </div>
                <button className="self-end px-4 iphoneX:px-6 py-1 iphoneX:py-1.5 rounded-xl bg-gradient-to-l from-[#FD807C] to-[#F4A252] text-white text-xs">
                  Open
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default TeamCardV2;
