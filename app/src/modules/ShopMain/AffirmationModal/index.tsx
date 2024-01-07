import Loading from "@components/loading/Loading";
import UseModal from "@components/UseModal";
import { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import Done from "./Done";
import Warning from "./Warning";

interface Props {
  visible: boolean;
  onClose: () => void;
  onProceed: () => Promise<void>;
  onDone: () => void;
}

const AffirmationModal: React.FC<Props> = ({
  visible,
  onClose,
  onProceed,
  onDone,
}) => {
  const [modalState, setModalState] = useState<
    "warning" | "loading" | "delay" | "done"
  >("warning");

  const handleProceed = async () => {
    setModalState("loading");
    await onProceed();
    setModalState("delay");
    setTimeout(() => {
      setModalState("done");
    }, 1000);
  };

  return (
    <UseModal
      visible={visible}
      onClose={onClose}
      width="w-full"
      height="h-full flex-1"
      fallbackColor="#100F1A"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
    >
      <SafeAreaView className="flex bg-[#100F1A99] flex-1">
        {modalState === "warning" ? (
          <Warning onClose={onClose} onProceed={handleProceed} />
        ) : modalState === "loading" ? (
          <View className="flex-1 flex items-center justify-center">
            <Loading height="h-16" width="w-16" />
          </View>
        ) : modalState === "done" ? (
          <Done onDone={onDone} />
        ) : modalState === "delay" ? (
          <View className="flex items-center flex-1 justify-center">
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_47_gSbRPnK8o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665815620644",
              }}
              className="w-24 aspect-square"
            />
            <Text
              className="text-[#31FFB5] text-base iphoneX:text-xl pt-8"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Purchase done!
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </UseModal>
  );
};

export default AffirmationModal;
