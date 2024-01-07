import clsx from "clsx";
import { ReactNode } from "react";
import { View, Text } from "react-native";

interface Props {
  titleNode?: ReactNode;
  tone?: "dark" | "light";
  centerTitle?: boolean;
  title?: string;
}

const TitleNode: React.FC<Props> = ({
  titleNode,
  tone,
  centerTitle,
  title,
}) => {
  return (
    <View
      className={clsx(
        // "border border-yellow",

        "flex-1 flex flex-row items-center",
        centerTitle && "justify-center"
      )}
    >
      {titleNode ? (
        titleNode
      ) : title ? (
        <Text
          numberOfLines={1}
          className="text-lg iphoneX:text-xl font-bold"
          style={{
            color: tone === "dark" ? "white" : "black",

            fontFamily: "Nunito-Bold",
          }}
        >
          {title}
        </Text>
      ) : null}
    </View>
  );
};

export default TitleNode;
