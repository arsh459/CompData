import Header from "@modules/Header";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import CourseMain from "@modules/CourseMain";
import { Text } from "react-native";
// import { useUserContext } from "@providers/user/UserProvider";
import {
  SingleBadgeProvider,
  useSignleBadgeContext,
} from "@providers/Badge/BadgeProvider";
import { useRoute } from "@react-navigation/native";

export interface CoursePageProps {
  badgeId: string;
  type: "nutrition" | "workout";
}

const CoursePageScreen = () => {
  const route = useRoute();
  const { badgeId, type } = route.params as CoursePageProps;

  useScreenTrack();
  return (
    <>
      {badgeId && (
        <SingleBadgeProvider badgeId={badgeId}>
          <CourseWrappedWithBadge type={type} />
        </SingleBadgeProvider>
      )}
    </>
  );
};

export default CoursePageScreen;

interface Props {
  type: "nutrition" | "workout";
}

export const CourseWrappedWithBadge: React.FC<Props> = ({ type }) => {
  const { badge } = useSignleBadgeContext();

  return (
    <>
      <Header
        back={true}
        tone="dark"
        titleNode={
          <Text
            className="text-white text-sm iphoneX:text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {badge?.name
              ? `${badge.name}`
              : type === "nutrition"
              ? "My Diet Plan"
              : "My Workout Plan"}
          </Text>
        }
        gradientColors={
          type === "nutrition" ? ["#FF9A02", "#F97C20"] : ["#318DF8", "#1F5BF7"]
        }
      />

      <CourseMain type={type} />
    </>
  );
};
