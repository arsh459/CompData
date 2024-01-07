import Header from "@modules/Header";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import HelpBtn from "../../components/Buttons/HelpBtn";

const SubscriptionContentV2 = () => {
  return (
    <>
      <Header
        back={true}
        tone="dark"
        optionNode={<HelpBtn />}
        headerType="overlay"
      />
      <View className="flex-1 flex relative bg-black">
        <ImageBackground
          source={{
            uri: "https://ik.imagekit.io/socialboat/Screenshot_2022-07-25_at_2.01_1__1__BZFt09JHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658838777384",
          }}
          style={{
            flex: 1,
          }}
        />
        <View className="absolute left-0 right-0 bottom-0">
          {/* <ScrollView className="px-8 py-4">
            <View className=" flex justify-around flex-1">
            <Text className="text-[#FF5970] text-4xl py-11 font-semibold">
            Are you the Fittest Athlete?
            </Text>
            <Text className="text-[#F5F5F7] text-lg pb-8">
            Unlock all games for INR 999/month Win rewards upto{" "}
            <Text className="text-[#FF5970] text-xl"> INR 1,00,000</Text>
            </Text>
            <View className="flex flex-row items-center ">
            <Image
            source={{ uri: goldenCrown }}
            className="h-5 w-5"
            resizeMode="contain"
            />
            <Text className="text-[#f5f5f7] text-xl font-medium flex-1 pl-2">
            What will you get ?
            </Text>
            </View>
            </View>
          </ScrollView> */}
          <View className="flex justify-around p-4">
            <TouchableOpacity>
              <View className=" bg-[#FF556C] border rounded-full w-fit flex items-center justify-center ">
                <Text className=" text-sm py-3 px-10   text-white text-center w-fit">
                  Start Free & Subscribe Now!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default SubscriptionContentV2;
