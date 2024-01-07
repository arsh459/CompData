import { baseImageKit } from "@constants/imageKitURL";
import Video, { OnLoadData } from "react-native-video";
import { View } from "react-native";
import TaskStreamFixOverlay from "./TaskStreamFixOverlay";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { StackActions, useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";
import { useContentContext } from "./utils/ContentProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { usePostNavigationProvider } from "@modules/CircularProgressMain/providers/postNavigationProvider";
import { getTodayFp } from "@providers/streakV2/utils/getTodayFp";
import {
  createTrackNavigationUtils,
  getNavAction,
} from "@modules/MealMain/utils/navUtils";
import { streakUpdate } from "@providers/streakV2/utils/streakUpdate";

interface Props {}

const TaskStreamV5: React.FC<Props> = ({}) => {
  const navigation = useNavigation();

  const {
    uri,
    poster,
    onError,
    paused,
    handleLoad,
    handleSeek,
    handleProgressUpdate,
    onEndVideo,
    onBuffer,
    retryState,
    onReady,
    attemptedDate,
  } = useWorkoutVideoStore((state) => {
    return {
      handleSeek: state.handleSeek,
      uri: state.uri,
      poster: `${baseImageKit}/${state.task?.videoThumbnail?.path}`,
      onError: state.onError,
      handleLoad: state.handleLoad,
      paused: !(state.streamingState === "play"),
      handleProgressUpdate: state.handleProgressUpdate,
      onEndVideo: state.onEndVideo,
      onBuffer: state.onBuffer,
      retryState: state.retryState,
      onReady: state.onReady,
      attemptedDate: state.attemptedDate,
    };
  }, shallow);

  const { videoRef } = useContentContext();
  const { todayUnix, today } = useAuthContext();
  const { uid } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
    };
  }, shallow);

  const setContinueCallback = usePostNavigationProvider(
    (state) => state.setContinueCallback,
    shallow
  );
  const { userStreak, todayStreakStatus, dailyFPTarget } = useStreakStore(
    (state) => ({
      userStreak: state.streak,
      dailyFPTarget: state.streak?.targetFp ? state.streak?.targetFp : 0,
      todayStreakStatus:
        state.streak && state.streak.streakMap[today]
          ? state.streak.streakMap[today]
          : undefined,
    }),
    shallow
  );

  const onHandleLoadWrapper = (data: OnLoadData) => {
    // console.log("load init");
    handleLoad(data, videoRef);
  };

  const onEndVideoWrapper = async () => {
    // onFinish();
    onEndVideo();

    if (attemptedDate === today && dailyFPTarget && uid) {
      const todayFp = await getTodayFp(uid, todayUnix);
      const action = getNavAction(
        todayFp,
        dailyFPTarget,
        todayStreakStatus,
        userStreak
      );
      // console.log(action, "from the item added");

      userStreak && (await streakUpdate(action, uid, today, userStreak));

      const callback = createTrackNavigationUtils(navigation, 2, action);
      callback && setContinueCallback(callback);
    }

    navigation.dispatch(
      StackActions.replace("CircularProgressScreen", { type: "fitpoint" })
    );

    // navigation.navigate("CircularProgressScreen", { type: "fitpoint" });
  };

  return (
    <View
      className="flex justify-center items-center relative"
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      {retryState === "unmount" ? null : (
        <Video
          source={{ uri }}
          useTextureView={false}
          style={{ width: "100%", height: "100%" }}
          progressUpdateInterval={1000}
          ignoreSilentSwitch="ignore"
          poster={poster}
          onError={onError}
          ref={videoRef}
          resizeMode="contain"
          controls={false}
          onReadyForDisplay={onReady}
          onBuffer={onBuffer}
          onLoad={onHandleLoadWrapper}
          paused={paused}
          onProgress={handleProgressUpdate}
          onSeek={handleSeek}
          onEnd={onEndVideoWrapper}
        />
      )}
      <TaskStreamFixOverlay />
    </View>
  );
};

export default TaskStreamV5;
