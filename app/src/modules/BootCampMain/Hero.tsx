import ImageWithURL from "@components/ImageWithURL";
import MediaTile from "@components/MediaCard/MediaTile";
import { Bootcamp } from "@models/BootCamp";
import { format } from "date-fns";
import { View, Text, useWindowDimensions } from "react-native";

interface Props {
  bootcamp: Bootcamp;
  start: number;
  end: number;
}

const Hero: React.FC<Props> = ({ bootcamp, start, end }) => {
  const { height } = useWindowDimensions();

  return (
    <View style={{ height }}>
      <Text
        className="text-white text-4xl leading-10"
        style={{ fontFamily: "Canela-Light" }}
      >
        You are invited for a{" "}
        <Text style={{ fontFamily: "BaiJamjuree-Bold", color: "#C5FF49" }}>
          {bootcamp.length} Day Bootcamp
        </Text>
      </Text>
      <Text
        style={{ fontFamily: "BaiJamjuree-Bold" }}
        className="text-white text-2xl my-4"
      >
        {`${format(start, "do")} - ${format(end, "do MMMM")}`}
      </Text>
      <Text
        style={{ fontFamily: "BaiJamjuree-Regular" }}
        className="text-[#E2D4FF] text-sm"
      >
        Trial Suited for women looking to{" "}
        <Text style={{ fontFamily: "BaiJamjuree-Bold" }}>
          lose weight, manage PCOS, Thyroid
        </Text>{" "}
        or recent mothers.
      </Text>
      {bootcamp.landingMedia ? (
        <View className="w-full aspect-[389/422] my-4">
          <MediaTile
            media={bootcamp.landingMedia}
            fluid={true}
            // fluidResizeMode="cover"
          />
        </View>
      ) : (
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group_1804_6cEaTQdR5.png?updatedAt=1686666964267",
          }}
          resizeMode="contain"
          className="w-full aspect-[389/422] my-4"
        />
      )}
    </View>
  );
};

export default Hero;
