import ImageWithURL from "@components/ImageWithURL";
import MediaTile from "@components/MediaCard/MediaTile";
import SvgIcons from "@components/SvgIcons";
import { Bootcamp, iconType } from "@models/BootCamp";
import Header from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: { [key in iconType]: string } = {
  workout:
    "https://ik.imagekit.io/socialboat/Component_68__1__uMIt-OuU3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669032337222",
  diet: "https://ik.imagekit.io/socialboat/Component_1__21__J8mwpi8YD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669032408923",
  consult:
    "https://ik.imagekit.io/socialboat/ama_B8GT4JygOs.png?updatedAt=1683368897782",
  live: "https://ik.imagekit.io/socialboat/biweekly_tII9VHoAvm.png?updatedAt=1683368898435",
  dietConsult:
    "https://ik.imagekit.io/socialboat/Group_1827__1__9tdV83x4j.png?updatedAt=1686899475573",
};

interface Props {
  bootcamp: Bootcamp;
  start: number;
  end: number;
}

const BootCampDetailMain: React.FC<Props> = ({ bootcamp, start, end }) => {
  const { todayUnix } = useAuthContext();
  const { user } = useUserContext();
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  const { subStatus } = useSubscriptionContext();
  const isEnded = end <= todayUnix;

  return (
    <>
      <Header back={true} tone="dark" headerType="transparent" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {bootcamp.mainMedia ? (
          <View
            className="w-full -mb-[20%]"
            style={{ aspectRatio: top ? 0.75 : 0.9 }}
          >
            <MediaTile
              media={bootcamp.mainMedia}
              fluid={true}
              fluidResizeMode="cover"
            />
          </View>
        ) : (
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1810_8JNH5g-Go.png?updatedAt=1686745766191",
            }}
            className="w-full -mb-[20%]"
            style={{ aspectRatio: top ? 0.75 : 0.9 }}
          />
        )}
        <LinearGradient colors={["#23213600", "#232136"]} className="px-4">
          <Text
            className="text-white text-3xl"
            style={{ fontFamily: "Canela-Light" }}
          >
            Your
            <Text style={{ fontFamily: "BaiJamjuree-Bold", color: "#C5FF49" }}>
              {" "}
              Bootcamp is {isEnded ? "ended" : "live"}.
            </Text>
          </Text>
          {!isEnded ? (
            <Text
              className="text-white text-xl my-1"
              style={{ fontFamily: "Canela-Light" }}
            >
              Ending on
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold", color: "#FFD749" }}
              >
                {` ${format(end, "hh:mmaaa MMM d")}`}
              </Text>
            </Text>
          ) : (
            <Text
              className="text-white text-xl my-1"
              style={{ fontFamily: "Canela-Light" }}
            >
              Subscribe to unlock all benefits
            </Text>
          )}
          <View className="h-px bg-white/10 my-4" />
        </LinearGradient>

        <View className="p-4">
          {bootcamp.includes.map((item, index) => (
            <TouchableOpacity
              key={`bootcamp-${index}`}
              className="flex flex-row items-center pb-4"
              onPress={() =>
                item.type === "workout"
                  ? navigation.navigate("Workout", {
                      badgeId: user?.badgeId || "",
                    })
                  : item.type === "diet"
                  ? navigation.navigate("NutritionScreen", {
                      badgeId: user?.nutritionBadgeId || "",
                    })
                  : item.link
                  ? Linking.openURL(item.link)
                  : {}
              }
              disabled={isEnded}
            >
              <ImageWithURL
                source={{ uri: icons[item.icon || "live"] }}
                className="w-12 aspect-square rounded-full overflow-hidden"
                resizeMode="contain"
              />
              <Text className="flex-1 text-base font-light text-white/70 mx-4">
                {item.linkText}
              </Text>
              {item.type === "workout" || item.type === "diet" || item.link ? (
                <View
                  className="w-7 aspect-square rounded-full overflow-hidden p-2"
                  style={{
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <ImageWithURL
                    source={{
                      uri: "https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237",
                    }}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View
                  style={{ backgroundColor: "#FFFFFF00" }}
                  className="w-7 aspect-square rounded-full overflow-hidden p-2"
                >
                  <SvgIcons iconType="tickCheck" color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {isEnded ? <View style={{ height: 50 + bottom }} /> : null}
      </ScrollView>

      {isEnded && subStatus !== "SUBSCRIBED" && subStatus !== "PENDING" ? (
        <LinearGradient
          colors={["#23213600", "#232136"]}
          style={{ paddingBottom: bottom || 16 }}
          className="absolute left-0 right-0 bottom-0 p-4"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProScreen", { planType: "pro" });
              weEventTrack("click_pro", {});
            }}
          >
            <LinearGradient
              colors={["#E9CB72", "#F6E0A0", "#E6C769"]}
              className="p-4 rounded-xl flex flex-row justify-center items-center"
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <ImageWithURL
                source={{
                  uri: "https://ik.imagekit.io/socialboat/Subtract_HSSp5WkIO.png?updatedAt=1686810466837",
                }}
                className="w-4 aspect-square mr-2"
                resizeMode="contain"
              />
              <Text className="text-base text-center text-[#232136] font-medium">
                Subscribe to a better you
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      ) : null}
    </>
  );
};

export default BootCampDetailMain;
