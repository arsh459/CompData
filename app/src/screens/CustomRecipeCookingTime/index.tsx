import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useCustomRecipe, {
  cookingTime,
} from "@providers/customRecipe/useCustomRecipe";

import CustomRecipeHeader from "@components/CustomRecipeHeader/CustomRecipeHeader";
import CustomRecipeButton from "@screens/RecipeeDetailScreen/CustomRecipeButton";
import { iconTypes } from "@components/SvgIcons";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import CookingTimeComp from "@modules/CustomCookingTime/CookingTimeComponent";
import PageDescriptionComp from "@modules/CustomCookingTime/PageDescriptionComponent";
import { shallow } from "zustand/shallow";
import { useGPTPrompt } from "@hooks/gptPrompts/useGptPrompt";
import { useConfigContext } from "@providers/Config/ConfigProvider";

export interface showCookingData {
  title: string;
  iconType: iconTypes;
}

const data: cookingTime[] = ["5_minutes", "15_minutes", "30_minutes"];
const showData: showCookingData[] = [
  { title: "I only have 5 mins", iconType: "Minute5" },
  { title: "I can spare 15 mins", iconType: "Minute15" },
  { title: "I have more than 30 mins", iconType: "Minute30" },
];

const CustomRecipeCookingTime = () => {
  const { generateRecipe } = useCustomRecipe(
    (state) => ({
      generateRecipe: state.generateRecipe,
    }),
    shallow
  );
  const { config } = useConfigContext();
  const { gptPrompt } = useGPTPrompt("customRecipeGeneration");
  const navigation = useNavigation();
  useScreenTrack();

  function navigationOnNext() {
    if (config?.apiKey && gptPrompt) {
      generateRecipe(config?.apiKey, gptPrompt);
    }
    weEventTrack("CustomRecipeCookingTime_Next", {});
    navigation.navigate("CustomRecipeLoadingScreen");
  }

  return (
    <>
      <CustomRecipeHeader
        title="Customize this recipe"
        progress={0.66}
        color="#FF5970"
        iconType="CustomRecipe"
      />

      <View className="">
        <View className="h-full w-full bg-[#232136] px-2">
          {/* page description */}
          <PageDescriptionComp title="Choose how much time that recipe will take ⏳ " />

          {/* Ingredients list */}
          <ScrollView className="px-4 mt-8">
            {showData.map((item: showCookingData, index: number) => {
              return (
                <CookingTimeComp
                  key={item.title}
                  data={data}
                  index={index}
                  item={item}
                />
              );
            })}
          </ScrollView>
          {/* Next button */}
          <View className="">
            <View className="rounded-t-[18px] ">
              <CustomRecipeButton
                isIconSvg={false}
                iconType="CustomRecipe"
                onPress={navigationOnNext}
                text="Next"
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CustomRecipeCookingTime;
