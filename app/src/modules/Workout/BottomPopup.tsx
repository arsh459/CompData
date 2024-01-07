import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import NotifyBell from "@components/SvgIcons/NotifyBell";
import firestore from "@react-native-firebase/firestore";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useNotificationPermissionContext } from "@providers/notificationPermissions/NotificationPermissionProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import ConfirmationModal from "@components/ConfirmationModal";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { makeGeneratorCall } from "@hooks/dayRecs/generatorCall";

const BottomPopup = () => {
  const { todayUnix, state } = useAuthContext();
  const { res } = useSubscriptionContext();
  const { permissionStatus, requestPermission } =
    useNotificationPermissionContext();
  const [showPopup, setShowPopup] = useState<
    "notification" | "demo" | "unknown"
  >("unknown");
  const [warning, setWarning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { startUnixDayStart } = useDayContext();
  const { badge } = useSignleBadgeContext();

  const onSave = async () => {
    setShowPopup("unknown");
    setLoading(true);

    if (badge?.id && state.uid) {
      await firestore()
        .collection("users")
        .doc(state.uid)
        .update({
          [`recommendationConfig.badgeConfig.${badge.id}.start`]: todayUnix,
        });
      await makeGeneratorCall(state.uid, "workout", true, true, badge?.id);
    }

    setWarning(false);
  };

  const onClose = () => {
    setShowPopup("unknown");
    setWarning(false);
  };

  const onNext = () => {
    onClose();
    if (showPopup === "notification") {
      requestPermission();
    } else if (showPopup === "demo") {
      setWarning(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup((prev) => {
        if (
          res.currentStatus !== "SUBSCRIBED" &&
          startUnixDayStart &&
          todayUnix >= startUnixDayStart + 24 * 60 * 60 * 1000 &&
          prev === "unknown"
        ) {
          return "demo";
        }
        if (
          permissionStatus !== "granted" &&
          permissionStatus !== "unknown" &&
          prev === "unknown"
        ) {
          return "notification";
        }
        return "unknown";
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [res.currentStatus, permissionStatus, todayUnix, startUnixDayStart]);

  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={showPopup !== "unknown"}
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
            <View className="w-10 aspect-square">
              {showPopup === "notification" ? (
                <NotifyBell showDot={true} />
              ) : showPopup === "demo" ? (
                <SvgIcons iconType="retry" />
              ) : null}
            </View>
            {showPopup === "notification" ? (
              <Text className="flex-1 text-xs text-white px-2">
                Don't miss a workout. Enable notifications to get daily
                reminders and messages from your coach.
              </Text>
            ) : showPopup === "demo" ? (
              <View className="flex-1">
                <Text className="text-xs text-white font-semibold px-2">
                  Restart Demo Workout
                </Text>
                <Text className="text-xs text-white/70 px-2">
                  Want to try your 1 day Demo of your program again?
                </Text>
              </View>
            ) : null}
            <TouchableOpacity onPress={onNext}>
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/tr:w-80,c-maintain_ratio,fo-auto/Group_1489_oyalXDJF0.png?updatedAt=1680354499148",
                }}
                className="w-8 aspect-square"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ConfirmationModal
        onNext={onSave}
        visible={warning}
        onClose={onClose}
        text="Restarting the demo would remove your current Progress. Are you sure you wish to continue?"
        ctaProceed="Yes, for sure"
        ctaCancel="No Thanks"
        loading={loading}
      />
    </>
  );
};

export default BottomPopup;
