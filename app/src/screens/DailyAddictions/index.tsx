import { KeyboardAvoidingView, View, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import {
  DailyAddictionList,
  DailyAddictionType,
  SelectedType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalLifeStyle } from "@screens/DailyLifeStyleStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DailyAddictions = () => {
  useScreenTrack();
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, addictionDB, addictionTextDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      addictionDB: user?.dietForm?.addiction,
      addictionTextDB: user?.dietForm?.addictionText,
    };
  }, shallow);

  const [selected, setSelected] = useState<SelectedType>();

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (addictionDB) {
      setSelected(addictionDB);
    }
    if (addictionTextDB) {
      setText(addictionTextDB);
    }
  }, [addictionDB, addictionTextDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.addiction`]: selected,
      [`dietForm.addictionText`]: text,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DailyIssues", { isGoback: false });
    }

    weEventTrack("dietFormAddiction_clickProceed", {});
  };

  const handleSelect = (type: DailyAddictionType) => {
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
              progress={4 / totalLifeStyle}
              heading="Daily LifeStyle"
            />
          }
          centerTitle={true}
        />
        <OnboardLifeStyle
          onNext={onProceed}
          heading="Do you have consume any of the following?"
          text={text}
          setText={setText}
          disabled={false}
          showInput={true}
        >
          <>
            <View className="flex-1 pt-10">
              {DailyAddictionList?.map(({ icon, text, type }) => (
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

export default DailyAddictions;
