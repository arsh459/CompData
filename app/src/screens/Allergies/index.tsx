import { KeyboardAvoidingView, View, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import {
  AllergyList,
  AllergyType,
  SelectedType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDietHistory } from "@screens/DietHistoryStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const Allergies = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, allergiesDB, allergiesTextDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      allergiesDB: user?.dietForm?.allergies,
      allergiesTextDB: user?.dietForm?.allergiesText,
    };
  }, shallow);

  const [selected, setSelected] = useState<SelectedType>();

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (allergiesDB) {
      setSelected(allergiesDB);
    }
    if (allergiesTextDB) {
      setText(allergiesTextDB);
    }
  }, [allergiesDB, allergiesTextDB]);

  const onProceed: () => void = async () => {
    await updateUserField(uid, {
      [`dietForm.allergies`]: selected,
      [`dietForm.allergiesText`]: text,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("SelectFoodItems", { isGoback: false });
    }

    weEventTrack("dietFormFoodAllergies_clickProceed", {});
  };

  const handleSelect = (type: AllergyType) => {
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
              progress={3 / totalDietHistory}
              heading="Diet Preferences"
            />
          }
          centerTitle={true}
        />
        <OnboardLifeStyle
          onNext={onProceed}
          heading="Do you have any food allergies?"
          text={text}
          setText={setText}
          showInput={true}
          disabled={false}
        >
          <>
            <View className="flex-1 pt-10">
              {AllergyList?.map(({ icon, text, type }) => (
                <CheckWithIcon
                  key={icon}
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

export default Allergies;
