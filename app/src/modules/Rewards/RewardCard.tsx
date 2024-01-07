import { View, Text } from "react-native";

import MediaTile from "@components/MediaCard/MediaTile";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import { useBadge } from "@providers/badges/hooks/useBadge";
import { useAuthContext } from "@providers/auth/AuthProvider";
import clsx from "clsx";
interface Props {
  media?: CloudinaryMedia | AWSMedia;
  description: string;
  imgText?: string;
  imgSubText?: string;
  isUnlocked?: boolean;

  cardType?: "specificId" | "independent" | "any";
  specificId?: string;
  cardsNeeded?: number;
}

const RewardCard: React.FC<Props> = ({
  media,
  description,
  imgSubText,
  imgText,
  isUnlocked,
  cardsNeeded,
  cardType,
  specificId,
}) => {
  const { state } = useAuthContext();

  const { badge } = useBadge(state.gameId, specificId);

  return (
    <View className="flex-1 ">
      <View
        className={clsx(
          "relative",

          "flex flex-1 flex-row py-2 iphoneX:py-4 px-5 bg-[#EDEDED17] rounded-t-lg items-center  mx-4 justify-between",
          isUnlocked ? "rounded-b-lg" : ""
        )}
      >
        {!isUnlocked ? (
          <View
            style={{ backgroundColor: "#100F1A", opacity: 0.45 }}
            className=" absolute left-0 right-0 top-0 bottom-0 z-20"
          />
        ) : null}
        <View className="w-1/3 h-14 ">
          {media ? (
            <MediaTile fluid={true} media={media} />
          ) : imgText && imgSubText ? (
            <View>
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-center text-3xl"
              >
                {imgText}
              </Text>
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-center text-base"
              >
                {imgSubText}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>

        <View className="px-2" />
        <View className="w-1/2">
          <Text
            className="text-white font-medium text-lg  text-center  pl-2"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {description}
          </Text>
        </View>
      </View>
      {isUnlocked ? null : (
        <View className="px-5 mx-4 py-2 bg-[#3C3C3C] flex flex-row justify-center rounded-b-lg">
          <Text
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            className="text-white text-center text-sm"
          >
            Need
          </Text>
          <View className="pl-2">
            {cardType === "independent" ? (
              <View className="w-4">
                <NewBadge unLockedHeight={1} />
              </View>
            ) : cardType === "specificId" ? (
              <View className="w-4">
                <NewBadge
                  unLockedHeight={1}
                  colorOne="#EADAA6"
                  colorTwo="#9C874E"
                />
              </View>
            ) : (
              <View className="flex flex-row ">
                <View className="w-4">
                  <NewBadge unLockedHeight={1} />
                </View>
                <View>
                  <Text
                    className="text-[#FFFFFF] px-1  text-sm "
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                  >
                    Or
                  </Text>
                </View>
                <View className="w-4">
                  <NewBadge
                    unLockedHeight={1}
                    colorOne="#EADAA6"
                    colorTwo="#9C874E"
                  />
                </View>
              </View>
            )}
          </View>

          <Text
            className="text-[#FFFFFF] px-2 text-sm"
            style={{ fontFamily: "BaiJamjuree-bold" }}
          >
            {specificId && badge?.name
              ? `${badge.name} Card`
              : `X ${cardsNeeded} Card`}
          </Text>
          <Text
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            className="text-white text-center text-sm"
          >
            to unlock
          </Text>
        </View>
      )}
    </View>
  );
};

export default RewardCard;
