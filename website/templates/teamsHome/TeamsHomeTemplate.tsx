import { UserInterface } from "@models/User/User";
import HeaderV2 from "@templates/community/Header/HeaderV2";
import DiscoverGames from "./DiscoverGames";
import TeamsView from "./TeamsView";

interface Props {
  setAuthIsVisible: () => void;
  signedInUser?: UserInterface;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
}

const TeamsHomeTemplate: React.FC<Props> = ({
  setAuthIsVisible,
  signedInUser,
  authStatus,
}) => {
  return (
    <div className="max-w-xl relative mx-auto ">
      <div className="bg-gradient-to-b to-gray-100 from-white">
        <div className="bg-white top-0 w-full z-50 left-0 right-0 fixed">
          <HeaderV2
            onSignIn={setAuthIsVisible}
            signedInUserName={signedInUser?.name}
            uid={signedInUser?.uid}
            authStatus={authStatus}
            signedInUserImage={signedInUser?.profileImage}
            signedInUserKey={signedInUser?.userKey}
          />
        </div>
      </div>
      <div className="h-20" />
      {signedInUser &&
      signedInUser.enrolledEvents &&
      signedInUser.enrolledEvents?.length > 0 ? (
        <TeamsView user={signedInUser} />
      ) : authStatus === "FAILED" ||
        signedInUser?.enrolledEvents?.length === 0 ? (
        <DiscoverGames
          heading="No teams as of now"
          subtitle="Select a game to start"
        />
      ) : null}
    </div>
  );
};

export default TeamsHomeTemplate;
