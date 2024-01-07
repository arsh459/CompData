// import SocialBoat from "@components/SocialBoat";
// import Header from "@modules/Header";
// import TaskSubmit from "@modules/Workout/ProgramDetails/TaskSubmit";
// import TaskSubmit from "@modules/Workout/ProgramDetails/TaskSubmit";
// import { useLandscape } from "@hooks/orientation/useLandscape";
// import { useLandscape } from "@hooks/orientation/useLandscape";

// import LiveStreamV3 from "@modules/Workout/ProgramDetails/TaskSubmit/LiveStreamV3";
// import TaskSubmitV2 from "@modules/Workout/ProgramDetails/TaskSubmitV2";
// import TaskSubmitV3 from "@modules/Workout/ProgramDetails/TaskSubmitV3/TaskSubmitV3";
// import { BadgeProgressProvider } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import StepsTask from "@modules/StepsTask";
import { useAuthContext } from "@providers/auth/AuthProvider";

import { GameProvider } from "@providers/game/GameProvider";
import { TaskProvider } from "@providers/task/TaskProvider";
// import { TaskProvider } from "@providers/task/TaskProvider";
// import { TeamProvider } from "@providers/team/TeamProvider";
// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";
import { UploadTaskParams } from "@screens/Workout/UploadTask";
import { View } from "react-native";
// import { View } from "react-native";
// import { useRef } from "react";
// import { Text, View } from "react-native";
// import { useState } from "react";
// import { Platform } from "react-native";
// import { useState } from "react";
// import { useState } from "react";
// import { View } from "react-native";

const StepsTaskScreen = () => {
  const route = useRoute();
  const { todayUnix } = useAuthContext();
  const params = route.params as UploadTaskParams;

  useScreenTrack();

  return (
    <GameProvider selectedGameId={params.gameId}>
      {/* <UserProvider> */}

      <TaskProvider
        selectedUnix={todayUnix}
        // selectedDayNumber={params.selectedDayNumber}
        selectedTaskId={params.taskId}
      >
        <View />
        {/* <StepsTask
            taskId={params.taskId}
            selectedDay={params.selectedDayNumber}
          /> */}
      </TaskProvider>

      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default StepsTaskScreen;

/**
 * create post, activity and stream on init
 * start and pause stream.
 *
 */
