import { viewTypes } from "@utils/leaderboard/utils";
import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import LeaderboardDetails from "./LeaderboardDetails";
import { useGameContext } from "@providers/game/GameProvider";
import ViewSelector from "@components/ViewSelector";
import PeriodModal from "./LeaderboardDetails/PeriodModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  heightFromBottom: number;
  isViewClick: boolean;
  isRankingScreen: boolean;
}

const LeaderboardMain: React.FC<Props> = ({
  isOpen,
  onClose,
  heightFromBottom,
  isViewClick,
  isRankingScreen,
}) => {
  const { game, params } = useGameContext();
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [selectedView, setSelectedView] = useState<viewTypes>(
    game?.configuration?.gameType === "team" ? "teams" : "players"
  );

  const [selectedSprint, setSelectedSprint] = useState<string | undefined>(
    params?.currentSprint?.id
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handlePeriodChange = (val: string) => {
    setLoading(true);
    setSelectedSprint(val);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  };

  useEffect(() => {
    if (game?.configuration?.gameType !== "team") {
      setSelectedView("players");
    } else {
      setSelectedView("teams");
    }
    setSelectedSprint(params?.currentSprint?.id);
  }, [params?.currentSprint?.id, game?.configuration?.gameType]);

  return (
    <View className="bg-[#100F1A] flex-1 ">
      {isViewClick || isRankingScreen ? (
        <ViewSelector
          view1="players"
          view2="teams"
          currView={selectedView}
          onView1={() => {
            setSelectedView("players");
            weEventTrack("ranking_clickPlayerTab", {});
          }}
          onView2={() => {
            setSelectedView("teams");
            weEventTrack("ranking_clickTeamTab", {});
          }}
        />
      ) : (
        <View className="flex px-4 py-5 pb-2">
          <Text className="text-white font-medium text-lg text-center">
            Top Players & Teams
          </Text>
        </View>
      )}
      <View className="flex-1 relative z-0">
        {loading ? null : (
          <LeaderboardDetails
            selectedView={selectedView}
            selectedSprint={selectedSprint}
            heightFromBottom={heightFromBottom}
            isRankingScreen={isRankingScreen}
          />
        )}
        {!isViewClick ? (
          <LinearGradient
            colors={["#34315000", "#343150D1", "#343150"]}
            className=" absolute left-0 right-0 top-0 bottom-0 z-10 "
          >
            <View
              className=" flex justify-end  items-center "
              style={{ height: height * 0.4 }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("RankingScreen")}
                className="bg-[#48465F] rounded-full border border-[#FFFFFF59]"
              >
                <Text className="py-2.5 px-6 text-center text-sm font-bold  text-[#FFFFFF]">
                  View Rankings
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        ) : null}
      </View>

      <PeriodModal
        isOpen={isOpen}
        onCloseModal={onClose}
        current={params?.currentSprint?.id}
        selected={selectedSprint}
        sprints={game?.configuration?.sprints}
        setSelected={handlePeriodChange}
        // gameStart={game?.configuration?.starts}
      />
    </View>
  );
};

export default LeaderboardMain;
