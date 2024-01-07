import { profileSubNav } from "@hooks/community/useCommunityParams";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";
import PrizesCarousel from "../PersonalKPIs/PrizesCarousel";
import ActivitiesJournal from "./ActivitiesJournal";
import GoalsWrapper from "./GoalsWrapper/GoalsWrapper";
import ImageHeader from "./ImageHeader";
// import UserNav from "./UserNav";

interface Props {
  user: LeaderBoard | UserInterface;
  viewerId?: string;
  // profileId: string;
  profileNav: profileSubNav;
  onProfileSubNav: (newNav: profileSubNav) => void;
  viewerIsCoach?: boolean;
  communityKey?: string;
}

const UserProfile: React.FC<Props> = ({
  user,
  viewerId,
  // profileId,
  profileNav,
  onProfileSubNav,
  viewerIsCoach,
  communityKey,
}) => {
  // console.log("user", user.uid);
  return (
    <div className="h-[85vh] bg-gradient-to-b from-white to-gray-100">
      <div>
        <ImageHeader
          img={user.profileImage}
          editUID={user.uid}
          name={user.name}
          viewerIsCoach={viewerIsCoach}
          phone={user.phone}
          isCoach={user.userKey ? true : false}
          canEdit={user && viewerId == user.uid ? true : false}
          communityKey={communityKey}
          totalCalories={user.totalCalories}
          regularityScore={user.regularityScore}
          userLev={user.userLevel}
          progress={user.progress}
        />
      </div>
      <div className="border-b">
        {/* <UserNav selected={profileNav} onProfileSubNav={onProfileSubNav} /> */}
      </div>
      <div className="pt-0">
        {profileNav === "goals" ? (
          <div className="pt-4">
            <GoalsWrapper user={user} viewerId={viewerId} />
          </div>
        ) : profileNav === "activities" ? (
          <ActivitiesJournal
            canEdit={user && viewerId == user.uid ? true : false}
            uid={user.uid}
            signedIn={viewerId ? true : false}
            terraUser={user.terraUser}
          />
        ) : (
          <PrizesCarousel uid={user.uid} noHeading={true} />
        )}
      </div>

      <div className="h-28" />
    </div>
  );
};

export default UserProfile;
