import NotifyBell from "@components/SvgIcons/NotifyBell";
import { useNotificationPermissionContext } from "@providers/notificationPermissions/NotificationPermissionProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Modal from "react-native-modal";

interface Props {
  text: string;
}

const EnableNotificationPopup: React.FC<Props> = ({ text }) => {
  const { permissionStatus, requestPermission } =
    useNotificationPermissionContext();
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const onClose = () => {
    setShowPopup(false);
  };

  const onNext = () => {
    onClose();
    requestPermission();
  };

  useEffect(() => {
    if (permissionStatus !== "granted" && permissionStatus !== "unknown") {
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
    }
  }, [permissionStatus]);

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={showPopup}
      avoidKeyboard={true}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      statusBarTranslucent={true}
      hideModalContentWhileAnimating={true}
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "flex-end",
      }}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationInTiming={300}
      coverScreen={false}
      hasBackdrop={false}
    >
      <LinearGradient
        colors={["#23213600", "#232136"]}
        className="absolute left-0 right-0 bottom-0 h-1/3"
        pointerEvents="none"
      />
      <View className="flex justify-end items-end px-4">
        <TouchableOpacity
          onPress={onClose}
          className="bg-white rounded-lg px-4 py-1"
        >
          <Text className="text-sm text-[#6D55D1]">Hide</Text>
        </TouchableOpacity>
        <View className="flex-1 my-4 px-4 py-2 bg-[#6D55D1] flex flex-row justify-between items-center rounded-2xl">
          <View className="w-8 aspect-square">
            <NotifyBell showDot={true} />
          </View>
          <Text className="flex-1 text-xs text-white px-2">{text}</Text>
          <TouchableOpacity onPress={onNext}>
            <FastImage
              source={{
                uri: "https://ik.imagekit.io/socialboat/tr:w-80,c-maintain_ratio,fo-auto/Group_1489_oyalXDJF0.png?updatedAt=1680354499148",
              }}
              className="w-8 aspect-square"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EnableNotificationPopup;
