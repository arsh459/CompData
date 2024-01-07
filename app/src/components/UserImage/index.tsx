import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { getURLToFetch } from "@utils/media/mediaURL";
import { darkUnknown } from "@constants/imageKitURL";
import clsx from "clsx";
import FastImage from "react-native-fast-image";

interface Props {
  image?: CloudinaryMedia | AWSMedia;
  name?: string;
  width?: string;
  height?: string;
  unknown?: boolean;
  color?: string;
}

const UserImage: React.FC<Props> = ({
  image,
  name,
  width,
  height,
  color,
  unknown,
}) => {
  // const diceUrl = unknown ? darkUnknown : darkUnknown;

  // console.log(
  //   "name",
  //   name
  //     ? `https://api.dicebear.com/initials/${encodeURI(name)}.png${
  //         color ? `?b=${encodeURIComponent(color)}` : ""
  //       }`
  //     : ""
  // );

  return (
    <FastImage
      source={{
        uri: image ? getURLToFetch(image, 500, 500) : darkUnknown,

        // : name
        // ? `https://avatars.dicebear.com/api/initials/${encodeURI(name)}.png${
        // color ? `?b=${encodeURIComponent(color)}` : ""
        // }`
        // : diceUrl,
      }}
      className={clsx(
        width ? width : "w-12",
        height ? height : "h-12",
        "rounded-full overflow-hidden"
      )}
    />
  );
};

export default UserImage;
