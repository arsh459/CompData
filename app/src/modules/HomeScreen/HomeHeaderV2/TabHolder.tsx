import ImageWithURL from "@components/ImageWithURL";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import clsx from "clsx";

interface Props {
  onClick: () => void;
  img?: string;
  text: string;
  label?: string;
  textColor?: string;
}

const TabHolder: React.FC<Props> = ({
  onClick,
  img,
  text,
  label,
  textColor,
}) => {
  return (
    <View className="flex flex-row mr-2 ">
      <TouchableOpacity
        style={{
          ...styles.shadow,
          backgroundColor: label ? "#2C2C37" : undefined,
        }}
        onPress={onClick}
      >
        <View
          className="flex justify-center items-center px-3 py-1.5 rounded-xl bg-white/10 border border-white/10"
          style={{
            backgroundColor: !label ? "#343150" : "rgb(255 255 255 / 0.1)",
          }}
        >
          <View className="flex flex-row items-center rounded-lg">
            {img ? (
              <ImageWithURL
                source={{ uri: img }}
                className="w-4 iphoneX:w-[18px] aspect-square mr-1"
                resizeMode="contain"
              />
            ) : null}
            <Text
              className={clsx(
                textColor ? textColor : "text-white",
                "text-xs iphoneX:text-sm"
              )}
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {text}
            </Text>
          </View>
          {label ? (
            <Text
              className="text-[10px] iphoneX:text-xs text-white/80"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {label}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabHolder;

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 12,
    backgroundColor: "#2C2C37",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
