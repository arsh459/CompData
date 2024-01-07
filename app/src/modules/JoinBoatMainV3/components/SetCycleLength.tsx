import clsx from "clsx";
import { View } from "react-native";
import OptionBox, { optionType } from "./OptionBox";
import { cycleLengthTyps } from "@models/User/User";

const constraints: {
  [key in cycleLengthTyps]: { color: string; value: number };
} = {
  "21_less": { color: "#81FF76", value: 15 },
  "21_35": { color: "#81FF76", value: 28 },
  "35_45": { color: "#FFE976", value: 40 },
  "45_60": { color: "#FF7676", value: 50 },
  "60_more": { color: "#FF0000", value: 65 },
};

const options: optionType[] = [
  { key: "21_35", text: "21 - 35 days" },
  { key: "35_45", text: "35 - 45 days" },
  { key: "45_60", text: "35 - 45 days" },
  { key: "60_more", text: "More than 2 months" },
];

interface Props {
  target: number;
  onChange: (val: number) => void;
}

const SetCycleLength: React.FC<Props> = ({ target, onChange }) => {
  const targetCycleLengthType = getCycleLengthTyps(target);

  return (
    <View className="flex p-4">
      {options.map((option, index) => (
        <View
          key={option.key}
          className={clsx(index !== options.length - 1 && "mb-4")}
        >
          <OptionBox
            option={option}
            onPress={() =>
              onChange(constraints[option.key as cycleLengthTyps].value)
            }
            isSelected={
              targetCycleLengthType === (option.key as cycleLengthTyps)
            }
          >
            <View
              className="w-3 aspect-[1/3] rounded-full"
              style={{
                backgroundColor:
                  constraints[option.key as cycleLengthTyps].color,
              }}
            />
          </OptionBox>
        </View>
      ))}
    </View>
  );
};

export default SetCycleLength;

const getCycleLengthTyps = (target: number): cycleLengthTyps => {
  if (target < 21) {
    return "21_less";
  } else if (target >= 21 && target <= 35) {
    return "21_35";
  } else if (target > 35 && target <= 45) {
    return "35_45";
  } else if (target > 45 && target <= 60) {
    return "45_60";
  } else {
    return "60_more";
  }
};
