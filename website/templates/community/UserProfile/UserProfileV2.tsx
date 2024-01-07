// import { profileSubNav } from "@hooks/community/useCommunityParams";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { profileSubNav } from "@hooks/community/useCommunityParams";
// import { useUserEvents } from "@hooks/editEvent/useUserEvents";
import { profileNavTypes } from "@hooks/profile/useProfileParams";
import { useUserEnrolledEvents } from "@hooks/user/useUserEnrolledEvents";
import { Divider } from "@mui/material";
import { UserInterface } from "@models/User/User";
import GamesCard from "@templates/teamsHome/GameCard/GameCard";
import PrizesCarousel from "../PersonalKPIs/PrizesCarousel";
import NextButton from "../Program/NextButton";
import ActivitiesJournal from "./ActivitiesJournal";
// import PrizesCarousel from "../PersonalKPIs/PrizesCarousel";
// import ActivitiesJournal from "./ActivitiesJournal";
// import GoalsWrapper from "./GoalsWrapper/GoalsWrapper";
// import ImageHeader from "./ImageHeader";
import ImageHeaderV2 from "./ImageHeaderV2";
import UserNav from "./UserNav";
// import UserNav from "./UserNav";

interface Props {
  user: UserInterface;
  viewerId?: string;
  isAdmin: boolean;
  // profileId: string;
  profileNav: profileNavTypes;
  onProfileSubNav: (newNav: profileNavTypes) => void;
  viewerIsCoach?: boolean;
  //   communityKey?: string;
}

const UserProfileV2: React.FC<Props> = ({
  user,
  viewerId,
  profileNav,
  onProfileSubNav,
  viewerIsCoach,
  isAdmin,
  //   communityKey,
}) => {
  // const { userEvents } = useUserEvents(user.uid);
  const { userEvents, nextMembersExist, onNext } = useUserEnrolledEvents(
    user.uid
  );
  // console.log("profileNav", profileNav);
  return (
    <div className="h-full">
      <div className="">
        <ImageHeaderV2
          img={user.profileImage}
          name={user.name}
          isAdmin={isAdmin}
          description={user.bio}
          viewerIsCoach={viewerIsCoach}
          phone={user.phone}
          fitPoints={user.totalFitPointsV2}
          level={user.userLevelV2}
          isCoach={user.userKey ? true : false}
          canEdit={user && viewerId == user.uid ? true : false}
          totalCalories={user.totalCalories}
          regularityScore={user.regularityScore}
        />
      </div>

      <div className="px-4">
        <div className="py-2">
          <Divider />
        </div>
      </div>

      <div className="border-b">
        <UserNav
          selected={profileNav}
          onProfileSubNav={onProfileSubNav}
          highlightColor="#ffffff"
        />
      </div>
      <div className="pt-0">
        {profileNav === "events" ? (
          <div className="pt-4 px-4">
            {userEvents.map((item) => {
              if (item.parentId)
                return (
                  <div key={item.id} className="pb-8">
                    <GamesCard event={item} showMembers={true} />
                  </div>
                );
            })}

            {nextMembersExist ? (
              <div className="w-full bg-white">
                <NextButton onClick={onNext} />
              </div>
            ) : null}
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

      {/* <div className="h-28" /> */}
    </div>
  );
};

export default UserProfileV2;
