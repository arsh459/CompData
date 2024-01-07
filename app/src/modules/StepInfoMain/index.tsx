import Header from "@modules/Header";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity } from "react-native";

const TextArr = [
  "Open the GoogleFit app and refresh. Sometimes GoogleFit sync might be delayed by the smartphone",
  "Ensure you're logged in to GoogleFit on your device",
  "Ensure you're logged in with the same GoogleFit account on SocialBoat. - Currently logged in with - _email_",
  "If you have a smartwatch, connect it to GoogleFit",
  "You earn 1 FP for every 1000 steps, So 4274 steps = 4FP",
];

const StepInfoMain = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { onGoogleSignOut } = useStepsPermissionContext();

  const handleEmailPress = async () => {
    await onGoogleSignOut();
    navigation.goBack();
  };

  return (
    <LinearGradient colors={["#02A7A5", "#286C9A"]} className="flex-1">
      <Header back={true} tone="dark" headerType="transparent" />
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Component_91_zc7d3x-brD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671189500964",
        }}
        className="w-full aspect-[2] mb-4"
      />
      <Text className="text-white text-lg iphoneX:text-xl font-bold p-4">
        Why my steps are not visible?
      </Text>
      <View className="flex-[0.9] flex justify-between p-4">
        {TextArr.map((each, index) => (
          <Text
            key={each}
            className="text-white text-base iphoneX:text-lg font-light"
          >
            {index + 1}. {each.replace("_email_", "")}
            {each.endsWith("_email_") ? (
              <TouchableOpacity
                className="flex flex-row"
                onPress={handleEmailPress}
              >
                <Text className="text-white text-base iphoneX:text-lg font-bold underline">
                  {user?.googleFit?.user?.email}
                </Text>
                <Text className="text-white text-base iphoneX:text-lg font-medium pl-1">
                  (Change)
                </Text>
              </TouchableOpacity>
            ) : null}
          </Text>
        ))}
      </View>
    </LinearGradient>
  );
};

export default StepInfoMain;
