import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import CourseShortInfo from "./CourseShortInfo";
import CreatedByCoach from "./CreatedByCoach";
import EquipmentRequired from "./EquipmentRequired";
import WhatWillWeTeach from "./WhatWillWeTeach";
import BadgesYouCanWin from "./BadgesYouCanWin";
import DosDonts from "./DosDonts";

interface Props {
  badge: Badge;
  user?: UserInterface;
}

const CoursePageMain: React.FC<Props> = ({ badge, user }) => {
  return (
    <div className="w-full flex-1 max-w-screen-xl mx-auto">
      <p className="text-white text-2xl sm:text-3xl text-center font-popM py-4">
        {badge?.name ? `${badge.name}` : "My Workout Plan"}
      </p>

      <CourseShortInfo badge={badge} />

      <div className="grid sm:grid-cols-2 gap-4 p-4">
        <CreatedByCoach
          media={user?.profileImage}
          primaryText={badge?.description}
          secondaryText={badge?.courseGoal}
          createdByString={`Created by ${user?.name ? user.name : "Coach"}`}
        />

        <WhatWillWeTeach whatWeTeach={badge?.weTeach} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 p-4">
        <EquipmentRequired
          equipmentString={badge?.equipmentNeeded?.join(" , ")}
        />

        <BadgesYouCanWin badge={badge} />
      </div>

      <DosDonts dos={badge?.dos} donts={badge?.donts} />
    </div>
  );
};

export default CoursePageMain;
