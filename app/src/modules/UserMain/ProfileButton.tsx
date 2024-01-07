import { View, Text, Image } from "react-native";

import clsx from "clsx";

interface Props {
  text?: string;
  fontStyle?: string;
  level?: number;
  showIcon?: boolean;
  textNumber?: number;
  iconUrl?: string;
  textStyle?: string;
  iconCls?: string;
}
const ProfileButton: React.FC<Props> = ({
  text,
  fontStyle,
  level,
  showIcon,
  textNumber,
  iconUrl,
  textStyle,
  iconCls,
}) => {
  return (
    <View
      className={clsx(
        "flex-row p-2 flex items-center justify-center rounded-lg",
        fontStyle ? fontStyle : ""
      )}
    >
      {showIcon ? (
        <Image
          source={{ uri: iconUrl }}
          className={clsx("w-4 h-3 mr-1", iconCls)}
          resizeMode="contain"
        />
      ) : null}

      <Text
        style={{ fontFamily: "BaiJamjuree-Regular" }}
        className={clsx(textStyle ? textStyle : "text-white")}
      >
        {text ? text : "Button"}
      </Text>
      {typeof textNumber === "number" ? (
        <Text
          style={{ fontFamily: "BaiJamjuree-Regular" }}
          className="text-sm font-bold text-white pl-2"
        >
          {textNumber}
        </Text>
      ) : null}
    </View>
  );
};

export default ProfileButton;
