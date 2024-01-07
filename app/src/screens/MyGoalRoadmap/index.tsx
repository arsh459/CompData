import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import AchievementPath from "@modules/JoinBoatMainV3/components/AchievementPath";
// import { useNavigation } from "@react-navigation/native";

const MyGoalRoadmap = () => {
  useScreenTrack();

  return (
    <AchievementPath
      type="fetch"
      // ctaText="Let's Get Started"
      // onCtaPress={() => {}}
      dark={true}
      canEdit={true}
    />
  );
};

export default MyGoalRoadmap;
