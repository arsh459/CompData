// import { useState } from "react";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";
// import { ContentProvider } from "./utils/ContentProvider";
// import CommonComp from "./CommonComp";
import { aiToggleStatus } from ".";
import { View } from "react-native";
// import { useStreamWithoutCamera } from "@hooks/permissions/useStreamWithoutCamera";
// import { View } from "react-native-reanimated/lib/typescript/Animated";

interface Props {
  castId?: string;
  tone: "light" | "dark";
  attemptedDate: string;
  aiToggle?: aiToggleStatus;
}

const GrantedFlowV4: React.FC<Props> = ({
  castId,
  attemptedDate,
  aiToggle,
  tone,
}) => {
  // const [warning, setWarning] = useState<boolean>(false);

  // const { onStartStreaming, onStopStreaming, streamingState, cast } =
  //   useStreamWithoutCamera(setWarning, castId);

  useKeepAwake();

  return <View />;

  // return (
  //   <ContentProvider
  //     onStartStreaming={onStartStreaming}
  //     onStopStreaming={onStopStreaming}
  //     streamingState={streamingState}
  //     castId={castId}
  //     warning={warning}
  //     attemptedDate={attemptedDate}
  //     tone={tone}
  //   >
  //     <CommonComp aiToggle={aiToggle} castId={castId} cast={cast} />
  //   </ContentProvider>
  // );
};

export default GrantedFlowV4;
