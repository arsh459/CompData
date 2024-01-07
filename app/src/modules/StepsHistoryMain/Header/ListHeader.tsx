import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useWorkoutTask } from "@hooks/program/useWorkoutTask";

import { useConfigContext } from "@providers/Config/ConfigProvider";

import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { getStepsConversion } from "../utils";

const ListHeader = ({}) => {
  const { width } = useWindowDimensions();

  const { config } = useConfigContext();

  const { task } = useWorkoutTask(config?.stepTaskId);
  const { fp, steps } = getStepsConversion(task);

  const { openFit } = useStepsPermissionContext();

  return (
    <>
      <View className="relative flex-1">
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio/Component_58_iNgWPVDr-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668089968847",
          }}
          style={{
            width: width,
            height: width / 2,
          }}
        />
        <View className="absolute left-0 right-0 bottom-1/4 flex justify-center items-center">
          <Text
            className="text-[#FFFFFF] text-xl iphoneX:text-xl "
            style={{
              fontFamily: "BaiJamjuree-Bold",
            }}
          >
            {steps} STEPS = {fp} FP
          </Text>
          {Platform.OS === "ios" ? (
            <Text
              className="text-[#FFFFFF] opacity-90 text-xs"
              style={{
                fontFamily: "BaiJamjuree-light",
              }}
            >
              Steps update may take 5 minutes
            </Text>
          ) : (
            <View className="flex flex-row">
              <TouchableOpacity onPress={openFit} className="pl-1">
                <Text
                  className="text-[#FFFFFF] underline opacity-90 text-xs"
                  style={{
                    fontFamily: "BaiJamjuree-Medium",
                  }}
                >
                  Open GoogleFit
                </Text>
              </TouchableOpacity>
              <Text
                className="text-[#FFFFFF] pl-1 opacity-90 text-xs"
                style={{
                  fontFamily: "BaiJamjuree-light",
                }}
              >
                to check sync
              </Text>
            </View>
          )}
        </View>

        {/* <Button onPress={onGoogleSignOut} title="HIII"></Button> */}
        <View className="flex ">
          <Text
            className="text-[#A5F4FF] text-xl iphoneX:text-xl p-4 pb-0"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Steps History
          </Text>
        </View>
        {/* {Platform.OS === "android" ? (
          <View className="">
            <Text className="text-white">Steps are synced?</Text>
            <Text className="text-white">
              Open GoogleFit on your phone, to ensure your GoogleFit is synced
            </Text>
          </View>
        ) : null} */}
      </View>
    </>
  );
};

export default ListHeader;
