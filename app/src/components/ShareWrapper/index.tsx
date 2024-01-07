import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
import clsx from "clsx";
import { useState } from "react";
import {
  View,
  Text,
  Platform,
  Share,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface Props {
  children: React.ReactNode;
  shareURL: string;
  classStr?: string;
}

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  shareURL: string;
}

const ShareWrapper: React.FC<Props> = ({ children, shareURL, classStr }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const route = useRoute();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (Platform.OS === "web") {
            setVisible(true);
          } else {
            shareNatively(shareURL, route.name);
          }
        }}
      >
        <View className={classStr}>{children}</View>
      </TouchableOpacity>

      <ShareModal
        visible={visible}
        onClose={() => setVisible(false)}
        shareURL="Invite URL"
      />
    </>
  );
};

export default ShareWrapper;

export const shareNatively = async (shareURL: string, screenName: string) => {
  weEventTrack("ShareWrapper_ShareNatively", { screenName });
  try {
    const result = await Share.share({
      url: shareURL,
      title: shareURL,
      // message: shareURL,
    });
    if (result.action === Share.sharedAction) {
      console.log(result.action);
    } else if (result.action === Share.dismissedAction) {
      console.log(result.action);
    }
  } catch (error: any) {
    console.log(error);
    crashlytics().recordError(error);
  }
};

export const ShareModal: React.FC<ShareModalProps> = ({
  visible,
  onClose,
  shareURL,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000 * 60);
  };

  return (
    <UseModal visible={visible} onClose={onClose}>
      <View className="w-4/5 max-w-xs p-4 bg-white rounded-xl">
        <View className="flex flex-row justify-between items-center">
          <Text className="iphoneX:text-xl font-medium">Share</Text>
          <CloseBtn onClose={onClose} classStr="w-4 h-4" color="#000000" />
        </View>
        <View className="flex flex-row justify-around items-center py-4">
          <FacebookShareButton url={shareURL}>
            <FacebookIcon size={50} borderRadius={10} />
          </FacebookShareButton>
          <LinkedinShareButton url={shareURL}>
            <LinkedinIcon size={50} borderRadius={10} />
          </LinkedinShareButton>
          <WhatsappShareButton url={shareURL}>
            <WhatsappIcon size={50} borderRadius={10} />
          </WhatsappShareButton>
        </View>
        <View className="flex flex-row items-center border rounded-lg">
          <Text className="flex-1 py-1.5 px-4 text-xs iphoneX:text-sm focus:outline-none focus:select-text bg-[#F1F1F1] rounded-l-lg">
            {shareURL}
          </Text>
          <Pressable
            className={clsx(
              "py-1 px-4 text-xs iphoneX:text-sm border-l  uppercase bg-[#F1F1F1] rounded-r-lg",
              clicked && "text-sky-500"
            )}
            onPress={handleCopy}
          >
            copy
          </Pressable>
        </View>
      </View>
    </UseModal>
  );
};
