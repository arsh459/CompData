import { profileClick } from "@analytics/click/wrappers";
import { useSelectCommunityMembers } from "@hooks/community/useSelectCommunityMembers";
import UserPhoto from "@templates/community/Program/Feed/PostView/UserPhoto";
import clsx from "clsx";
import ButtonWrapper from "../ButtonWrapper";

interface Props {
  communityId: string;
  onBack: () => void;
  onNext: (members: { [memberId: string]: boolean }) => void;
}

export const whatsappMessageWarning =
  "We will send a WhatsApp message & email to everyone to let them know they are added.";
export const spamMessage = "Please do not spam as this will affect your brand";

const AddMembers: React.FC<Props> = ({ communityId, onBack, onNext }) => {
  const { members, onMemberTap, selectedMembers } =
    useSelectCommunityMembers(communityId);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full p-4 md:w-3/4">
          <div className="pb-4">
            <p className="text-4xl font-medium text-gray-600">
              Add community members
            </p>
            <p className="text-base text-gray-500">{whatsappMessageWarning}</p>
            <p className="text-base font-semibold text-red-500">
              {spamMessage}
            </p>
          </div>

          <div className="pb-4">
            <p className="text-lg text-gray-700">{`Inviting ${
              Object.keys(selectedMembers).length
            } members`}</p>

            <div className="pt-2">
              <ButtonWrapper
                leftButtonOnPress={onBack}
                leftButtonText="Back"
                buttonText="Invite and Next"
                onButtonPress={() => onNext(selectedMembers)}
              />
            </div>
          </div>

          <div className="flex flex-wrap p-4 overflow-y-auto bg-gray-100 rounded-lg shadow-sm h-60">
            {members.map((item) => {
              return (
                <div
                  key={item.uid}
                  className="pb-4 pr-8 cursor-pointer"
                  onClick={() => onMemberTap(item.uid)}
                >
                  <UserPhoto
                    selected={selectedMembers[item.uid]}
                    onImgClick={() => {
                      profileClick();
                    }}
                    name={item.name}
                    nameInvisible={true}
                    img={item.profileImage}
                    size="medium"
                  >
                    <p
                      className={clsx(
                        selectedMembers[item.uid]
                          ? "text-gray-700 font-medium"
                          : " text-gray-500",
                        "text-base pl-2"
                      )}
                    >
                      {item.name}
                    </p>
                  </UserPhoto>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMembers;
