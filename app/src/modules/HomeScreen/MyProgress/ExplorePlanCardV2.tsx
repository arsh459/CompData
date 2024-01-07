import { View } from "react-native";
import clsx from "clsx";
import MediaTile from "@components/MediaCard/MediaTile";
import { Badge } from "@models/Prizes/Prizes";
import { getExploreAllBgColors } from "./utils";
import BottomLinearExplore from "./BottomLinearExplore";
import ExplorePlanCardHeader from "./ExplorePlanCardHeader";

interface Props {
  badge: Badge;
  onStart: () => void;
  btnTitle?: string;
}

const ExplorePlanCardV2: React.FC<Props> = ({ onStart, btnTitle, badge }) => {
  const { colors, endColor, startColor } = getExploreAllBgColors(badge);

  return (
    <View
      className={clsx(
        "flex-1 aspect-[335/365]",
        "rounded-xl overflow-hidden flex flex-row justify-around relative z-0 mx-4"
      )}
    >
      {badge.bgImageFemale ? (
        <View
          className="absolute left-0 right-0 top-0 bottom-0 rounded-2xl border-2 overflow-hidden"
          style={{ borderColor: startColor }}
        >
          <MediaTile media={badge.bgImageFemale} fluidResizeMode="cover" />
        </View>
      ) : null}

      <ExplorePlanCardHeader
        startColor={startColor}
        endColor={endColor}
        headingIcon={badge?.headingIcon}
        name={badge?.name ? `${badge.name}` : "Your"}
      />

      <BottomLinearExplore
        colors={colors}
        text={badge.text}
        textIcon={badge.textIcon}
        ctaTitle={btnTitle ? btnTitle : "Select"}
        onCtaPress={onStart}
      />
    </View>
  );
};

export default ExplorePlanCardV2;
