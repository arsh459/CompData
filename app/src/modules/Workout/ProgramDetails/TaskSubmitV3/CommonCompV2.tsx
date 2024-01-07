import { View } from "react-native";
// import { useContentContext } from "./utils/ContentProvider";

import TaskStreamV5 from "./TaskStreamV5";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
import HeaderWrapper from "./HeaderWrapper";
import { useGivenOrientation } from "@hooks/orientation/useGivenOrientation";
import { useWorkoutVideoStore } from "./utils/useWorkoutVideoStore";
import { ContentProvider } from "./utils/ContentProvider";
import ContentModalV2 from "./ContentModal/ContentModalV2";
import { usePauseOnBackground } from "./ContentModal/usePauseOnBackground";

interface Props {}

const CommonCompV2: React.FC<Props> = ({}) => {
  //   const { contentModalState, onBackRequest, finalOrientation } =
  //     useContentContext();
  useKeepAwake();
  usePauseOnBackground();

  const finalOrientation = useWorkoutVideoStore(
    (state) => state.finalOrientation
  );
  useGivenOrientation(finalOrientation);
  // console.log("common comp");

  return (
    <ContentProvider>
      <View className="flex-1 bg-[#100F1A]">
        <HeaderWrapper />
        <View className="flex-1 rounded-2xl relative">
          <TaskStreamV5 />
        </View>
        <ContentModalV2 />
      </View>
    </ContentProvider>
  );
};

export default CommonCompV2;
