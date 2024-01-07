import { navLevels } from "@hooks/community/useCommunityParams";
// import { SessionV2 } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import ProfileHeaderV1 from "@templates/profile/ProfileHeader/ProfileHeaderV1";
import clsx from "clsx";
import { NavElement } from "../constants/constants";
import MainNav from "../Program/MainNav/MainNav";
// import MainNav from "../Program/MainNav/MainNav";

interface Props {
  leader: LeaderBoard;
  dummy?: boolean;
  signedIn?: boolean;
  uid?: string;
  nav: navLevels;
  onNavChange: (newLevel: navLevels) => void;
  navElements: NavElement[];
  height?: "85vh";
  isAdmin: boolean;
  parentPostId: string;
}

const ProfileWrapper: React.FC<Props> = ({
  leader,
  parentPostId,
  uid,
  nav,
  onNavChange,
  navElements,
  height,
  isAdmin,
  dummy,
}) => {
  return (
    <div>
      <div className={clsx(uid ? "h-20 md:h-24 mt-2" : "h-16 md:h-20 mt-2")} />
      <div
        className={clsx(
          height ? "md:h-full" : "md:h-[85vh] md:overflow-y-auto shadow-sm",

          parentPostId ? "hidden md:block" : "",
          "bg-white",
          "p-4 md:px-8 md:py-8 border-r rounded-lg"
        )}
      >
        {/* <div className="h-16" /> */}
        <ProfileHeaderV1
          editing={false}
          live={true}
          dummy={dummy}
          onEditingClick={() => {}}
          profileImg={leader.profileImage}
          editingSection={undefined}
          profileName={leader.name}
          phone={leader.phone}
          userKey={leader.userKey}
          socialMediaIcons={{
            linkedIn: leader.linkedInLink,
            facebook: leader.facebookProfile,
            instagram: leader.instagramLink,
            youtube: leader.youtubeLink,
            external: leader.externalLink,
          }}
        />

        <div className="hidden md:block pt-6 md:pt-10 pl-0">
          <MainNav
            navElements={navElements}
            selectedNav={nav}
            onSelect={onNavChange}
            isAdmin={isAdmin}
          />
        </div>
        {/* <div className="h-4" /> */}
      </div>
    </div>
  );
};

export default ProfileWrapper;
