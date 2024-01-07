import ImageWithURL from "@components/ImageWithURL";
import { Bootcamp } from "@models/BootCamp";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Hero from "./Hero";
import Includes from "./Includes";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";
import { startBootcamp } from "./utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useState } from "react";
import LoadingV2 from "@components/loading/V2";
import UseModal from "@components/UseModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  bootcamp: Bootcamp;
  start: number;
  end: number;
}

const BootCampMain: React.FC<Props> = ({ bootcamp, start, end }) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { state } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (state.uid) {
      setLoading(true);
      await startBootcamp(
        state.uid,
        bootcamp.id,
        bootcamp.badgeId,
        bootcamp.nutritionBadgeId,
        bootcamp.start
      );
      setLoading(false);
      navigation.navigate("Home");

      weEventTrack("bootcamp_clickStart", {});
    }
  };

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerType="transparent"
        optionNode={
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="flex flex-row items-center rounded-full bg-white backdrop-blur-3xl px-4 py-1"
          >
            <Text className="text-[#1C1C1C] text-sm font-medium">Skip</Text>
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237",
              }}
              className="w-3 aspect-1 ml-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-4"
        snapToAlignment="center"
      >
        <View className="py-24">
          <Hero bootcamp={bootcamp} start={start} end={end} />
          <Includes bootcamp={bootcamp} />
          <Testimonial />
          <FAQ />
        </View>
      </ScrollView>

      <LinearGradient
        colors={["#E77DFD00", "#E77DFD"]}
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ paddingBottom: bottom || 16 }}
      >
        <TouchableOpacity
          onPress={handleStart}
          className="bg-[#C5FF49] rounded-2xl p-4"
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <Text
            className="text-center text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Start Bootcamp
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <UseModal
        visible={loading}
        onClose={() => {}}
        width="w-full"
        height="h-full"
        tone="dark"
        blurAmount={20}
        fallbackColor="#13121EE5"
      >
        <View className="flex-1 flex justify-center items-center">
          <LoadingV2 size={180} />
          <Text className="text-base text-[#F1EAFF]/50 my-4">
            Generating your bootcamp
          </Text>
        </View>
      </UseModal>
    </>
  );
};

export default BootCampMain;
