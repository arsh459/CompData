import { KeyboardAvoidingView, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import {
  FamilyHistoryIssuesList,
  FamilyHistoryIssuesType,
  SelectedType,
  updateUserField,
} from "@modules/LifeStyleMain/utils";
import CheckWithIcon from "@modules/LifeStyleMain/CheckWithIcon";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDailyFocus } from "@screens/DailyFocusStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useWindowDimensions } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const FamilyHistory = () => {
  useScreenTrack();
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as GoBackParams;

  const { uid, familyHistoryDB, familyHistoryTextDB } = useUserStore(
    ({ user }) => {
      return {
        uid: user?.uid,
        familyHistoryDB: user?.dietForm?.familyHistory,
        familyHistoryTextDB: user?.dietForm?.familyHistoryText,
      };
    },
    shallow
  );

  const [selected, setSelected] = useState<SelectedType>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    if (familyHistoryDB) {
      setSelected(familyHistoryDB);
    }
    if (familyHistoryTextDB) {
      setText(familyHistoryTextDB);
    }
  }, [familyHistoryDB, familyHistoryTextDB]);

  const onProceed = async () => {
    await updateUserField(uid, {
      [`dietForm.familyHistory`]: selected,
      [`dietForm.familyHistoryText`]: text,
    });

    weEventTrack("dietFormFamilyHistory_clickNext", {});
    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("DailyWorkHours", { isGoback: false });
    }
  };

  const handleSelect = (type: FamilyHistoryIssuesType) => {
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
              progress={2 / totalDailyFocus}
              heading="Daily Focus"
            />
          }
          centerTitle={true}
        />
        <OnboardLifeStyle
          onNext={onProceed}
          disabled={false}
          heading="Do you have any family history of any of the below options"
          text={text}
          setText={setText}
          showInput={true}
        >
          <View className="flex-1 pt-10">
            {FamilyHistoryIssuesList?.map(({ text, type }) => (
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

export default FamilyHistory;
