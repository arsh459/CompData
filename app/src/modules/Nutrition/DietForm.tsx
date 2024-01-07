import ImageWithURL from "@components/ImageWithURL";
import { dietFormIcon, longArrowDownIcon } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";

const DietForm = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="w-full flex flex-1  mx-auto p-4"
      >
        <ImageWithURL
          className="  aspect-[218/212] mx-auto my-4"
          source={{ uri: dietFormIcon }}
          style={{ width: width * 0.56 }}
        />
        <View className="">
          <Text
            className="text-white text-2xl py-2"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Start your Health Journey by filling the Diet form
          </Text>
          <Text
            className="text-white text-xs pb-2 "
            style={{ fontFamily: "Nunito-Light" }}
          >
            Get your personalised nutrition plan to help you achieve your goal
            faster
          </Text>
        </View>
        <ImageWithURL
          className=" p-5 aspect-[156/156] mx-auto "
          source={{ uri: longArrowDownIcon }}
          style={{ width: width * 0.45 }}
        />
      </ScrollView>
      <View className="w-full pb-4 ">
        <StartButton
          title={"Fill The Form"}
          bgColor="bg-[#6D55D1] mx-4"
          textColor="text-white "
          roundedStr="rounded-2xl"
          textStyle="py-4 text-center text-sm iphoneX:text-base "
          fontFamily="Nunito-Bold"
          onPress={() => navigation.navigate("ReminderScreen")}
        />
      </View>
    </>
  );
};

export default DietForm;
