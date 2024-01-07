import { useLatestPosts } from "@hooks/community/v3/leaderboard/useLatestPosts";
import React from "react";
import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useEventMembers } from "@hooks/community/useEventMembers";
import UserImage from "@templates/listing/Header/UserImage";
import { getLevelColorV2 } from "@templates/LandingPage/levelColor";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";
import { Link } from "@mui/material";
// import { borderColor, style } from "@mui/system";

interface Props {
  gameId: string;
  teamId: string;
  leaderKey: string;
}

const TeamNotifications: React.FC<Props> = ({ gameId, teamId, leaderKey }) => {
  const { posts } = useLatestPosts(gameId, 5);
  const { selectedEvent } = useCommunityEvent(teamId);
  const { members } = useEventMembers(teamId, undefined, false, 3);
  // console.log(members, "Membars");
  // console.log(posts, "posts");

  return (
    <>
      {/**SHOW Team header with members */}

      <div className="mb-4 rounded-3xl w-full overflow-y-scroll no-scrollbar scrollbar-hide  relative h-full bg-[#66666680]">
        <Link
          href={`/${leaderKey}/${
            selectedEvent?.eventKey ? selectedEvent.eventKey : ""
          }`}
        >
          <div className="w-full flex text-white bg-[#4F4F4F] py-2 items-center iphoneX:py-3 rounded-3xl rounded-b-none ">
            <div
              className="grid place-self-center  cursor-pointer mx-3"
              style={{
                gridTemplateColumns: `repeat(${
                  members.length - 1
                }, 1rem) max-content`,
              }}
            >
              {members.map((member) => {
                const color = getLevelColorV2(
                  member?.userLevelV2 ? member.userLevelV2 : 0
                ).color;

                return (
                  <div
                    key={member.uid}
                    className={clsx(
                      "w-6 iphoneX:w-9 h-6  iphoneX:h-9  rounded-full border-2"
                    )}
                    style={{ borderColor: `${color}` }}
                  >
                    <UserImage
                      image={member.profileImage}
                      name={member.name}
                      boxWidth="w-full"
                      boxHeight="h-full"
                      unknown={!member.profileImage && !member.name}
                      dark={true}
                    />
                  </div>
                );
              })}
            </div>

            <div className="line-clamp-2  text-xs iphoneX:text-base flex-1  leading-[8px] ">
              <p className="pr-px  text-lg  iphoneX:text-xl font-semibold  text-white ">
                {selectedEvent?.name}
              </p>
              <span className=" text-[.7rem] ">
                {selectedEvent?.enrolledUserUIDs
                  ? `${selectedEvent.enrolledUserUIDs.length} Members`
                  : "0 Members"}
              </span>
            </div>
          </div>
        </Link>
        {/**SHOW posts with latest task name */}
        <div className="px-3">
          {posts.map((post) => {
            return (
              <div key={post.id} className="cursor-pointer">
                <Link
                  href={`/${leaderKey}/${
                    selectedEvent?.eventKey ? selectedEvent.eventKey : ""
                  }`}
                >
                  <div className="flex py-3 ">
                    <div className="iphoneX:w-12 iphoneX:h-12 w-10 h-10 rounded-full">
                      <UserImage
                        image={post.creatorImg}
                        name={post.creatorName}
                        boxWidth="w-full"
                        boxHeight="h-full"
                        unknown={!post.media[0] && !post.creatorName}
                        dark={true}
                      />
                    </div>
                    <div className="flex-1 font- ml-4 text-white ">
                      <p className="font-medium text-sm iphoneX:text-base line-clamp-2 text-white">
                        {post.creatorName} posted{" "}
                        {post.media[0]?.resource_type === "image" && "a photo"}
                        {post.media[0]?.resource_type === "video" && "a video"}
                      </p>
                      <p className="pt-1 text-xs">
                        {formatDistanceToNow(new Date(post.updatedOn), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-[#4D4D4D]" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TeamNotifications;
