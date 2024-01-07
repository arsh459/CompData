import {
  OptionInterface,
  optionTypes,
} from "@models/User/questionResponseInterface ";
import { symptomId } from "@models/User/symptoms";
import { View } from "react-native";
import { useSymptomIntakeStore } from "../../store/SymptomIntakeStore";
import Option from "./Option";

interface Props {
  options?: OptionInterface[];
  optionType?: optionTypes;
}

const Options: React.FC<Props> = ({ options, optionType }) => {
  const { symptomIds, setSymptomIds } = useSymptomIntakeStore();

  const handleMultiSelect = (id: symptomId) => {
    if (id === "no_symptom") {
      setSymptomIds([id]);
    } else {
      const remoteSymptomIds = symptomIds.filter(
        (each) => each !== "no_symptom"
      );
      const filterdRemoteSymptomIds = remoteSymptomIds.includes(id)
        ? remoteSymptomIds.filter((each) => each !== id)
        : [...remoteSymptomIds, id];

      setSymptomIds(filterdRemoteSymptomIds);
    }
  };

  const handleSingleSelect = (id: symptomId) => {
    setSymptomIds([id]);
  };

  return options?.length ? (
    <View
      className="flex"
      style={{
        flexDirection: optionType === "singleSelect" ? "column" : "row",
        flexWrap: optionType === "singleSelect" ? "nowrap" : "wrap",
      }}
    >
      {options.map((option, index) => (
        <Option
          key={option.text || `option-${index}`}
          option={option}
          optionType={optionType}
          isSelected={option.symptomId && symptomIds.includes(option.symptomId)}
          onPress={
            optionType === "singleSelect"
              ? handleSingleSelect
              : handleMultiSelect
          }
        />
      ))}
    </View>
  ) : null;
};

export default Options;
