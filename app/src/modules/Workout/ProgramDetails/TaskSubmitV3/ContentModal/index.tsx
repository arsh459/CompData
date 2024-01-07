import UseModal from "@components/UseModal";
import Header from "@modules/Header";
import Warning from "../Warning";
import { View } from "react-native";
import { useWorkoutVideoStore } from "../utils/useWorkoutVideoStore";
import { shallow } from "zustand/shallow";
import CustomControlsV2 from "../CustomControlsV2";

interface Props {}

const ContentModal: React.FC<Props> = ({}) => {
  // const { finalOrientation, contentModalState, onBackRequest } =
  //   useContentContext();
  const { finalOrientation, contentModalState, onBackRequest } =
    useWorkoutVideoStore((state) => {
      return {
        finalOrientation: state.finalOrientation,
        contentModalState: state.contentModalState,
        onBackRequest: state.onBackRequest,
      };
    }, shallow);

  console.log("content modal", contentModalState);

  return (
    <UseModal
      visible={contentModalState !== "hide"}
      onClose={() => {}}
      width="w-full"
      height="h-full"
      tone="dark"
      hasHeader={true}
      supportedOrientations={["landscape", "portrait"]}
    >
      <Header
        back={contentModalState === "controls"}
        orientation={finalOrientation}
        headerType="transparent"
        onBack={onBackRequest}
        headerColor="#100F1A"
        tone="dark"
      />
      <View
        className="absolute left-0 right-0 top-0 bottom-0"
        style={{ opacity: contentModalState === "controls" ? 1 : 0 }}
        pointerEvents={contentModalState === "controls" ? "auto" : "none"}
      >
        <CustomControlsV2 />
      </View>
      <View
        className="absolute left-0 right-0 top-0 bottom-0"
        style={{ opacity: contentModalState === "warning" ? 1 : 0 }}
        pointerEvents={contentModalState === "warning" ? "auto" : "none"}
      >
        <Warning />
      </View>
    </UseModal>
  );
};

export default ContentModal;
