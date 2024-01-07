import GradientText from "@components/GradientText";
import MediaCard from "@components/MediaCard";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
// import { format } from "date-fns";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { EarnedTaskInterface } from "../FitPointExpanderMain/EarnedTaskCard";

export const Activity_Item_Height = 340;

interface Props {
  earnedFPEl: EarnedTaskInterface;
  uid?: string;
  uName?: string;
  id: string;
}

const ActivityCardV2: React.FC<Props> = ({ earnedFPEl, uName, id }) => {
  const { width } = useWindowDimensions();
  //   const { user } = useUserContext();
  //   const { profile } = useProfileContext();
  const navigation = useNavigation();
  //   const isMe = user?.uid === profile?.uid;
  const isPending = earnedFPEl.reviewStatus === "PENDING";
  const bgColor = isPending ? "#362F12" : "#532628";

  const unix = earnedFPEl.unix ? earnedFPEl.unix : Date.now();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WorkoutHistoryExpanderScreen", {
          actId: id,
          attemptedDate: format(new Date(unix), "yyyy-MM-dd"),
        })
      }
    >
      <View
        style={{
          width: width / 2,
          height: Activity_Item_Height,
          padding: 10,
        }}
      >
        <View className="flex-1 relative rounded-lg overflow-hidden">
          <MediaCard
            media={earnedFPEl?.media}
            notPlayable={true}
            fluid={true}
            fluidResizeMode="cover"
          />
          {earnedFPEl.fitPoints ? (
            <View className="absolute left-0 right-0 bottom-0 flex items-center bg-[#104133] p-2">
              {/* <Text
              className="text-[#FF5970] font-bold text-base text-center"
              style={{ fontFamily: "BaiJamjuree-Regular" }}
            >
              {uName} Earned {earnedFPEl.fitPoints}
              {earnedFPEl.totalFP && `/${earnedFPEl.totalFP}`} FPs
            </Text> */}
              <GradientText
                text={`You Earned ${earnedFPEl.fitPoints} ${
                  earnedFPEl.totalFP ? `/ ${earnedFPEl.totalFP}` : ""
                } FPs`}
                textStyle={{
                  fontSize: 12,
                  fontFamily: "BaiJamjuree-Bold",
                  fontWeight: "700",
                  color: "white",
                }}
                colors={["#51FF8C", "#59F5FF"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                fallbackColor="white"
              />
            </View>
          ) : (
            <View
              className="absolute left-0 right-0 bottom-0 flex items-center  p-2"
              style={{ backgroundColor: bgColor }}
            >
              <GradientText
                text={isPending ? "Result Pending" : "Rejected Post"}
                textStyle={{
                  fontSize: 12,
                  fontFamily: "BaiJamjuree-Bold",
                  fontWeight: "700",
                  color: "white",
                }}
                colors={
                  isPending ? ["#FFD358", "#FCFF78"] : ["#FF5880", "#FFD467"]
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                fallbackColor="white"
              />
            </View>
          )}
        </View>
        <View className="p-1 pt-2">
          <Text
            numberOfLines={2}
            className="text-white text-sm"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {earnedFPEl.name}
          </Text>
          {/* <Text
            className="text-white/80 text-xs pt-[0.5]"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
          >
            {earnedFPEl.unix
              ? `Posted on ${format(new Date(earnedFPEl.unix), "do LLL")}`
              : ""}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCardV2;
