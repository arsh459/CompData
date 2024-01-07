import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import { FoodTimeList, updateUserField } from "@modules/LifeStyleMain/utils";
import FoodTimePicker from "@modules/LifeStyleMain/FoodTimePicker";
import ImageWithURL from "@components/ImageWithURL";
import { editLogoBlack } from "@constants/imageKitURL";
import clsx from "clsx";
import { format, getTime } from "date-fns";
import SvgIcons from "@components/SvgIcons";
import DateTimePickerModal from "@modules/WorkoutOnboardingMain/DateTimePickerModal";
import { onDietFormFilledDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDietHistory } from "@screens/DietHistoryStart";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavStore } from "@providers/nav/navStore";
import { MealTypesDietForm } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const SelectFoodTimings = () => {
  useScreenTrack();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, dietFormFilled, foodTimingsDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      nutritionBadgeId: user?.nutritionBadgeId,
      dietFormFilled: user?.flags?.dietFormFilled,
      foodTimingsDB: user?.dietForm?.foodTimings,
    };
  }, shallow);

  const [selected, setSelected] =
    useState<Partial<Record<MealTypesDietForm, number>>>();

  useEffect(() => {
    if (foodTimingsDB) {
      setSelected(foodTimingsDB);
    }
  }, [foodTimingsDB]);

  const curr = new Date();
  const navigation = useNavigation();
  const [selecteTime, setTime] = useState(curr);

  const formStatus = useNavStore((state) => state.formStatus);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.foodTimings`]: selected,
    });

    if (!dietFormFilled) {
      onDietFormFilledDone(uid);
    }
    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      if (formStatus === "DIET_DOC" || formStatus === "DOC_ONLY") {
        navigation.navigate("MedicalProfileScreen");
      } else {
        // navigation.dispatch((state) => {
        //   const routes = state.routes.filter(
        //     (r) => r.name === "Home" || r.name === "NutritionScreen"
        //   );
        //   routes.push({
        //     key: `Home-${Math.round(Math.random() * 1000)}`,
        //     name: "Home",
        //   });

        //   return CommonActions.reset({
        //     ...state,
        //     routes,
        //     index: routes.length - 1,
        //   });
        // });

        navigation.navigate("BookAppointmentSlotScreen", {
          category: "nutrtitionist",
        });
      }
    }

    weEventTrack("dietFormMealTimings_clickProceed", {});
  };

  const handleTimeChange = (date: Date, type: MealTypesDietForm) => {
    const unixTimestamp = getTime(date);
    setTime(date);
    setSelected((prevSelected) => ({
      ...prevSelected,
      [type]: unixTimestamp,
    }));
  };

  return (
    <View className="flex-1 bg-[#232136]">
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={5 / totalDietHistory}
            heading="Diet Preferences"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="What are the timings for the meals?"
      >
        <View className="flex-1 pt-10 relative z-0">
          {FoodTimeList.map((item) => {
            const typeTime = selected && selected[item.type];
            return (
              <FoodTimePicker
                key={item.type}
                icon={item.icon}
                text={item.text}
                color={item.color}
                color2={item.timeColor}
                time={selecteTime}
                timeExist={!!typeTime}
              >
                <DateTimePickerModal
                  value={selecteTime}
                  onChange={(date) => handleTimeChange(date, item.type)}
                  mode="time"
                  containerColor="bg-[] "
                  textToShow={`select your ${item.type} time`}
                >
                  {!!typeTime ? (
                    <View
                      className="flex items-center flex-row px-2 py-1 rounded-lg"
                      style={{
                        backgroundColor: item.timeColor
                          ? item.timeColor
                          : undefined,
                      }}
                    >
                      {item.icon ? (
                        <ImageWithURL
                          source={{ uri: editLogoBlack }}
                          className="w-4 aspect-square"
                        />
                      ) : null}
                      <Text
                        className={clsx("text-lg  pl-1", "text-[#232136]")}
                        style={{ fontFamily: "Nunito-SemiBold" }}
                      >
                        {format(typeTime, "h:mm a")}
                      </Text>
                    </View>
                  ) : (
                    <View className="w-4 aspect-square ">
                      <SvgIcons iconType="plus" color="#343150" />
                    </View>
                  )}
                </DateTimePickerModal>
              </FoodTimePicker>
            );
          })}
        </View>
      </OnboardLifeStyle>
    </View>
  );
};

export default SelectFoodTimings;
