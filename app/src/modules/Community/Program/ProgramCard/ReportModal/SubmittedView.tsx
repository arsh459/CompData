import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Text, TouchableOpacity, Linking } from "react-native";

interface Props {
  onCancel: () => void;
}

const SubmittedView: React.FC<Props> = ({ onCancel }) => {
  return (
    <>
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex-1 flex flex-row items-center">
          <View className="w-4 aspect-square flex justify-center items-center mr-3">
            <SvgIcons iconType="done" color="#FFFFFF" />
          </View>
          <Text
            style={{ fontFamily: "Nunito-Bold" }}
            className="text-white text-2xl"
          >
            Report submited
          </Text>
        </View>
        <TouchableOpacity>
          <CloseBtn classStr="w-5 h-5" color="white" onClose={onCancel} />
        </TouchableOpacity>
      </View>
      <Text
        style={{ fontFamily: "Nunito-Regular" }}
        className="text-white text-base my-4"
      >
        Thank you for your report. We will review your request and remove any
        objectionable content within 2 hours of your report
      </Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(
            `${waBaseLink}${encodeURI("Hi!\nI need to report some content")}`
          );
          weEventTrack("click_wa", {});
        }}
        style={{ alignSelf: "flex-end" }}
      >
        <View className="rounded-lg border-[1px] border-white px-4 py-2">
          <Text
            style={{ fontFamily: "Nunito-Medium" }}
            className="font-medium text-white text-xl text-center"
          >
            Contact Us
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SubmittedView;
