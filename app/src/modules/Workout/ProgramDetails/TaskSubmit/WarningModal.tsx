import IconTextBtn from "@components/Buttons/IconTextBtn";
import UseModal from "@components/UseModal";
import { View, Text } from "react-native";
// import NetInfo, {
//   useNetInfo,
//   NetInfoState,
// } from "@react-native-community/netinfo";
// import { useState } from "react";
// import NetworkErrorModal from "../TaskSubmitV2/NetworkErrorModal";

// const getModalState = (net: NetInfoState) => {
//   if (net.type === "unknown") {
//     return false;
//   }

//   if (net.isConnected) {
//     return false;
//   }

//   if (net.isInternetReachable) {
//     return false;
//   }

//   return true;
// };

interface Props {
  showModal: boolean;
  isStarted: boolean;
  onResume: () => void;
  onFinish: () => void;
  supportedOrientations?: ("portrait" | "landscape")[];
  onQuit: () => void;
  onRetryInternet?: () => Promise<void>;
}

const WarningModal: React.FC<Props> = ({
  showModal,
  isStarted,
  onResume,
  onQuit,
  onFinish,
  supportedOrientations,
  onRetryInternet,
}) => {
  // const [loading, setloading] = useState(false);
  // const netInfo = useNetInfo();

  // const onRetry = async () => {
  //   setloading(true);
  //   await NetInfo.refresh();
  //   if (onRetryInternet) {
  //     await onRetryInternet();
  //   }

  //   setloading(true);
  // };

  // const networkStatus = getModalState(netInfo);

  // if (networkStatus) {
  //   <UseModal
  //     supportedOrientations={supportedOrientations}
  //     visible={networkStatus}
  //     onClose={onResume}
  //     tone="dark"
  //   >
  //     <NetworkErrorModal
  //       netInfo={netInfo}
  //       loading={loading}
  //       onRetry={onRetry}
  //     />
  //   </UseModal>;
  // }

  return (
    <UseModal
      supportedOrientations={supportedOrientations}
      visible={showModal}
      onClose={onResume}
      tone="dark"
    >
      <View className="bg-[#100F1A] border border-[#8F8F8F] rounded-xl w-5/6 p-3 iphoneX:p-5">
        <Text className="text-[#FF556C] text-lg iphoneX:text-2xl font-bold">
          Do you want to Quit the workout?
        </Text>
        <View className="my-3 iphoneX:my-5">
          {isStarted ? (
            <IconTextBtn
              icon="resume"
              text="Resume Workout"
              contentColor="#F5F8FF"
              bgColor="#100F1A"
              onPress={onResume}
            />
          ) : null}
        </View>
        <IconTextBtn
          icon="quit"
          text="Quit Workout"
          contentColor="#F5F8FF"
          bgColor="#100F1A"
          onPress={onQuit}
        />
        {isStarted ? (
          <View className="my-3 iphoneX:my-5">
            <IconTextBtn
              icon="resume"
              text="Finish Workout"
              contentColor="#FF556C"
              bgColor="#100F1A"
              onPress={onFinish}
            />
          </View>
        ) : null}
      </View>
    </UseModal>
  );
};

export default WarningModal;
