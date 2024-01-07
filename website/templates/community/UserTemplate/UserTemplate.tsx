import { useProfileParams } from "@hooks/profile/useProfileParams";
import { UserInterface } from "@models/User/User";
import HeaderV3 from "../Header/HeaderV3";
import UserProfileV3 from "../UserProfile/UserProfileV3";

interface Props {
  leader: UserInterface;
  signedInUser?: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  setAuthIsVisible: () => void;
  onSignOut: () => void;
}

const UserTemplate: React.FC<Props> = ({
  leader,
  signedInUser,
  authStatus,
  setAuthIsVisible,
  onSignOut,
}) => {
  // const router = useRouter();
  // const onGoBack = () => router.back();

  const { nav, onGoBack, onNavChange } = useProfileParams();

  return (
    <div className="max-w-lg relative mx-auto min-h-screen">
      <div className="bg-white top-0 w-full z-50 left-0 right-0 fixed">
        <HeaderV3
          onSignIn={setAuthIsVisible}
          onSignOut={onSignOut}
          uid={signedInUser?.uid}
          onGoBack={onGoBack}
          authStatus={authStatus}
          leaderId={leader.uid}
        />
      </div>
      <div className="h-16" />
      <UserProfileV3
        user={leader}
        authStatus={authStatus}
        profileNav={nav}
        onProfileSubNav={onNavChange}
        viewerId={signedInUser?.uid}
        viewerIsCoach={signedInUser?.userKey ? true : false}
        viewerIsCreator={signedInUser?.isCreator ? true : false}
      />
    </div>
  );
};

export default UserTemplate;
