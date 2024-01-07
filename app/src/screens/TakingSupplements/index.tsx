import { View, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import {
  SelectedType,
  SupplementsList,
  SupplementsType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDailyFocus } from "@screens/DailyFocusStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { KeyboardAvoidingView } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const TakingSupplements = () => {
  useScreenTrack();
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, medicationDB, medicationTextDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      medicationDB: user?.dietForm?.medication,
      medicationTextDB: user?.dietForm?.medicationText,
    };
  }, shallow);

  const [selected, setSelected] = useState<SelectedType>();

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (medicationDB) {
      setSelected(medicationDB);
    }
    if (medicationTextDB) {
      setText(medicationTextDB);
    }
  }, [medicationDB, medicationTextDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.medication`]: selected,
      [`dietForm.medicationText`]: text,
    });
    weEventTrack("dietFormSupplements_clickNext", {});
    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("UploadReports", { isGoback: false });
    }
  };

  const handleSelect = (type: SupplementsType) => {
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
      className="bg-[#232136] flex-1"
    >
      <View className="flex-1 bg-[#232136]">
        <Header
          back={true}
          headerColor="#232136"
          tone="dark"
          titleNode={
            <DietFormOptionNode
              progress={4 / totalDailyFocus}
              heading="Daily Focus"
            />
          }
          centerTitle={true}
        />
        <OnboardLifeStyle
          onNext={onProceed}
          heading="Are you taking any supplements or medication ?"
          text={text}
          disabled={false}
          setText={setText}
          showInput={true}
        >
          <View className="flex-[.5] pt-10">
            {SupplementsList?.map(({ text, type }) => (
              <CheckWithIcon
                key={type}
                icon=""
                text={text}
                isSelected={selected && selected[type] ? true : false}
                onPress={() => handleSelect(type)}
                isMultiSelect={true}
              />
            ))}
          </View>
        </OnboardLifeStyle>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TakingSupplements;
