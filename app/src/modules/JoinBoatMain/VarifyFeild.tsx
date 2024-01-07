// import TypeWritter from "@components/TypeWritter";
import { greenRightTic, yellowWarning } from "@constants/imageKitURL";
import clsx from "clsx";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";
// import { useUserKey } from "./hooks/useUserKey";
// import { generateFormattedKey } from "./utils/userKey";

interface Props {
  uid?: string;
  keyValue: string;
  lable: string;
  placeholder?: string;
  onKeyChange?: (newKey: string) => void;
  onNext: (val: string) => void;
  maxCharacterLength: number;
  words?: string[];
}

const VarifyFeild: React.FC<Props> = ({
  uid,
  keyValue,
  lable,
  placeholder,
  onKeyChange,
  onNext,
  maxCharacterLength,
  words,
}) => {
  // const { keyValid } = useUserKey(keyValue, uid ? uid : "");
  // const [text, seText] = useState<string>(keyValue ? keyValue : "");

  // useEffect(() => {
  //   keyValue ? seText(keyValue) : null;
  // }, [keyValue]);
  const charLeft = maxCharacterLength - keyValue.length;

  // const [charLeft, setCharLeft] = useState<number>(
  //   keyValue
  //     ? maxCharacterLength
  //       ? maxCharacterLength - keyValue.length
  //       : 14 - keyValue.length
  //     : maxCharacterLength
  //     ? maxCharacterLength
  //     : 14
  // );
  // const [clicked, setClicked] = useState<boolean>(false);
  const [hasFocus, setHasFocus] = useState<boolean>(false);

  // useEffect(() => {
  //   setClicked(false)
  // }, [lable]);

  const onKeyStroke = (newText: string) => {
    if (newText.length <= maxCharacterLength) {
      // const tmpText = generateFormattedKey(newText);

      // seText(tmpText);
      // setCharLeft(maxCharacterLength - newText.length);
      onKeyChange && onKeyChange(newText);
    }
  };

  const setFocusTrue = () => setHasFocus(true);
  const setFocusFalse = () => setHasFocus(false);

  return (
    <View className="flex-1 flex flex-col">
      <View className="flex-1 flex flex-col py-4">
        <View className="flex-1 flex flex-col border border-[#F5F5F7] rounded-lg relative z-0">
          <TextInput
            // defaultValue={keyValue}
            // defaultValue="mdkmdk"
            value={keyValue}
            onChangeText={onKeyStroke}
            onFocus={setFocusTrue}
            onBlur={setFocusFalse}
            placeholder={hasFocus ? placeholder : ""}
            style={{ textAlignVertical: "center" }}
            className="flex-1 p-4 text-[#F5F5F7] lowercase"
            placeholderTextColor="#FFFFFF80"
            autoCapitalize="none"
          />
          {/* <View
            className={clsx(
              "absolute top-0 bottom-0 left-4 flex justify-center items-center pointer-events-none z-0",
              (hasFocus || keyValue !== "") && "hidden"
            )}
          >
            <TypeWritter textArr={words ? words : []} textColor="#7E7E7E" />
          </View> */}
          <View
            className={clsx(
              !keyValue ? "opacity-0" : "",
              "absolute top-0 bottom-0 right-4 flex justify-center items-center pointer-events-none"
            )}
          >
            <Image
              source={{
                uri:
                  true && charLeft < maxCharacterLength
                    ? greenRightTic
                    : yellowWarning,
              }}
              className="w-4 iphoneX:w-5 h-4 iphoneX:h-5"
              resizeMode="contain"
            />
          </View>
        </View>
        <Text className="text-[#F5F8FF] text-xs iphoneX:text-sm font-light p-2">
          {uid
            ? !keyValue
              ? "Enter your unique handle. No spaces allowed"
              : true
              ? `This is valid! ${charLeft} characters left.`
              : "This handle already exists. Please try something else"
            : `${charLeft} characters left. No spaces allowed`}
        </Text>
      </View>
      <Pressable
        className={clsx(
          "m-4 border border-[#FF93A2] rounded-lg self-end w-max px-8 py-2",
          uid
            ? true && keyValue
              ? ""
              : "opacity-0"
            : charLeft === maxCharacterLength
            ? "opacity-0"
            : "",
          !true ? "bg-[#7D2834]" : "bg-[#FF556C]"
        )}
        onPress={() => {
          onNext(keyValue);
          // setClicked(true);
        }}
      >
        <Text className="font-medium text-white text-base iphoneX:text-xl text-center">
          Next
        </Text>
      </Pressable>
    </View>
  );
};

export default VarifyFeild;
