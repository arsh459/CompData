import BlurBG from "@components/BlurBG";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Animated, KeyboardType, Text, TextInput, View } from "react-native";

interface Props {
  text?: string;
  onChange?: (val: string) => void;
  bgColor?: string;
  textStyle?: string;
  numberInput?: boolean;
  textColor?: string;
  multiline?: boolean;
  outlined?: boolean;
  outlinColor?: string;
  roundStr?: string;
  placeHolder?: string;
  placeHolderColor?: string;
  placeHolderStyle?: string;
  bgPlaceHolderColor?: string;
  frezePlaceHolder?: boolean;
  blurAmount?: number;
  keyboard?: KeyboardType;
  translatePlaceHolderFull?: boolean;
}

const TextField: React.FC<Props> = ({
  text,
  onChange,
  bgColor,
  textStyle,
  textColor,
  multiline,
  outlined,
  outlinColor,
  roundStr,
  placeHolder,
  placeHolderColor,
  placeHolderStyle,
  bgPlaceHolderColor,
  frezePlaceHolder,
  blurAmount,
  keyboard,
  translatePlaceHolderFull,
  numberInput
}) => {
  const [height, setHeight] = useState<number>(0);
  const moveText = useRef(new Animated.Value(0)).current;

  const translateY = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(translatePlaceHolderFull ? height / 1.5 : height / 2)],
  });

  useEffect(() => {
    if (text !== "") {
      moveTextTop();
    } else if (text === "") {
      moveTextBottom();
    }
  }, [text]);

  const onBlurHandler = () => {
    if (text === "") {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    if (!frezePlaceHolder) {
      Animated.timing(moveText, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const moveTextBottom = () => {
    if (!frezePlaceHolder) {
      Animated.timing(moveText, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  const textChangeHandler = (text:string) => {
    if(numberInput && text !== ""){
      parseInt(text) ? onChange && onChange(text) : null
    }else{
      onChange && onChange(text)
    }
  }

  return (
    <View
      className={clsx(
        roundStr,
        bgColor ? bgColor : "",
        outlined && "border",
        outlinColor ? outlinColor : "border-white",
        "flex flex-row rounded-xl relative",
        translatePlaceHolderFull ? "my-4" : "my-2"
      )}
    >
      <TextInput
        className={clsx(
          textStyle,
          "w-full p-4",
          textColor ? textColor : "text-white",
          multiline && "h-24"
        )}
        multiline={multiline}
        style={{ textAlignVertical: multiline ? "top" : "center" }}
        value={text ? text : ""}
        onChangeText={(text) => textChangeHandler(text)}
        onFocus={moveTextTop}
        onBlur={onBlurHandler}
        blurOnSubmit
        keyboardType={keyboard}
      />
      {placeHolder ? (
        <Animated.View
          className={clsx(
            "absolute left-4 top-0 mx-0.5",
            multiline ? "py-4" : "bottom-0 flex items-center justify-center"
          )}
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
          style={{ transform: [{ translateY }] }}
          pointerEvents="none"
        >
          <View className="relative">
            {blurAmount ? (
              <BlurBG
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                blurType="dark"
                blurAmount={blurAmount}
                fallbackColor="#100F1A"
              />
            ) : null}
            <Text
              className={clsx(
                "px-1",
                placeHolderStyle,
                bgPlaceHolderColor,
                placeHolderColor ? placeHolderColor : "text-white/50"
              )}
              style={{ textAlignVertical: "center" }}
            >
              {placeHolder}
            </Text>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default TextField;
