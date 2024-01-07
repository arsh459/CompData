import { profileClick } from "@analytics/click/wrappers";
import { useEventMembers } from "@hooks/community/useEventMembers";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import NextMemberButton from "@templates/community/Program/MemberStrip/NextMemberButton";

interface Props {
  id: string;
  numCoaches: number;
  showMembers?: boolean;
}

const OtherCoaches: React.FC<Props> = ({ id, numCoaches, showMembers }) => {
  const { members, nextMembersExist } = useEventMembers(
    id,
    undefined,
    !showMembers
  );

  // console.log("me", members, id, showMembers);

  return (
    <div>
      <div className="flex items-center">
        {members.map((item) => {
          return (
            <div key={item.uid} className="pr-2 flex-none">
              <UserPhoto
                onImgClick={() => {
                  profileClick();
                }}
                nameInvisible={true}
                name={item.name}
                img={item?.profileImage}
                size="small"
              />
            </div>
          );
        })}

        {nextMembersExist ? (
          <div className="">
            <NextMemberButton onClick={() => {}} noText={true} />
          </div>
        ) : null}
      </div>
      <div className="pt-2 flex flex-wrap items-baseline">
        {showMembers ? (
          <p className="text-gray-700 font-semibold pr-1">
            {numCoaches} {numCoaches > 1 ? "Teams:" : "Team:"}
          </p>
        ) : (
          <p className="text-gray-700 font-semibold pr-1">
            {numCoaches} {numCoaches > 1 ? "Teams:" : "Team:"}
          </p>
        )}
        {members.map((item, index) => {
          return (
            <div key={item.uid} className="pr-1">
              <p className="text-blue-500 text-base cursor-pointer hover:underline">
                {item.name}
                {index + 1 !== members.length ? "," : ""}
              </p>
            </div>
          );
        })}

        {nextMembersExist ? (
          <p className="text-gray-700 underline font-medium text-base cursor-pointer">
            Show all
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default OtherCoaches;
