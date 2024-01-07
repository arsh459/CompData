import Svg, { Defs, G, Path, LinearGradient, Stop } from "react-native-svg";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { useWindowDimensions, View } from "react-native";
import MediaTile from "@components/MediaCard/MediaTile";
import { badgeTypes } from "@models/Prizes/Prizes";

const colors = {
  shield: { color1: "#8D94E7", color2: "#5C5AB1", color3: "#1A193D" },
  shield_gold: { color1: "#D2B460", color2: "#A79251", color3: "#231F13" },
  shield_silver: { color1: "#BABABA", color2: "#4F4F4F", color3: "#1D1D1D" },
  shield_bronze: { color1: "#B38073", color2: "#4B3330", color3: "#302321" },
};
interface Props {
  badgeId: badgeTypes;
  athleteImage?: AWSMedia | CloudinaryMedia;
  brandImage?: AWSMedia | CloudinaryMedia;
}
const ShieldBadge: React.FC<Props> = ({
  badgeId,
  athleteImage,
  brandImage,
}) => {
  const { width } = useWindowDimensions();

  return badgeId === "shield" ||
    badgeId === "shield_gold" ||
    badgeId === "shield_silver" ||
    badgeId === "shield_bronze" ? (
    <View
      style={{
        width: width * 0.3,
        aspectRatio: 85 / 92,
        position: "relative",
      }}
    >
      <Svg className="w-full h-full" fill="none" viewBox="0 0 88 94">
        <G filter="url(#prefix__filter0_i_1682_443)">
          <Path
            d="M81.29 9.183C46.54-5.64 17.38 3.008 7.143 9.186 3.393 11.086 1 13.462 1 17.264c.002 53.694 33.786 73.175 38.173 75.075 3.51 1.52 7.898.634 9.214 0 42.996-23.285 38.168-70.326 38.168-75.078 0-4.277-2.194-6.177-5.265-8.078z"
            fill="url(#prefix__paint0_linear_1682_443)"
          />
        </G>
        <Path
          d="M81.29 9.183C46.54-5.64 17.38 3.008 7.143 9.186 3.393 11.086 1 13.462 1 17.264c.002 53.694 33.786 73.175 38.173 75.075 3.51 1.52 7.898.634 9.214 0 42.996-23.285 38.168-70.326 38.168-75.078 0-4.277-2.194-6.177-5.265-8.078z"
          stroke="url(#prefix__paint1_linear_1682_443)"
        />
        <Path
          d="M78.616 11.377C46.262-2.426 19.11 5.627 9.58 11.379c-3.491 1.77-5.72 3.982-5.72 7.522.002 49.994 31.458 68.132 35.543 69.902 3.268 1.415 7.353.59 8.579 0 40.033-21.68 35.538-65.48 35.538-69.905 0-3.982-2.043-5.752-4.903-7.521z"
          fill="url(#prefix__paint2_linear_1682_443)"
        />
        <Path
          d="M7.74 13.357c0 31.33 45.322 42.576 67.984 44.284h.596c-.795 1.807-3.478 7.884-9.84 16.267-6.858 9.038-16.697 15.364-20.872 15.665H43.82c-8.05-.602-20.872-13.255-26.24-20.786C8.932 56.134 5.527 40.469 4.623 31.733c-.38-3.67-.603-9.82-.603-12.954 0-3.133 2.11-5.422 3.72-6.326v.904z"
          fill="url(#prefix__paint3_linear_1682_443)"
        />
        <Path
          d="M80.842 13.356c0 31.33-45.79 42.577-68.685 44.284h-.602c.803 1.807 3.012 7.832 9.94 16.267 7.23 8.8 16.268 15.665 21.088 15.665h3.314c8.134-1.506 19.581-13.255 25.004-20.786 9.037-12.954 11.95-28.217 12.652-37.054.312-3.916 0-10.423 0-13.556 0-3.133-1.807-4.72-2.71-5.121v.3z"
          fill="url(#prefix__paint4_linear_1682_443)"
        />
        <Path
          d="M44.484 67.773a7.031 7.031 0 110 14.063 7.031 7.031 0 010-14.063z"
          stroke="url(#prefix__paint5_linear_1682_443)"
        />
        <Path
          d="M47.354 75.227H46.14l.884-.915h1.508l-.688.706a.685.685 0 01-.491.209zM41.72 74.32h1.213l-.885.915H40.54l.688-.706a.687.687 0 01.492-.209z"
          fill={colors[badgeId].color1}
        />
        <Path
          d="M42.885 74.32h4.28l-.94.914h-4.264l.924-.914zM43.034 73.731h-1.409l.555-.578a.925.925 0 01.666-.286h1.025l-.837.864zM45.368 72.867h1.41l-.556.578a.925.925 0 01-.666.286h-1.025l.837-.864z"
          fill={colors[badgeId].color1}
        />
        <Path
          d="M43.876 72.867h1.51l-.837.864h-1.51l.837-.864zM44.075 72.313H43.03l.556-.559a.938.938 0 01.666-.277h1.024l-.578.578a.882.882 0 01-.624.258zM45.923 75.852h1.41l-.555.577a.924.924 0 01-.665.287h-1.027l.837-.864zM43.59 76.716h-1.41l.555-.578a.924.924 0 01.666-.286h1.025l-.837.864z"
          fill={colors[badgeId].color1}
        />
        <Path
          d="M45.096 76.715h-1.51l.837-.863h1.51l-.837.863zM45.007 77.281h1.044l-.555.56a.938.938 0 01-.666.277h-1.025l.578-.579a.883.883 0 01.624-.258z"
          fill={colors[badgeId].color1}
        />
        <Defs>
          <LinearGradient
            id="prefix__paint0_linear_1682_443"
            x1={84.575}
            y1={10.564}
            x2={2.524}
            y2={52.061}
            gradientUnits="userSpaceOnUse"
          >
            <Stop />
            <Stop offset={0.576} stopColor="#848484" />
            <Stop offset={0.899} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint1_linear_1682_443"
            x1={86.848}
            y1={10.582}
            x2={1.97}
            y2={73.719}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={colors[badgeId].color2} />
            <Stop offset={0.553} stopColor={colors[badgeId].color1} />
            <Stop offset={1} stopColor={colors[badgeId].color2} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint2_linear_1682_443"
            x1={4.015}
            y1={37.451}
            x2={79.319}
            y2={29.706}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0.052} stopColor={colors[badgeId].color2} />
            <Stop offset={0.49} stopColor={colors[badgeId].color1} />
            <Stop offset={1} stopColor={colors[badgeId].color2} />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint3_linear_1682_443"
            x1={69.693}
            y1={5.826}
            x2={10.648}
            y2={52.218}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset={0.546}
              stopColor={colors[badgeId].color2}
              stopOpacity={0.2}
            />
            <Stop
              offset={0.851}
              stopColor={colors[badgeId].color3}
              stopOpacity={0.8}
            />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint4_linear_1682_443"
            x1={28.425}
            y1={-7.129}
            x2={50.416}
            y2={59.447}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={colors[badgeId].color2} stopOpacity={0.2} />
            <Stop
              offset={1}
              stopColor={colors[badgeId].color3}
              stopOpacity={0.8}
            />
          </LinearGradient>
          <LinearGradient
            id="prefix__paint5_linear_1682_443"
            x1={50.581}
            y1={79.826}
            x2={39.105}
            y2={67.991}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={colors[badgeId].color2} />
            <Stop offset={0.466} stopColor={colors[badgeId].color1} />
            <Stop offset={1} stopColor={colors[badgeId].color3} />
          </LinearGradient>
        </Defs>
      </Svg>
      {brandImage ? (
        <View className="absolute left-0 right-0 top-0 bottom-0">
          <View className=" " style={{ width: "100%", height: "70%" }}>
            <MediaTile media={brandImage} fluid={true} />
          </View>
        </View>
      ) : null}
    </View>
  ) : null;
};

export default ShieldBadge;
