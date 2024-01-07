import { useEventMembers } from "@hooks/community/useEventMembers";
import { useEvenMembersCount } from "@hooks/community/useEvenMembersCount";
import UserImage from "@templates/listing/Header/UserImage";
import clsx from "clsx";

interface Props {
  eventId?: string;
  pxSize?: number;
  textSize?: string;
  textColor?: string;
  hideMemberCount?: boolean;
  noumberOfMember?: number;
}

const TeamMembers: React.FC<Props> = ({
  eventId,
  pxSize,
  textSize,
  textColor,
  hideMemberCount,
  noumberOfMember,
}) => {
  const { members } = useEventMembers(
    eventId,
    undefined,
    undefined,
    noumberOfMember ? noumberOfMember : 4
  );
  const { membersCount } = useEvenMembersCount(eventId);

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `repeat(${members.length - 1}, ${
            (pxSize ? pxSize : 20) / 2
          }px) max-content`,
        }}
      >
        {members.map((each) => (
          <div
            key={each.uid}
            className="rounded-full"
            style={{
              width: `${pxSize ? pxSize : 20}px`,
              height: `${pxSize ? pxSize : 20}px`,
            }}
          >
            <UserImage
              image={each.profileImage}
              name={each.name}
              pointer="cursor-default"
              boxWidth="w-full"
              boxHeight="h-full"
              unknown={!each.profileImage && !each.name}
            />
          </div>
        ))}
      </div>
      <p
        className={clsx(
          "pt-1",
          textColor,
          textSize ? textSize : "text-[10px]",
          hideMemberCount && "hidden"
        )}
      >
        {membersCount} Members
      </p>
    </div>
  );
};

export default TeamMembers;
