import { View, Text, TouchableOpacity } from "react-native";

import { encryptedHelp } from "@constants/imageKitURL";
import ImageWithURL from "@components/ImageWithURL";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";

const NeedAiHelp = () => {
  return (
    <View className="flex-1 aspect-[388/133]  bg-[#5E45C8] mx-4 rounded-xl ">
      <View className="relative w-full h-full py-4">
        <View className="flex flex-row items-center px-4">
          <Text
            className="text-white  text-sm flex-1 pl-4"
            style={{
              fontFamily: "Nunito-Bold",
            }}
          >
            Need Relief from Period Cramps Talk to our Ai Asa
          </Text>
        </View>
        <View className="flex w-full  flex-row pt-4 px-4">
          <View className="flex flex-row items-center px-4">
            <ImageWithURL
              source={{ uri: encryptedHelp }}
              className="w-2.5 h-3"
            />
            <Text
              className="text-[#00000099]   text-xs pl-1"
              style={{
                fontFamily: "Nunito-Regular",
              }}
            >
              Encrypted and Private chat
            </Text>
          </View>
          <TouchableOpacity className="bg-white flex flex-row items-center justify-around border rounded-xl border-[#5E45C8] w-2/5 mr-2">
            <Text
              className="text-[#5E45C8] text-center  py-1.5 flex-1"
              style={{
                fontFamily: "Nunito-Bold",
              }}
            >
              Start Chat
            </Text>
            <View className="w-1.5 h-2.5 mr-2">
              <ArrowIcon color="#5E45C8" direction="right" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-0 left-0 right-0 -z-10">
          <ImageWithURL
            className="w-full aspect-[333/92]"
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1605_2_exXTuKjCx.png?updatedAt=1681285249305",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default NeedAiHelp;
