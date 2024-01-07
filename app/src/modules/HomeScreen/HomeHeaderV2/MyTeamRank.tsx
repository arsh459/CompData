import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import TabHolder from "./TabHolder";
import { springIconHexaFrame28 } from "@constants/imageKitURL";
import { getUserTotalFP } from "../utills/getUserTotalFP";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const MyTeamRank = () => {
  const navigation = useNavigation();

  const onFitPointClick = () => {
    navigation.navigate("FitPointExpanderScreen");
    weEventTrack("home_clickTotalPoints", {});
  };

  const { fpCredit, fpDebit } = useUserStore(({ user }) => {
    return {
      fpCredit: user?.fpCredit,
      fpDebit: user?.fpDebit,
    };
  }, shallow);

  return (
    <TabHolder
      img={springIconHexaFrame28}
      onClick={onFitPointClick}
      text={`${getUserTotalFP(fpCredit, fpDebit)} FP`}
    />
  );
};

export default MyTeamRank;
