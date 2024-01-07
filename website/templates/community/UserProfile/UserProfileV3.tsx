import { profileNavTypes } from "@hooks/profile/useProfileParams";
import { UserInterface } from "@models/User/User";
import ImageHeaderV3 from "./ImageHeaderV3";
import UserNav from "./UserNav";
import { getAspriant } from "@utils/aspriant";
import ActivitiesCarousal from "./ActivitiesCarousal";
import TeamsCarousal from "./TeamsCarousal";
import WinsCarousal from "./WinsCarousal";

interface Props {
  user: UserInterface;
  viewerId?: string;
  // profileId: string;
  profileNav: profileNavTypes;
  onProfileSubNav: (newNav: profileNavTypes) => void;
  viewerIsCoach?: boolean;
  viewerIsCreator?: boolean;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  //   communityKey?: string;
}

const UserProfileV3: React.FC<Props> = ({
  user,
  viewerId,
  profileNav,
  onProfileSubNav,
  viewerIsCoach,
  viewerIsCreator,
  authStatus,
  //   communityKey,
}) => {
  // console.log("user", user);
  const { colorPrimary } = getAspriant(user.userLevelV2 ? user.userLevelV2 : 0);

  return (
    <div className="h-full">
      <ImageHeaderV3
        img={user.profileImage}
        name={user.name}
        activeFitPointsV2={user.activeFitPointsV2}
        description={user.bio}
        // viewerIsCoach={viewerIsCoach}
        // phone={user.phone}
        fitPoints={user.totalFitPointsV2}
        level={user.userLevelV2}
        // isCoach={user.userKey ? true : false}
        // canEdit={user && viewerId == user.uid ? true : false}
        // totalCalories={user.totalCalories}
        // regularityScore={user.regularityScore}
        progress={user.progressV2}
      />

      <UserNav
        selected={profileNav}
        onProfileSubNav={onProfileSubNav}
        highlightColor={colorPrimary}
        isVersion2={true}
      />

      <div className="pt-0">
        {profileNav === "teams" ? (
          <TeamsCarousal uid={user.uid} color={colorPrimary} />
        ) : profileNav === "activities" ? (
          <ActivitiesCarousal
            canEdit={user && viewerId == user.uid ? true : false}
            img={user.profileImage}
            // level={user.level ? user.level : 0}
            name={user.name}
            uid={user.uid}
            authStatus={authStatus}
            // signedIn={viewerId ? true : false}
            // terraUser={user.terraUser}
            color={colorPrimary}
            viewerId={viewerId}
            viewerIsCreator={viewerIsCreator}
          />
        ) : (
          <WinsCarousal uid={user.uid} color={colorPrimary} />
        )}
      </div>
    </div>
  );
};

export default UserProfileV3;
