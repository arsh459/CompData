import BlurBG from "@components/BlurBG";
import MediaTile from "@components/MediaCard/MediaTile";
import { Journey } from "@models/Jounrney/Jourrney";
import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { format } from "date-fns";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { withoutImageLogo } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";

interface JourneyMediaProps {
  journey: Journey;
  weight?: boolean;
  blur?: boolean;
  imgUrl?: string;
  width?: string;
  create?: boolean;
}

export const JourneyMedia: React.FC<JourneyMediaProps> = ({
  journey,
  weight,
  blur,
  imgUrl,
  width,
  create,
}) => {
  const navigation = useNavigation();

  const handlePresss = () => {
    if (create) {
      navigation.navigate("NewJourney");
    } else {
      navigation.navigate("NewJourney", { JourneyId: journey.id });
    }
  };

  return (
    <TouchableOpacity
      className={clsx(
        "aspect-[116/174] relative z-0 rounded-xl border-2 border-white",
        width ? width : "w-full"
      )}
      onPress={handlePresss}
    >
      {!journey.media || imgUrl ? (
        <Image
          source={{ uri: imgUrl ? imgUrl : withoutImageLogo }}
          className="rounded-xl absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-white/20"
        />
      ) : (
        <MediaTile
          media={journey.media}
          fluid={true}
          fluidResizeMode="cover"
          roundedStr="rounded-xl"
        />
      )}
      {blur ? (
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 12,
          }}
          blurAmount={10}
          fallbackColor="#FFFFFF50"
          blurType="light"
        />
      ) : null}
      {weight ? (
        <LinearGradient
          colors={["transparent", "black"]}
          className=" rounded-xl absolute left-0 right-0 bottom-0 h-1/3 flex flex-row justify-center items-end py-2"
        >
          <Text
            className="text-white text-sm iphoneX:text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {`${journey.currWeight}kg`}
          </Text>
        </LinearGradient>
      ) : null}
    </TouchableOpacity>
  );
};

interface JourneyContentProps {
  type: "Earlier" | "Now" | "In progress";
  timestamp: number;
  weight?: number;
  width?: string;
}

export const JourneyContent: React.FC<JourneyContentProps> = ({
  type,
  timestamp,
  weight,
  width,
}) => {
  return (
    <View
      className={clsx(
        "bg-[#FFFFFF30] rounded-xl flex justify-center items-center p-2",
        width ? width : "w-full"
      )}
    >
      <Text
        className="text-white text-[10px] iphoneX:text-xs"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        {type}{" "}
        <Text className="text-sm iphoneX:text-base">{`${weight}kg`}</Text>
      </Text>
      <View className="h-1" />
      <JourneyDate
        timestamp={timestamp}
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      />
    </View>
  );
};

interface JourneyDateProps {
  timestamp: number;
  style?: StyleProp<TextStyle>;
  textStyle?: string;
}

export const JourneyDate: React.FC<JourneyDateProps> = ({
  timestamp,
  style,
  textStyle,
}) => {
  return (
    <Text
      className={clsx("text-white text-[10px] iphoneX:text-sx", textStyle)}
      style={style}
    >
      {format(timestamp, "do MMM yyyy")}
    </Text>
  );
};
