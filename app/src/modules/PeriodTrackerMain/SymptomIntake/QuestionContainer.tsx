import ImageWithURL from "@components/ImageWithURL";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useSymptomIntakeStore } from "./store/SymptomIntakeStore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  ButtonInterface,
  questionResponse,
} from "@models/User/questionResponseInterface ";
import GradientText from "@components/GradientText";
import Buttons from "./Actions/Buttons";
import { periodPrompts } from "@models/User/User";
import Options from "./Actions/Options";
import clsx from "clsx";
import BlurBG from "@components/BlurBG";
import { symptomId } from "@models/User/symptoms";
import HideComp from "./HideComp";

const QuestionContainer: React.FC<
  questionResponse & {
    onClickResponse: (
      val: ButtonInterface,
      id: periodPrompts,
      symptopIdsArr?: symptomId[]
    ) => Promise<void>;
  }
> = ({
  id,
  viewStyle,
  question,
  themeColor,
  buttons,
  underlineButton,
  hidePresent,
  options,
  optionType,
  heroImage,
  onClickResponse,
}) => {
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const { symptomIds } = useSymptomIntakeStore();

  const handleClickResponse = async (targetBtn: ButtonInterface) => {
    await onClickResponse(
      targetBtn,
      id,
      optionType !== "noSelect" ? symptomIds : undefined
    );
  };

  return (
    <>
      <HideComp hidePresent={hidePresent} viewStyle={viewStyle} />

      <View
        className={clsx(
          "bg-white p-4 flex relative z-0 overflow-hidden",
          viewStyle === "bottomsheet" ? "rounded-t-3xl" : "rounded-xl mx-4"
        )}
        style={{
          paddingBottom: viewStyle === "bottomsheet" ? tabBarHeight + 16 : 16,
          marginBottom: viewStyle === "bottomsheet" ? 0 : tabBarHeight + 16,
        }}
      >
        <ImageWithURL
          className="absolute left-0 right-0 -z-10 aspect-[333/92]"
          style={{ bottom: viewStyle === "bottomsheet" ? tabBarHeight : 0 }}
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1605_2_exXTuKjCx.png?updatedAt=1681285249305",
          }}
        />

        {viewStyle === "bottomsheet" ? (
          <BlurBG
            style={StyleSheet.absoluteFill}
            blurAmount={10}
            fallbackColor="#FFFFFF"
            blurType="light"
          />
        ) : null}

        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: height * 0.68 }}
        >
          <GradientText
            text={question}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={
              themeColor === "red"
                ? ["#FF5858", "#FF5858"]
                : themeColor === "blue"
                ? ["#30B4DF", "#30B4DF"]
                : ["#7B2BFF", "#5B68FF", "#4F80FF"]
            }
            textStyle={{
              fontFamily: "Nunito-Bold",
              fontSize: 20,
              textAlign: "center",
            }}
          />

          {heroImage ? (
            <ImageWithURL
              source={{ uri: heroImage }}
              className="w-4/5 mx-auto aspect-[300/180]"
              resizeMode="contain"
            />
          ) : null}

          <Options options={options} optionType={optionType} />

          <Buttons
            buttons={buttons}
            onClickCta={handleClickResponse}
            filled={viewStyle === "bottomsheet"}
          />

          {underlineButton ? (
            <TouchableOpacity
              onPress={() => handleClickResponse(underlineButton)}
              className="mt-4"
            >
              <Text
                className="text-[#C84545] text-center"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {underlineButton.text}
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default QuestionContainer;
