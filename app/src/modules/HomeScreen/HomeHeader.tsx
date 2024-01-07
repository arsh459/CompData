import { useUserContext } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import { baseImageKit, springIconWhite } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { getUserTotalFP } from "./utills/getUserTotalFP";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import NotifyBell from "@components/SvgIcons/NotifyBell";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  setHeaderHeight: (val: number) => void;
}

const HomeHeader: React.FC<Props> = ({ setHeaderHeight }) => {
  const { user } = useUserContext();
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate("FitPointExpanderScreen");
    weEventTrack("home_clickTotalPoints", {});
  };

  const onNotificationClick = () => {
    navigation.navigate("Notification");
    weEventTrack("home_clickNotification", {});
  };

  return (
    <>
      <Header
        titleNode={
          <TouchableOpacity
            onPress={onClick}
            className="flex justify-center items-center bg-white/20 rounded-xl px-4 py-1.5"
          >
            <View className="flex flex-row items-center rounded-lg">
              <Image
                source={{ uri: `${baseImageKit}/${springIconWhite}` }}
                className="w-3.5 iphoneX:w-4 aspect-square mr-1"
                resizeMode="contain"
              />
              <Text
                className="text-xs iphoneX:text-sm text-white"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                {`${getUserTotalFP(user?.fpCredit, user?.fpDebit)} FP`}
              </Text>
            </View>
            <Text
              className="text-[10px] iphoneX:text-xs text-white"
              style={{ fontFamily: "BaiJamjuree-Regular" }}
            >
              Total fitpoints
            </Text>
          </TouchableOpacity>
        }
        setHeaderHeight={setHeaderHeight}
        defaultOption={true}
        headerColor="transparent"
        headerType="transparent"
        tone="dark"
        optionNode={
          <TouchableOpacity
            className="w-3 iphoneX:w-5 aspect-square flex items-center mr-2 justify-center bg-[#191828] rounded-full p-1.5 border border-white/20 bg"
            onPress={onNotificationClick}
          >
            <NotifyBell showDot={true} />
          </TouchableOpacity>
        }
      />
    </>
  );
};

export default HomeHeader;
