import { KeyboardAvoidingView, View, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import {
  DietPrefrenceList,
  DietPrefrenceType,
  SelectedType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDietHistory } from "@screens/DietHistoryStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { cusinePrefDisabled } from "@screens/CuisinePreference";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DietPreference = () => {
  useScreenTrack();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, dietPreferenceDB, dietPreferenceTextDB } = useUserStore(
    ({ user }) => {
      return {
        uid: user?.uid,
        dietPreferenceDB: user?.dietForm?.dietPreference,
        dietPreferenceTextDB: user?.dietForm?.dietPreferenceText,
      };
    },
    shallow
  );

  const [selected, setSelected] = useState<SelectedType>();

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (dietPreferenceDB) {
      setSelected(dietPreferenceDB);
    }
    if (dietPreferenceTextDB) {
      setText(dietPreferenceTextDB);
    }
  }, [dietPreferenceDB, dietPreferenceTextDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.dietPreference`]: selected,
      [`dietForm.dietPreferenceText`]: text,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("CuisinePreference", { isGoback: false });
    }

    weEventTrack("dietFormDietPreference_clickProceed", {});
  };

  const handleSelect = (type: DietPrefrenceType) => {
    setSelected((prevSelected) => {
      if (!prevSelected) {
        return { [type]: true };
      }

      return { ...prevSelected, [type]: !prevSelected[type] };
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={"position"}
      contentContainerStyle={{ width, height }}
      className="flex-1 bg-[#232136]"
    >
      <View className="flex-1 bg-[#232136]">
        <Header
          back={true}
          headerColor="#232136"
          tone="dark"
          titleNode={
            <DietFormOptionNode
              progress={1 / totalDietHistory}
              heading="Diet Preferences"
            />
          }
          centerTitle={true}
        />
        <OnboardLifeStyle
          onNext={onProceed}
          heading="Please tell about your preference?"
          textStyleTw="text-xl text-center"
          text={text}
          setText={setText}
          showInput={true}
          disabled={cusinePrefDisabled(selected, text)}
        >
          <>
            <View className="flex-1 pt-10">
              {DietPrefrenceList?.map(({ icon, text, type }) => (
                <CheckWithIcon
                  key={type}
                  icon={icon}
                  text={text}
                  isSelected={selected?.[type] ? true : false}
                  onPress={() => handleSelect(type)}
                  isMultiSelect={true}
                />
              ))}
            </View>
          </>
        </OnboardLifeStyle>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DietPreference;
