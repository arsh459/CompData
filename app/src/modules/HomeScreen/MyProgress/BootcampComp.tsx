import { Text, TouchableOpacity, View } from "react-native";

import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { getTextForBootcamp } from "./utils";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useBootcampContext } from "@providers/bootcamp/BootcampProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

const BootcampComp = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { subStatus } = useSubscriptionContext();
  const { loading, bootcampStatus, bootcamp } = useBootcampContext();

  // bootcamp did not start or UNKNOWN
  if (
    bootcampStatus === "INVITE_EXPIRED" ||
    bootcampStatus === "UNKNOWN" ||
    !bootcamp
  ) {
    return null;
  }

  const handleNavigation = () => {
    if (bootcampStatus === "INVITED" || bootcampStatus === "ONGOING_INVITED") {
      navigation.navigate("BootCamp", {
        id: user?.bootcampDetails?.bootcampId
          ? user?.bootcampDetails?.bootcampId
          : "",
      });
    } else if (
      bootcampStatus === "FINISHED" ||
      bootcampStatus === "ONGOING_JOINED" ||
      bootcampStatus === "FUTURE"
    ) {
      navigation.navigate("BootCampDetail", {
        id: user?.bootcampDetails?.bootcampId
          ? user?.bootcampDetails?.bootcampId
          : "",
      });
    }
  };

  const text = getTextForBootcamp(
    bootcampStatus,
    bootcamp?.start,
    bootcamp?.length
  );

  return (
    <>
      {subStatus !== "SUBSCRIBED" &&
      user?.bootcampDetails?.bootcampId &&
      !loading ? (
        <TouchableOpacity
          className="flex flex-row justify-between items-center mx-4 my-2"
          onPress={handleNavigation}
        >
          <Text
            numberOfLines={1}
            className="flex-1 text-sm text-[#232136]"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {text}
          </Text>
          <View className="w-5 aspect-square bg-black/10 rounded-full p-[5px]">
            <ArrowIcon direction="right" color="#000000" />
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default BootcampComp;
