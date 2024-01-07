import { View } from "react-native";
// import clsx from "clsx";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useContentContext } from "./utils/ContentProvider";
// import LiveStreamV4 from "../TaskSubmit/LiveStreamV4";

interface Props {
  isFullScreen?: boolean;
}

const BottomBarV4: React.FC<Props> = ({ isFullScreen }) => {
  // const { right } = useSafeAreaInsets();
  // const { finalOrientation, onPlayPause } = useContentContext();

  return <View />;

  // return (
  //   <View
  //     style={{
  //       marginRight:
  //         finalOrientation === "landscape" ? (right ? right : 16) : 0,
  //     }}
  //     className={clsx(
  //       isFullScreen ? "pt-20" : "absolute right-0 bottom-0",
  //       finalOrientation === "landscape" ? "pt-4 pb-16" : "p-4 pb-20"
  //     )}
  //   >
  //     <LiveStreamV4
  //       isFullScreen={isFullScreen}
  //       orientation={finalOrientation}
  //       onPress={onPlayPause}
  //     />
  //   </View>
  // );
};

export default BottomBarV4;
