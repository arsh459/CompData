import { Text, TouchableOpacity } from "react-native";
import { getURLToFetch } from "@utils/media/mediaURL";
import { getShareUrl } from "@components/ShareWrapper/utils";
import { shareNatively } from "@components/ShareWrapper";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { saveTaskShareDeepLink } from "./utils";
import { useRoute } from "@react-navigation/native";
import ImageWithURL from "@components/ImageWithURL";
import { shareIconWithTextWhite } from "@constants/imageKitURL";

interface Props {
  view: "ReelView" | "RecipeeDetailScreen";
  taskId?: string;
  thumbnail?: CloudinaryMedia | AWSMedia;
  name?: string;
  description?: string;
  deeplink?: string;
}

const ShareCta: React.FC<Props> = ({
  view,
  taskId,
  name,
  thumbnail,
  description,
  deeplink,
}) => {
  const route = useRoute();

  const handleShare = async () => {
    if (deeplink) {
      shareNatively(deeplink, route.name);
    } else {
      const img_url = thumbnail && getURLToFetch(thumbnail, 400, 400, true);
      const url = await getShareUrl(
        view,
        taskId ? { taskId } : {},
        name,
        description?.slice(0, 140),
        img_url,
        (url: string) => saveTaskShareDeepLink(taskId, url)
      );

      console.log("url", url);

      if (url) {
        shareNatively(url, route.name);
      }
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} className="  flex items-center  ">
      <ImageWithURL
        source={{ uri: shareIconWithTextWhite }}
        resizeMode="contain"
        className="w-7 aspect-square"
      />
      <Text
        className=" text-white text-xs text-center"
        style={{ fontFamily: "Nunito-Regular", lineHeight: 14 }}
      >
        Share
      </Text>
    </TouchableOpacity>
  );
};

export default ShareCta;
