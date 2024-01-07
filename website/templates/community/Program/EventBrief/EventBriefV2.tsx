import { useEventMembers } from "@hooks/community/useEventMembers";
import UserImage from "@templates/listing/Header/UserImage";
import ShareModal from "@components/ShareModal";
import { useState } from "react";
import { Link } from "@mui/material";
import { EventInterface } from "@models/Event/Event";
import MoreText from "@components/MoreText/MoreText";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import TeamInteraction from "@templates/community/NewCommunitySection/TeamInteraction";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  leader: LeaderBoard;
  selectedEvent: EventInterface;
  gameId: string;
  challangeName?: string;
  memberStatus: "PENDING" | "SUCCESS" | "FAILED";
  currentMonth: string;
  daysLeft?: number;
}

const EventBriefV2: React.FC<Props> = ({
  leader,
  selectedEvent,
  challangeName,
  memberStatus,
  gameId,
  currentMonth,
  daysLeft,
}) => {
  const { members } = useEventMembers(
    selectedEvent.id,
    undefined,
    undefined,
    4
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onShareOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);

  const onOpen = () => setIsOpen(true);
  const onCloseTeam = () => setIsOpen(false);

  // console.log("gameId", gameId);
  // console.log("selectedEvent", selectedEvent.id);

  return (
    <div className="px-4">
      <ShareModal
        isOpen={isVisible}
        onBackdrop={onClose}
        onButtonPress={() => {}}
        onCloseModal={onClose}
        shareURL={`https://www.socialboat.live/teams/${encodeURI(
          selectedEvent.eventKey ? selectedEvent.eventKey : ""
        )}`}
      />
      <h1 className="text-2xl iphoneX:text-3xl font-extrabold line-clamp-1 font-sans">
        {challangeName}
      </h1>
      <h3 className="text-lg iphoneX:text-xl line-clamp-1 font-sans">
        {selectedEvent.name}
      </h3>
      {daysLeft ? (
        <p className="text-red-700 font-medium">
          {`${daysLeft} ${daysLeft === 1 ? `Day` : `Days`} Left`}
        </p>
      ) : null}

      {memberStatus === "SUCCESS" ? (
        <div className="w-full grid grid-cols-2 items-center text-[#203C51] py-4 iphoneX:py-6">
          <div
            className="grid place-self-center cursor-pointer"
            style={{
              gridTemplateColumns: `repeat(${
                members.length - 1
              }, 1.75rem) max-content`,
            }}
            onClick={() => {
              onOpen();
              weEventTrack("game_teamMembers", {
                teamName: selectedEvent.name,
              });
            }}
          >
            {members.map((member) => (
              <div
                key={member.uid}
                className="iphoneX:w-12 iphoneX:h-12 w-10 h-10 rounded-full"
              >
                <UserImage
                  image={member.profileImage}
                  name={member.name}
                  boxWidth="w-full"
                  boxHeight="h-full"
                  unknown={!member.profileImage && !member.name}
                />
              </div>
            ))}
          </div>
          <button
            className="w-full max-w-[110px] iphoneX:max-w-[140px] py-1.5 mx-auto border border-[#335E7D] font-bold flex justify-evenly items-center opacity-[73%] rounded-xl"
            onClick={() => {
              onShareOpen();
              weEventTrack("game_inviteClick", {
                teamName: selectedEvent.name,
              });
            }}
          >
            <span className="text-xl iphoneX:text-2xl">+</span>
            <span className="text-lg iphoneX:text-xl">Invite</span>
          </button>
          <p
            className="opacity-60 text-center text-xs iphoneX:text-base"
            onClick={() => {
              onOpen();
              weEventTrack("game_teamMembers", {
                teamName: selectedEvent.name,
              });
            }}
          >
            {selectedEvent.enrolledUserUIDs
              ? selectedEvent.enrolledUserUIDs.length
              : 0}{" "}
            Members
          </p>
        </div>
      ) : (
        <div className="pb-2">
          <div className="flex">
            <Link href={`/p/${leader.uid}`}>
              <div className="flex items-center pb-1">
                <p className="text-gray-700 text-sm">By</p>
                <p className="text-orange-500 font-bold text-sm pl-1 underline cursor-pointer">
                  {leader.name}
                </p>
              </div>
            </Link>
          </div>

          {selectedEvent.description ? (
            <MoreText text={selectedEvent.description} numChars={140} />
          ) : null}
        </div>
      )}
      <TeamInteraction
        isOpen={isOpen}
        onClose={onCloseTeam}
        eventId={selectedEvent.id}
        parentId={gameId}
        teamName={selectedEvent.name}
        currentMonth={currentMonth}
        membersCount={selectedEvent.enrolledUserUIDs?.length}
      />
    </div>
  );
};

export default EventBriefV2;
