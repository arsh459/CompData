import { View } from "react-native";
import HistoryComp from "./HistoryComp";
import OverviewComp from "./OverviewComp";
import { useProfileContext } from "@providers/profile/ProfileProvider";
import { useViewerStreak } from "@providers/streakV2/hooks/useViewerStreak";

interface Props {
  ListHeaderComponent: () => JSX.Element;
  selectedView: "History" | "Overview";
}

const ProfileList: React.FC<Props> = ({
  ListHeaderComponent,
  selectedView,
}) => {
  const { profile } = useProfileContext();
  useViewerStreak(profile?.uid);

  return (
    <View className="bg-[#232136] h-full flex-1">
      {selectedView === "Overview" ? (
        <OverviewComp
          ListHeaderComponent={ListHeaderComponent}
          profile={profile}
        />
      ) : selectedView === "History" ? (
        <HistoryComp
          ListHeaderComponent={ListHeaderComponent}
          profile={profile}
        />
      ) : null}
    </View>
  );
};

export default ProfileList;
