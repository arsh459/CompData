import { ScrollView, Text, View } from "react-native";
import { useCommunityPostClick } from "./hooks/useCommunityPostClick";
import ProgramCard from "../Program/ProgramCard";
import TaskDetails from "./TaskDetails";
import EarnedFitPoint from "./EarnedFitPoint";
import { getCalTolFP, getTaskTotalFP } from "@utils/community/utils";
import Header from "@modules/Header";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";

interface Props {
  postId: string;
}

const PostScreen: React.FC<Props> = ({ postId }) => {
  // const { game } = useGameContext();
  // const { team } = useTeamContext();
  const navigation = useNavigation();
  const { pinnedPost, adminReview, task } = useCommunityPostClick(postId, true);

  return (
    <>
      <Header
        back={true}
        defaultOption={true}
        headerColor="#100F1A"
        tone="dark"
      />
      <ScrollView bounces={false} className="flex-1 bg-[#100F1A]">
        {pinnedPost?.post && pinnedPost.ref ? (
          <ProgramCard
            post={pinnedPost.post}
            postRef={pinnedPost.ref}
            isLive={false}
            isPostScreen={true}
          />
        ) : null}

        <TaskDetails
          activityName={task?.name}
          text={task?.rules}
          userLevel={task?.level}
        />

        {adminReview.length > 0 && adminReview[0].reviewStatus !== "PENDING" ? (
          <EarnedFitPoint
            earnedFP={getCalTolFP(adminReview[0]?.calories)}
            totalFP={getTaskTotalFP(task?.awardLevels)}
            reviewStatus={adminReview[0].reviewStatus}
            tags={adminReview[0].activeMessage?.tags}
            awardLevels={task?.awardLevels}
            message={adminReview[0].activeMessage?.text}
          />
        ) : null}

        {/* {taskDoneLists.length ? (
          <RankingComponent
            taskDoneLists={taskDoneLists}
            onNextTaskDone={onNextTaskDone}
          />
        ) : null} */}

        <View className="py-4">
          <Text
            className="text-lg iphoneX:text-2xl font-semibold text-white text-center"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Wanna earn more fitpoints,
          </Text>
          <Text
            className="text-lg iphoneX:text-2xl font-semibold text-white text-center"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Start this workout!
          </Text>
        </View>

        {task?.badgeId ? (
          <View className="p-4">
            <StartButton
              title="Start Workout"
              bgColor="bg-[#fff]"
              textColor="text-[#100F1A] "
              roundedStr="rounded-md"
              textStyle="py-2 text-center text-xl font-bold  rounded-md"
              onPress={() =>
                navigation.navigate("Workout", {
                  // gameId: game ? game.id : "",
                  badgeId: task?.badgeId ? task?.badgeId : "",
                  // teamId: team ? team.id : "",
                })
              }
            />
          </View>
        ) : null}
      </ScrollView>
    </>
  );
};

export default PostScreen;
