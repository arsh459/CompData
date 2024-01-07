import UseModal from "@components/UseModal";
// import Header from "@modules/Header";
import Warning from "../Warning";
import { View } from "react-native";
import { useWorkoutVideoStore } from "../utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
import VideoQualityModal from "../VideoQualityModal";
// import CustomControlsV2 from "../CustomControlsV2";

interface Props {}

const ContentModalV2: React.FC<Props> = ({}) => {
  // const { finalOrientation, contentModalState, onBackRequest } =
  //   useContentContext();
  const {
    //  finalOrientation,
    warningVisible,
    videoQualityVisible,
    onResume,
    //  onBackRequest
  } = useWorkoutVideoStore((state) => {
    return {
      onResume: state.onResume,
      // finalOrientation: state.finalOrientation,
      warningVisible: state.contentModalState === "warning", // ||
      videoQualityVisible: state.contentModalState === "videoQuality",
      // onBackRequest: state.onBackRequest,
    };
  }, shallow);

  // console.log("contentmodal");

  return (
    <UseModal
      // visible={contentModalState !== "hide"}
      visible={warningVisible || videoQualityVisible}
      bgColor="#000"
      onClose={onResume}
      width="w-full flex justify-center items-center"
      height="h-full"
      tone="dark"
      hasHeader={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      {/* <Header
        back={contentModalState === "controls"}
        orientation={finalOrientation}
        headerType="transparent"
        onBack={onBackRequest}
        headerColor="#100F1A"
        tone="dark"
      /> */}
      {/* <View
        className="absolute left-0 right-0 top-0 bottom-0"
        style={{ opacity: contentModalState === "controls" ? 1 : 0 }}
        pointerEvents={contentModalState === "controls" ? "auto" : "none"}
      >
        <CustomControlsV2 />
      </View> */}
      <View
        className="flex justify-center items-center p-4"
        // className="absolute left-0 right-0 top-0 bottom-0"
        // style={{ opacity: contentModalState === "warning" ? 1 : 0 }}
        // pointerEvents={contentModalState === "warning" ? "auto" : "none"}
      >
        {warningVisible ? <Warning /> : <VideoQualityModal />}
      </View>
    </UseModal>
  );
};

export default ContentModalV2;
