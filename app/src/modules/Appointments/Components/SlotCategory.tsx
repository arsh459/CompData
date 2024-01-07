import ArrowDirectionIcon from "@components/SvgIcons/ArrowDirectionIcon";
import { Dimensions, Linking, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import ImageWithURL from "@components/ImageWithURL";
import { useNavigation } from "@react-navigation/native";
import { CategoryTypes, categories } from "../constants";
import { useAppointmentPermission } from "@hooks/appointment/useAppointmentPermission";
import { waBaseLink } from "@constants/links";
import clsx from "clsx";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const { width } = Dimensions.get("window");
const cardHeight = width * 0.3;

interface Props {
  handleClose: () => void;
  source: string;
  createCalendlySession: (appType: CategoryTypes) => Promise<void>;
}

const SlotCategory: React.FC<Props> = ({
  handleClose,
  source,
  createCalendlySession,
}) => {
  const { subStatus } = useSubscriptionContext();
  // const subStatus = "EXPIRED";
  const navigation = useNavigation();
  const textColor = "#414141";

  const { docStatus, docStatusText } = useAppointmentPermission();
  const noSub = subStatus !== "SUBSCRIBED" && subStatus !== "PENDING";
  // const noSub = true;

  const handlePress = (type: CategoryTypes) => {
    if (type === "health_coach") {
      weEventTrack("slot_talkHealthCoach", {});
      createCalendlySession(type);
      handleClose();
    } else if (type === "sales") {
      weEventTrack("slot_speakToSales", {});
      weEventTrack("slot_request", { source: source });
      navigation.navigate("BookZohoSlot", {
        category: "sales",
        nextScreen: "AppointmentBookedScreen",
        nextScreenDoneNav: "AppointmentsScreen",
      });
      handleClose();
    } else if (type === "nutrtitionist" && !noSub) {
      weEventTrack("slot_speakToDiet", {});
      createCalendlySession(type);
      handleClose();
    } else if (noSub) {
      weEventTrack("slot_speakToDietUnpaid", {});
      navigation.navigate("ProScreen", { planType: "pro" });
    } else if (type === "gynaecologist" && docStatus === "ALLOWED") {
      weEventTrack("slot_speakToGynaec", {});
      createCalendlySession(type);
      handleClose();
    } else if (type === "gynaecologist") {
      weEventTrack("slot_bookAdditionalDoc", {});
      Linking.openURL(
        `${waBaseLink}${encodeURI(
          "Hi!\nI need to book an additional gynaec consultation"
        )}`
      );
      handleClose();
    }
  };

  return (
    <View className="px-4">
      <Text
        className="text-center text-[#8C41C3] text-lg iphoneX:text-2xl pb-4 iphoneX:pb-0"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Choose your Category:
      </Text>

      <View className="my-4">
        {categories.map((each) => {
          // const isFreez =
          // each.type !== "health_coach" && docStatus !== "ALLOWED";
          // const isFreez = true;
          let isFreez = false;
          let typeToBook: CategoryTypes = each.type;
          if (each.type === "gynaecologist" && docStatus !== "ALLOWED") {
            isFreez = true;
          } else if (each.type === "nutrtitionist" && noSub) {
            isFreez = true;
          }

          if (noSub && each.type === "health_coach") {
            return null;
          } else if (!noSub && each.type === "sales") {
            return null;
          }

          return (
            <TouchableOpacity
              key={each.type}
              onPress={() => handlePress(typeToBook)}
              className="w-full px-4 mb-4 relative z-0"
            >
              <ImageWithURL
                source={{ uri: each.img }}
                resizeMode="contain"
                style={{
                  aspectRatio: 1,
                  height: cardHeight,
                  opacity: isFreez ? 0.5 : 1,
                }}
              />

              <View
                className="absolute left-0 right-0 bottom-0 -z-10 rounded-2xl flex flex-row items-center p-4"
                style={{
                  backgroundColor: each.color,
                  minHeight: cardHeight * 0.7,
                }}
              >
                <View style={{ width: cardHeight }} />

                <View className="flex-1 mx-4">
                  <Text
                    numberOfLines={2}
                    style={{
                      color: textColor,
                      fontFamily: "Nunito-Bold",
                      opacity: isFreez ? 0.5 : 1,
                    }}
                    className="iphoneX:text-base text-sm"
                  >
                    {each.text}
                  </Text>
                  {each.type === "health_coach" ? null : (
                    <>
                      {docStatusText && each.type === "gynaecologist" ? (
                        <Text
                          numberOfLines={2}
                          style={{
                            color: textColor,
                            fontFamily: "Nunito-Medium",
                          }}
                          className="text-xs mt-1"
                        >
                          {docStatusText}
                        </Text>
                      ) : null}

                      {isFreez ? (
                        <ImageWithURL
                          source={{
                            uri: noSub
                              ? "https://ik.imagekit.io/socialboat/Group%201814_WmeqNaJ9i.png?updatedAt=1692619333339"
                              : "https://ik.imagekit.io/socialboat/Group%201000001086_Nd451_bSh.png?updatedAt=1692698143872",
                          }}
                          className={clsx(
                            "h-6 mt-1",
                            noSub ? "aspect-[131/23]" : "aspect-[94/23]"
                          )}
                          resizeMode="contain"
                        />
                      ) : null}
                    </>
                  )}
                </View>

                {isFreez ? null : (
                  <View className="w-4 aspect-square">
                    <ArrowDirectionIcon direction="right" color={textColor} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SlotCategory;
