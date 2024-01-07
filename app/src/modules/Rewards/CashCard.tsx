// import { View, Text } from "react-native";
import { useEffect, useState } from "react";
// import MediaTile from "@components/MediaCard/MediaTile";
// import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import RewardCard from "./RewardCard";
import { cashUnlockBadges, getCashPrize } from "./utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
interface Props {}

const CashCard: React.FC<Props> = ({}) => {
  const { state } = useAuthContext();
  const { user } = useUserContext();

  const [valueText, setValueText] = useState<{
    img: string;
    desc: string;
    subtitleImg: string;
  }>({
    img: "",
    subtitleImg: "",
    desc: "",
  });

  useEffect(() => {
    const getCashReward = async () => {
      const { value } = await getCashPrize(
        state.gameId,
        user?.independentBadgesWon,
        user?.relativeBadgesWon
      );
      setValueText({
        img: `${value}`,
        subtitleImg: "INR",
        desc: `You have won cash INR ${value}`,
      });
    };
    getCashReward();
  }, [state.gameId, user?.independentBadgesWon, user?.relativeBadgesWon]);

  const { unlocked, cardsNeeded } = cashUnlockBadges(
    user?.independentBadgesWon,
    user?.relativeBadgesWon
  );

  return valueText.img === "0" ? null : (
    <RewardCard
      description={valueText.desc}
      imgText={valueText.img}
      imgSubText={valueText.subtitleImg}
      isUnlocked={unlocked}
      cardsNeeded={cardsNeeded}
      cardType="any"
    />
  );
};

export default CashCard;
