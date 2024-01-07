import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
// import { getBGImage } from "@templates/CourseTemplate/HeroV2";
import ProgramGreeting from "./ProgramGreeting";
import ProgramHeroCard from "./ProgramHeroCard";
import { hasWorkoutStarted } from "../utils";

interface Props {
  badge: Badge;
  user: UserInterface;
}
const MyProgramHero: React.FC<Props> = ({ badge, user }) => {
  const img = badge.bgImageMale; // getBGImage(badge, user.gender);

  const workoutStarted = hasWorkoutStarted(user);

  return (
    <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col justify-center p-4">
      <ProgramGreeting user={user} />

      <ProgramHeroCard
        courseDecorImage={badge.courseDecorImage}
        img={img}
        workoutStarted={workoutStarted}
        badgeId={badge?.id}
      />
    </div>
  );
};

export default MyProgramHero;
