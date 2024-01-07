import { Achiever, Award } from "@models/Awards/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View, Text, TouchableOpacity } from "react-native";
import TimeComponent from "./TimeComponent";
import ImageWithURL from "@components/ImageWithURL";
import { awardLocked } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import AwardMedia from "./AwardMedia";

const now = Date.now();

interface Props {
  award: Award;
  achiever: Achiever;
  isMe: boolean;
}

const AwardItem: React.FC<Props> = ({ award, achiever, isMe }) => {
  const navigation = useNavigation();

  const {
    id,
    title: achieverTitle,
    unlockOn: wonOn,
    startTime: unlockedOn,
    endTime: expiresOn,
    awardStatus,
  } = achiever;

  const isWon = awardStatus === "WON";
  const isExpired = expiresOn && expiresOn <= now && !isWon ? true : false;

  const isUnlocked = isWon || (unlockedOn && unlockedOn <= now) ? true : false;

  const isUnseen = useUserStore((state) => {
    return state.user?.unseenAwards?.includes(id) ? true : false;
  });

  const handlePress = () => {
    if (isUnlocked && isMe) {
      navigation.navigate("AwardWon", {
        achivementId: id,
      });
    }
  };

  return (
    <TouchableOpacity
      key={id}
      onPress={handlePress}
      disabled={!isUnlocked || !isMe}
      className="w-1/2 aspect-square p-2"
    >
      <View className="w-full h-full bg-[#343150] rounded-xl flex justify-center items-center p-4 relative z-0">
        <View className="flex-1 w-full mb-4 relative z-0">
          <AwardMedia
            media={isWon ? award?.img : award?.lockedImg}
            themeColor={isWon ? award?.themeColor : undefined}
            size="fit"
          />
          {!isUnlocked ? (
            <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
              <ImageWithURL
                className="w-1/3 aspect-square"
                source={{ uri: awardLocked }}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
        <Text
          numberOfLines={1}
          className="w-full text-white text-xs text-center mb-1 capitalize"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {achieverTitle || award?.name}
        </Text>
        <TimeComponent
          wonOn={isWon ? wonOn : undefined}
          isExpired={isExpired}
          isUnlocked={isUnlocked}
          unlockedOn={unlockedOn}
          expiresOn={expiresOn}
          placeholder={award?.description ? award?.description : ""}
        />

        {isUnseen ? (
          <View className="absolute top-2 right-2 z-10 bg-white rounded-full">
            <Text
              numberOfLines={1}
              className="w-full text-xs text-center px-2 py-0.5"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              New win
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default AwardItem;
