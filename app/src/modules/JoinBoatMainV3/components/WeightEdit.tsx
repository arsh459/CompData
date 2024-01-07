import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Text } from "react-native";

interface Props {
  current: number;
  onChange: (val: number) => void;
  unit?: string;
  color?: string;
  target: "weight" | "desiredWeight";
}

const WeightEdit: React.FC<Props> = ({ current, onChange, unit, target }) => {
  // const [val, setVal] = useState(current.toString());
  const [val, setVal] = useState<string>(current.toFixed(1).toString());
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const handleValueChange = (textValue: string) => {
    if (isValidNumberInput(textValue)) {
      // console.log("in state", parseFloat(textValue));
      setVal(textValue);
      onChange(parseFloat(textValue));
    }
  };

  const isValidNumberInput = (textValue: string) => {
    const numericValue = parseFloat(textValue);

    return !isNaN(numericValue) || textValue === "";
  };

  return (
    <View className={clsx("flex justify-center items-center", "flex-row")}>
      <View className="bg-[#343150] w-1/3 aspect-[130/61] rounded-3xl  flex flex-row justify-center items-center my-2 py-2">
        <TextInput
          ref={textInputRef}
          autoFocus={true}
          className={clsx(
            target === "weight" ? "text-[#FBA16F]" : "text-[#FB6FE1]",
            " text-xl iphoneX:text-2xl"
          )}
          style={{ fontFamily: "Nunito-SemiBold" }}
          onChangeText={handleValueChange}
          value={val}
          // value={0.0}

          textAlign="center"
          keyboardType="numeric"
        />
      </View>
      <Text
        className="text-[#7872B4] text-base ml-2"
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {unit}
      </Text>
    </View>
  );
};

export default WeightEdit;
