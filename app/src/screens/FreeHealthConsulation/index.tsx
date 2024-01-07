import "react-native-get-random-values";
import ImageWithURL from "@components/ImageWithURL";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import ThingsToWorkOn from "@modules/JoinBoatMainV3/components/ThingsToWorkOn";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const FreeHealthConsulation = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const onBookSlot = () => {
    navigation.navigate("BookZohoSlot", {
      category: "sales",
      nextScreen: "AppointmentBookedScreen",
      nextScreenDoneNav: "HOME",
    });
    weEventTrack("slot_request", { source: "freeConsultationHome" });
    weEventTrack("FreeHealthConsulation_bookZohoSlot", { category: "sales" });
  };

  return (
    <View className="flex-1 bg-[#232136] relative z-0">
      <Header back={true} tone="dark" headerType="transparent" />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View className="h-20" />

        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group%201000001024_AezDZoiVJ.png?updatedAt=1690458236944",
          }}
          className="w-2/3 aspect-square mx-auto"
          resizeMode="contain"
        />
        <Text
          className="text-[#B4FF39] text-xl iphoneX:text-3xl m-6 iphoneX:m-8"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Get a FREE Health Consultation!
        </Text>

        <View className="px-4">
          <ThingsToWorkOn bgColor="#343150" textColor="#FFFFFF" />
        </View>

        <View className="h-36" style={{ paddingBottom: bottom || 16 }} />
      </ScrollView>

      <LinearGradient
        colors={["transparent", "#232136", "#232136"]}
        className="absolute left-0 right-0 bottom-0 px-4"
        style={{ paddingBottom: bottom || 16 }}
      >
        <StartButton
          onPress={onBookSlot}
          bgColor="bg-[#6D55D1] p-3"
          title="Book my slot"
          textColor="text-white"
          textStyle="text-center text-base iphoneX:text-lg"
          roundedStr="rounded-2xl bg-white"
          fontFamily="Nunito-Bold"
        />

        <Text
          className="text-white/40 text-xs iphoneX:text-base text-center mx-4 mt-4"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          To know more, get on a quick{" "}
          <Text className="text-[#51FF8C]">5 minute call</Text>
        </Text>
      </LinearGradient>
    </View>
  );
};

export default FreeHealthConsulation;
