import { View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import {
  DailyIssuesList,
  DailyIssuesType,
  SelectedType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalLifeStyle } from "@screens/DailyLifeStyleStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { KeyboardAvoidingView } from "react-native";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DailyIssues = () => {
  useScreenTrack();
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, dailyIssuesDB, dailyIssuesTextDB } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      dailyIssuesDB: user?.dietForm?.dailyIssues,
      dailyIssuesTextDB: user?.dietForm?.dailyIssuesText,
    };
  }, shallow);

  const [selected, setSelected] = useState<SelectedType>();

  const [text, setText] = useState<string>();

  useEffect(() => {
    if (dailyIssuesDB) {
      setSelected(dailyIssuesDB);
    }
    if (dailyIssuesTextDB) {
      setText(dailyIssuesTextDB);
    }
  }, [dailyIssuesDB, dailyIssuesTextDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.dailyIssues`]: selected,
      [`dietForm.dailyIssuesText`]: text,
    });

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DietHistoryStart");
    }

    weEventTrack("dietFormIssues_clickNext", {});
  };

  const handleSelect = (type: DailyIssuesType) => {
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
              progress={5 / totalLifeStyle}
              heading="Daily Lifestyle"
            />
          }
          centerTitle={true}
        />

        <OnboardLifeStyle
          onNext={onProceed}
          heading="Do you suffer from any issues below?"
          text={text}
          setText={setText}
          showInput={true}
          disabled={false}
        >
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={true}
            className="flex-1 mt-10 mb-4"
          >
            {DailyIssuesList?.map(({ icon, text, type }) => (
              <CheckWithIcon
                key={icon}
                icon={icon}
                text={text}
                isSelected={selected?.[type] ? true : false}
                onPress={() => handleSelect(type)}
                isMultiSelect={true}
              />
            ))}
          </ScrollView>
        </OnboardLifeStyle>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DailyIssues;
