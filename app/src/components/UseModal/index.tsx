import { Platform, Pressable, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlurBG from "@components/BlurBG";
import Modal from "react-native-modal";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;

  width?: string;
  height?: string;
  bgColor?: string;
  tone?: "dark" | "light";
  classStr?: string;
  blurAmount?: number;
  fallbackColor?: string;
  backdropColor?: string;
  hasHeader?: boolean;
  supportedOrientations?: ("portrait" | "landscape")[];
}

const UseModal: React.FC<Props> = ({
  children,
  visible,
  onClose,
  width,
  height,
  bgColor,
  tone,
  classStr,
  blurAmount,
  fallbackColor,
  hasHeader,
  supportedOrientations,
  backdropColor,
}) => {
  const { top: SafeAreaTopInset } = useSafeAreaInsets();
  const [renderContent, showContent] = useState<boolean>(false);

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={visible}
      avoidKeyboard={true}
      supportedOrientations={
        supportedOrientations ? supportedOrientations : ["portrait"]
      }
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      statusBarTranslucent={true}
      hideModalContentWhileAnimating={true}
      style={{ margin: 0, padding: 0 }}
      backdropColor="transparent"
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationInTiming={300}
      onModalShow={() => showContent(true)}
    >
      {renderContent ? (
        <View className="w-full h-full relative z-0 flex justify-center items-center">
          <Pressable
            className={clsx(
              "absolute left-0 right-0 top-0 bottom-0 -z-10",
              bgColor ? "bg-black/50" : ""
            )}
            onPress={() => {
              onClose();
            }}
          />
          <View
            className={clsx(
              classStr,
              "relative",
              width ? width : "",
              height ? height : "",
              bgColor && !blurAmount ? bgColor : "bg-transparent"
            )}
          >
            {blurAmount ? (
              <BlurBG
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                blurAmount={blurAmount}
                fallbackColor={
                  fallbackColor
                    ? fallbackColor
                    : tone === "dark"
                    ? "#000000"
                    : "#FFFFFF"
                }
                blurType={tone ? tone : "light"}
              />
            ) : null}
            {hasHeader ? null : (
              <>
                <View
                  style={{
                    paddingTop:
                      Platform.OS === "android"
                        ? StatusBar.currentHeight
                        : SafeAreaTopInset,
                    width: "100%",
                    elevation: 100,
                    zIndex: 100,
                  }}
                />
                <StatusBar
                  barStyle={tone === "dark" ? "light-content" : "dark-content"}
                  backgroundColor="transparent"
                  translucent={true}
                  animated={true}
                />
              </>
            )}
            {children}
          </View>
        </View>
      ) : (
        <View />
      )}
    </Modal>
  );
};

export default UseModal;
