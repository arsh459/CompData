// import { useState } from "react";
// import { useKeepAwake } from "@sayem314/react-native-keep-awake";
// import { ContentProvider } from "./utils/ContentProvider";

// import { aiToggleStatus } from ".";
import CommonCompV2 from "./CommonCompV2";
// import { useStreamWithoutCamera } from "@hooks/permissions/useStreamWithoutCamera";

interface Props {
  //   castId?: string;
  //   tone: "light" | "dark";
  //   attemptedDate: string;
  //   aiToggle?: aiToggleStatus;
}

const GrantedFlowV5: React.FC<Props> = (
  {
    //   castId,
    //   attemptedDate,
    //   aiToggle,
    //   tone,
  }
) => {
  //   const [warning, setWarning] = useState<boolean>(false);

  //   const { onStartStreaming, onStopStreaming, streamingState, cast } =
  //     useStreamWithoutCamera(setWarning, castId);
  // console.log("grantedflowv5");

  return <CommonCompV2 />;
};

export default GrantedFlowV5;
