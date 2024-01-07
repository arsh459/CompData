import Header from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGameContext } from "@providers/game/GameProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const EnterInvteCode = () => {
  const { game } = useGameContext();
  const navigation = useNavigation();
  const [value, setValue] = useState<string>();
  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });
  const [color, setcolor] = useState<string>("#FF5970");
  const { user } = useUserContext();
  const { onChangeGameId } = useAuthContext();

  const updateValue = (newValue: string) => {
    if (newValue && game?.inviteCode === newValue.toLowerCase()) {
      setcolor("#FFFFFF");

      // change GameId
      onChangeGameId(game.id);

      if (!user?.onboarded) {
        setTimeout(() => {
          navigation.navigate("JoinBoat", { section: "welcome" });
        }, 200);
      } else {
        setTimeout(() => {
          navigation.navigate("Home");
        }, 200);
      }
    } else {
      setcolor("#FF5970");
    }

    setValue(newValue);
  };

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: updateValue,
  });
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1 bg-[#100F1A]">
      <Header back={true} headerColor="#100F1A" tone="dark" />
      <View className="m-4 py-4  border border-white/25 bg-white/5 rounded-xl">
        <View className="px-4 flex flex-row">
          <Text
            className="flex-1 text-white text-lg iphoneX:text-[22px]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {game?.name}
          </Text>
          <Text className="text-white text-base iphoneX:text-xl leading-8 mx-4">
            &#8226;
          </Text>
          <Text
            className="text-white text-xs iphoneX:text-sm leading-8"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Invite only
          </Text>
        </View>
        <View className="h-px my-4 bg-white/25" />
        <View
          className="flex justify-center items-center"
          style={{ height: height * 0.25 }}
        >
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={updateValue}
            cellCount={CELL_COUNT}
            // keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                className="border-b w-8 flex justify-center items-center mx-2"
                style={{ aspectRatio: 0.8, borderColor: color }}
                key={index}
              >
                <Text
                  style={{
                    fontSize: width > 376 ? 20 : 16,
                    textAlignVertical: "center",
                    color,
                  }}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <Text
            className="text-lg iphoneX:text-[22px] pt-5"
            style={{ fontFamily: "BaiJamjuree-Bold", color }}
          >
            Fill Your invite code
          </Text>
        </View>
        <Text className="text-white/50 text-xs iphoneX:text-sm px-4">
          Use your Universe Creator for the invite code. This is an invite only
          universe.
        </Text>
      </View>
    </View>
  );
};

export default EnterInvteCode;
