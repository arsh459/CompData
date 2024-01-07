// import { useLocalUser } from "@hooks/auth/useLocalUser";
import Loading from "@components/loading/Loading";
import { useLocalUser } from "@hooks/joinBoat/useLocalUser";
import { updateUserBriefFields } from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";
import HeaderV2 from "@templates/community/Header/HeaderV2";
import ProfileBrief from "@templates/joinBoatTemplate/v2/ProfileBrief";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: UserInterface;
  onSignIn: () => void;
  onSignOut: () => void;
}

const EditProfileTemplateV2: React.FC<Props> = ({
  user,
  onSignIn,
  onSignOut,
}) => {
  const {
    localUser,
    uploadProfileImg,
    onBioUpdate,
    onNameUpdate,
    onEmailUpdate,
    onInstaUpdate,
  } = useLocalUser(user);

  const router = useRouter();
  const onGoBack = () => router.back();

  const [loading, setLoading] = useState<boolean>(false);

  const onSave = async () => {
    setLoading(true);
    await updateUserBriefFields(
      user.uid,
      localUser?.name,
      localUser?.instagramHandle,
      localUser?.email,
      localUser?.profileImage,
      localUser?.bio
    );

    router.push(`/pr/${user.userKey}`);
  };

  return (
    <div className="relative">
      <div className="bg-white top-0 w-full z-50 left-0 right-0 fixed">
        <HeaderV2
          onGoBack={onGoBack}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
          authStatus="SUCCESS"
        />
      </div>
      {loading ? (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <>
          <div className="h-20" />
          <div className="px-4">
            <div className="w-full pt-20 h-screen">
              <ProfileBrief
                name={localUser?.name}
                instagramHandle={localUser?.instagramHandle}
                uid={localUser?.uid ? localUser.uid : "noUser"}
                email={localUser?.email}
                img={localUser?.profileImage}
                bio={localUser?.bio}
                onButtonPress={onSave}
                onBioUpdate={onBioUpdate}
                onNameUpdate={onNameUpdate}
                onEmailUpdate={onEmailUpdate}
                onInstaUpdate={onInstaUpdate}
                uploadProfileImg={uploadProfileImg}

                // removeProfileImg={removeProfileImg}
                //   onBack={onBack}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProfileTemplateV2;
