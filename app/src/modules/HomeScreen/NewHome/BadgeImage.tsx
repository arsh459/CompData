import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { getHeight, getWidth } from "@utils/media/mediaDimensions";
import { getURLToFetch } from "@utils/media/mediaURL";
import { Image, Text, View } from "react-native";
import { useState } from "react";

interface Props {
  unLockedHeight?: number;
  athleteImage: AWSMedia | CloudinaryMedia;
  percentageHidden?: boolean;
}

const BadgeImage: React.FC<Props> = ({
  unLockedHeight,
  athleteImage,
  percentageHidden,
}) => {
  const [boxDimention, setBoxDimention] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const imageWidthForBoxHeight = getWidth(athleteImage, boxDimention.height);
  const imageHeightForBoxWidth = getHeight(athleteImage, boxDimention.width);

  const imageWidth =
    imageHeightForBoxWidth > boxDimention.height
      ? imageWidthForBoxHeight
      : boxDimention.width;
  const imageHeight =
    imageHeightForBoxWidth > boxDimention.height
      ? boxDimention.height
      : imageHeightForBoxWidth;

  const imageURI = getURLToFetch(athleteImage, imageWidth, imageHeight);
  const remoteUnLockedHeight = unLockedHeight
    ? unLockedHeight < 0
      ? 0
      : unLockedHeight > 100
      ? 100
      : unLockedHeight
    : 0;

  return (
    <>
      <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        <Image
          source={{
            uri: `https://ik.imagekit.io/socialboat/Ellipse_609__1__QXiCswc-Y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661168640671`,
          }}
          className="w-2/3 h-2/3 opacity-50"
          resizeMode="contain"
        />
      </View>
      <View
        className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center"
        onLayout={(e) =>
          setBoxDimention({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height * 0.6,
          })
        }
      >
        <Image
          source={{ uri: imageURI }}
          style={{ width: imageWidth, height: imageHeight }}
        />
      </View>
      <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        <View style={{ width: imageWidth, height: imageHeight }}>
          <View
            style={{
              width: imageWidth,
              height: ((100 - remoteUnLockedHeight) / 100) * imageHeight,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: imageURI }}
              style={{
                width: imageWidth,
                height: imageHeight,
                tintColor: "#000000",
              }}
            />
          </View>
        </View>
      </View>
      {unLockedHeight && !percentageHidden ? (
        <View className="absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-center items-center">
          <Text
            className="text-white"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >{`${remoteUnLockedHeight}%`}</Text>
        </View>
      ) : null}
    </>
  );
};

export default BadgeImage;
