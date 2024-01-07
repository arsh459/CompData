import CreateModal from "../Program/CreateModal/CreateModal";
import PlayerCard from "./PlayerCard";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
// import { useEventMembers } from "@hooks/community/useEventMembers";
// import { useEvenMembersCount } from "@hooks/community/useEvenMembersCount";
import { useEventUsers } from "@hooks/community/v2/useEventUsers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  parentId: string;
  teamName?: string;
  currentMonth: string;
  membersCount?: number;
}

const TeamInteraction: React.FC<Props> = ({
  isOpen,
  onClose,
  eventId,
  parentId,
  teamName,
  currentMonth,
  membersCount,
}) => {
  // const { membersCount } = useEvenMembersCount(eventId);

  // console.log("isOpen", isOpen, eventId, parentId);

  const { members, onNextMember, nextMembersExist } = useEventUsers(
    parentId,
    eventId,
    10,
    currentMonth,
    isOpen
  );
  const { targetRef } = useNextOnScroll(onNextMember, nextMembersExist);

  return (
    <CreateModal
      isOpen={isOpen}
      onButtonPress={onClose}
      heading=""
      onCloseModal={onClose}
      onBackdrop={onClose}
      bgData="bg-white/70 backdrop-blur-[100px] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div className="w-full h-full flex flex-col overflow-y-scroll text-[#203C51]">
        <div className="sticky top-0 z-10 bg-[#F3F6F8] p-8">
          <img
            src={`https://ik.imagekit.io/socialboat/Component_5_BYt6BOh13.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650970656691`}
            alt="Back button"
            className="w-max cursor-pointer"
            onClick={onClose}
          />
          <div className="flex items-end mt-8">
            <h2 className="flex-1 text-3xl font-extrabold italic">
              {teamName}
            </h2>
            <p className="opacity-60 whitespace-nowrap">
              {membersCount ? membersCount : 0} Players
            </p>
          </div>
        </div>
        {members.map((item) => (
          <PlayerCard key={item.uid} player={item} month={currentMonth} />
        ))}
        <div ref={targetRef} className="h-px" />
      </div>
    </CreateModal>
  );
};

export default TeamInteraction;
