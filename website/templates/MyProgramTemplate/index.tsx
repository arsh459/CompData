import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import MyProgramHero from "@modules/MyProgram/Components/MyProgramHero";
import { Background } from "@templates/WomenTemplate/components/Background";
import React from "react";
import MyProgramHeader from "./Components/MyProgramHeader";
interface Props {
  badge: Badge;
  signOut: () => Promise<void>;
  user: UserInterface;
}

const MyProgramTemplate: React.FC<Props> = ({ badge, signOut, user }) => {
  return (
    <>
      <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/sakhi_website__3__P8OJVTO9VR.png?updatedAt=1684999744240" />

      <div className="text-white fixed inset-0 z-0 overflow-y-scroll scrollbar-hide">
        <MyProgramHeader userObj={user} onSignOut={signOut} />
        <MyProgramHero badge={badge} user={user} />
      </div>
    </>
  );
};

export default MyProgramTemplate;
