import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ColorValue,
} from "react-native";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import clsx from "clsx";
import { defailt_bodyType } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const hide = 0.06;

interface Props {
  aspectRatio: number;
  horizontal?: boolean;
  textBGColor?: ColorValue;
  textColor?: ColorValue;
  textPosition?: { x: number; y: number };
  noBg?: boolean;
  roundedStr?: string;
  bgImg?: string;
}

const BodtTypeShocase: React.FC<Props> = ({
  aspectRatio,
  horizontal,
  textBGColor,
  textColor,
  textPosition,
  noBg,
  roundedStr,
  bgImg,
}) => {
  const { height } = useWindowDimensions();

  const { currentBodyTypeImg, desiredBodyTypeImg } = useUserStore(
    ({ user }) => {
      const gender = user?.gender === "male" ? "male" : "female";
      return {
        currentBodyTypeImg:
          BodyTypeData[user?.currentBodyType || defailt_bodyType].image[gender],
        desiredBodyTypeImg:
          BodyTypeData[user?.desiredBodyType || defailt_bodyType].image[gender],
      };
    },
    shallow
  );

  const uriImg = bgImg
    ? bgImg
    : "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,f-auto/Group_1076_pUD-Jbhh0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674217616851";
  return (
    <View
      className={clsx(
        "w-full flex flex-row justify-center items-end overflow-hidden ",
        roundedStr
      )}
      style={{ aspectRatio }}
    >
      {noBg ? null : (
        <Image
          source={{
            uri: uriImg,
          }}
          className="absolute left-0 right-0 top-0 bottom-0"
        />
      )}
      {currentBodyTypeImg ? (
        <View
          className={clsx("flex items-start", horizontal && "flex-row")}
          style={{ transform: [{ translateY: height * hide }] }}
        >
          <View
            className="px-3 py-2 rounded-lg z-20 mx-auto"
            style={{
              backgroundColor: textBGColor ? textBGColor : "#FFFFFF",
              transform: textPosition
                ? [
                    { translateX: textPosition.x },
                    { translateY: textPosition.y },
                  ]
                : undefined,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: textColor ? textColor : "#100F1A" }}
            >
              Now
            </Text>
          </View>
          <Image
            source={{ uri: currentBodyTypeImg }}
            className="h-full aspect-[73/149]"
          />
        </View>
      ) : null}
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,f-auto/Group_1042_6jnmDljygS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673966091783",
        }}
        className="w-6 aspect-square self-center"
        style={{ transform: [{ translateY: (height * hide) / 2 }] }}
        resizeMode="contain"
      />
      {desiredBodyTypeImg ? (
        <View
          className={clsx(
            "flex items-start justify-center",
            horizontal && "flex-row-reverse"
          )}
          style={{ transform: [{ translateY: height * hide }] }}
        >
          <View
            className="px-3 py-2 rounded-lg z-20 mx-auto"
            style={{
              backgroundColor: textBGColor ? textBGColor : "#FFFFFF",
              transform: textPosition
                ? [
                    { translateX: -textPosition.x },
                    { translateY: textPosition.y },
                  ]
                : undefined,
            }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: textColor ? textColor : "#100F1A" }}
            >
              Goal
            </Text>
          </View>
          <Image
            source={{ uri: desiredBodyTypeImg }}
            className="h-full aspect-[73/149]"
          />
        </View>
      ) : null}
    </View>
  );
};

export default BodtTypeShocase;
