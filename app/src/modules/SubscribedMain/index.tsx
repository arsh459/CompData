import { waBaseLink } from "@constants/links";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { listCard } from "@modules/ProScreenMain/utils";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import { View, Text, Image, Linking, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BodtTypeShocase from "./BodtTypeShocase";
import FeatureListCard from "./FeatureListCard";
import NonBodyTypeShowcase from "./NonBodyTypeShowcase";
import { getFitnessGoal } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  paddingBottom?: number;
}

const SubscribedMain: React.FC<Props> = ({ paddingBottom }) => {
  const { top } = useSafeAreaInsets();
  const { res } = useSubscriptionContext();

  const goal = useUserStore(
    ({ user }) => getFitnessGoal(user?.fitnessGoal),
    shallow
  );

  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to start my free consultation")}`
    );

    weEventTrack("upgrade_clickTalkToHealthCoach", {});
  };

  return (
    <>
      <View className="flex-1 relative overflow-hidden">
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Without_tick_mark_kUn7QQLbN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674215383714",
          }}
          className="absolute left-0 right-0 top-0 bottom-0"
        />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: top }}
          className="m-4"
        >
          {goal !== "lose_weight" ? (
            <NonBodyTypeShowcase styleStr="my-4" />
          ) : null}
          <View className="rounded-2xl flex-1 bg-[#100F1A]/70">
            {goal === "lose_weight" ? (
              <BodtTypeShocase
                aspectRatio={1.35}
                textBGColor="#FFFFFF26"
                textColor="#FFFFFF"
                textPosition={{ x: 0, y: 12 }}
              />
            ) : null}
            <View className="p-4 flex flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-white text-base">Congratulations!</Text>
                <Text className="text-white/60 text-sm font-light py-2 leading-4">
                  {`Your Pro year plan is now ready. Welcome aboard to SocialBoat!`}
                </Text>
                {res.msLeft !== -1 ? (
                  <Text className="text-white/60 text-xs font-bold">
                    {`Valid Till ${format(Date.now() + res.msLeft, "do LLLL")}`}
                  </Text>
                ) : null}
              </View>
              <View className="w-4 aspect-square" />
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Component_2__11__OrwQtXEbHj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674217869453",
                }}
                className="w-20 aspect-square"
                resizeMode="contain"
              />
            </View>
            <Text className="text-white text-lg font-bold p-4">
              My Benefits
            </Text>
            {listCard.map((plan, index) => (
              <FeatureListCard
                featureList={plan}
                key={`${plan.heading}-${index}`}
              />
            ))}
            <View style={{ height: (paddingBottom ? paddingBottom : 0) * 2 }} />
          </View>
        </ScrollView>
      </View>
      <View
        className="absolute left-0 right-0 flex justify-center px-8 py-4"
        style={{
          bottom: paddingBottom,
        }}
      >
        <StartButton
          title="Book FREE Health Consultation"
          bgColor="bg-white z-10"
          textColor="text-[#100F1A]"
          roundedStr="rounded-full"
          textStyle="py-3 text-center text-base"
          onPress={openWhatsApp}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </>
  );
};

export default SubscribedMain;
