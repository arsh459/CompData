import Button from "@components/button";
import { profileSubNav } from "@hooks/community/useCommunityParams";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
// import { UserInterface } from "@models/User/User";
import TopHeader from "@templates/community/Thread/TopHeader";
import UserProfile from "@templates/community/UserProfile";

interface Props {
  viewerId?: string;
  profileId: string;
  profileNav: profileSubNav;
  onBack: () => void;
  viewerIsCoach?: boolean;
  authStatus: "PENDING" | "FAILED" | "SUCCESS";
  communityKey?: string;
  onProfileSubNav: (newNav: profileSubNav) => void;
  newAuthRequest: () => void;
}

const ProfileContainer: React.FC<Props> = ({
  // user,
  viewerId,
  profileId,
  onProfileSubNav,
  authStatus,
  onBack,
  profileNav,
  viewerIsCoach,
  communityKey,
  newAuthRequest,
}) => {
  const { leader } = useLeaderboard(profileId);

  return (
    <div className="max-w-lg md:px-4">
      <div className="border mt-2">
        <TopHeader onClick={onBack} />
      </div>
      <div className="">
        {leader && viewerId ? (
          <UserProfile
            // profileId={profileId}
            profileNav={profileNav}
            user={leader}
            communityKey={communityKey}
            viewerIsCoach={viewerIsCoach}
            viewerId={viewerId}
            onProfileSubNav={onProfileSubNav}
          />
        ) : authStatus === "FAILED" ? (
          <div className="flex flex-col justify-center items-center h-[85vh]">
            <div className="pb-2">
              <img
                src="https://img.icons8.com/emoji/96/000000/locked.png"
                className="w-24 h-24 object-cover"
              />
            </div>

            <p className="text-center text-gray-700 text-2xl">
              This is private information
            </p>
            <div className="pt-2">
              <Button appearance="contained" onClick={newAuthRequest}>
                Sign in
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileContainer;
