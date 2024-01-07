import clsx from "clsx";
import { useState } from "react";
import { Text, View } from "react-native";
import Autolink from "react-native-autolink";

interface Props {
  text?: string;
  numChars?: number;
  textSize?: string;
  textColor?: string;
  buttonColor?: string;
  fontFamily?: string;
}

const ShowMore: React.FC<Props> = ({
  text,
  numChars,
  textSize,
  textColor,
  buttonColor,
  fontFamily,
}) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return text ? (
    <View className="whitespace-pre-wrap prose break-words">
      {text.length < (numChars ? numChars : 75) ? (
        <Autolink
          text={text}
          renderText={(localText) => (
            <Text
              style={{ fontFamily }}
              className={clsx(textSize, textColor ? textColor : "text-black")}
            >
              {localText}
            </Text>
          )}
          linkStyle={{ color: "blue" }}
        />
      ) : (
        <Text>
          <Text
            className={clsx(textSize, textColor ? textColor : "text-black")}
            style={{ fontFamily }}
          >
            {showMore ? (
              <Autolink text={text} linkStyle={{ color: "blue" }} />
            ) : (
              <Autolink
                text={`${text.substring(0, numChars ? numChars : 75)}...`}
                linkStyle={{ color: "blue" }}
              />
            )}
          </Text>
          <Text
            className={clsx(
              textSize,
              buttonColor ? buttonColor : "text-blue-500"
            )}
            onPress={() => setShowMore(!showMore)}
            style={{ fontFamily }}
          >
            {showMore ? " Show less" : " Show more"}
          </Text>
        </Text>
      )}
    </View>
  ) : null;
};

export default ShowMore;
