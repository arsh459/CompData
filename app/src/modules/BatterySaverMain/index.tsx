import ImageWithURL from "@components/ImageWithURL";
import Swiper from "@components/Swiper";

import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { samsung } from "./utils";
import useBatterySaverStatus from "@hooks/notification/useBatterySaverStatus";

const BatterySaverMain = () => {
  const { height: Height } = useWindowDimensions();
  const { promptDisableBatteryOptimization } = useBatterySaverStatus();
  return (
    <View className="flex-1">
      <Text
        className="text-white text-xl iphoneX:text-2xl text-center"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        👀 Steps to follow to enable
      </Text>
      <View className=" mt-5" style={{ height: Height * 0.65 }}>
        <Swiper
          slideWidth={(Height * 0.65 - 64) * 0.45}
          spaceBetween={8}
          marginX={16}
          pagination={true}
          dotHeight={8}
          dotWidth={25}
          dotColor="#fff"
          activeDotWidth={8}
        >
          {samsung.map((item, index) => (
            <View className="w-full h-full  " key={item}>
              <ImageWithURL
                className="flex-1 "
                resizeMode="contain"
                source={{
                  uri: item,
                }}
                // style={{ borderRadius: 22 }}
              />
              <Text
                className="text-white py-4 text-sm text-center"
                style={{ fontFamily: "Nunito-Medium" }}
              >
                Step {index + 1}
              </Text>
            </View>
          ))}
        </Swiper>
      </View>

      <View className=" w-full flex-1 flex justify-center">
        <TouchableOpacity
          onPress={() => promptDisableBatteryOptimization()}
          className="w-4/5 mx-auto  bg-[#6D55D1] rounded-xl py-3"
        >
          <Text
            className="text-sm iphoneX:text-base text-center text-white px-2"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Go To Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BatterySaverMain;
