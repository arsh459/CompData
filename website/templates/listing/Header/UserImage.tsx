import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
import MediaTile from "../HeaderImage/MediaTile";

interface Props {
  image?: CloudinaryMedia | AWSMedia;
  name?: string;
  urlKey?: string;
  boxWidth?: string;
  boxHeight?: string;
  pointer?: string;
  unknown?: boolean;
  dark?: boolean;
  color?: string;
}

const UserImage: React.FC<Props> = ({
  image,
  name,
  boxWidth,
  boxHeight,
  pointer,
  unknown,
  dark,
  color,
}) => {
  return (
    <div className={clsx(pointer ? pointer : "cursor-pointer")}>
      {image ? (
        <MediaTile
          media={image}
          widthString={boxWidth ? boxWidth : "w-12"}
          heightString={boxHeight ? boxHeight : "h-12"}
          roundedString="rounded-full"
          alt="p-image"
          width={400}
          height={400}
        />
      ) : name ? (
        <img
          src={
            color
              ? `https://avatars.dicebear.com/api/initials/${
                  name ? name : "user"
                }.svg?b=%23${color.replaceAll("#", "")}`
              : dark
              ? `https://avatars.dicebear.com/api/initials/${
                  name ? name : "user"
                }.svg?b=%23313131`
              : `https://avatars.dicebear.com/api/initials/${
                  name ? name : "user"
                }.svg`
          }
          alt="user"
          className={clsx(
            boxWidth ? boxWidth : "w-12 sm:w-10",
            boxHeight ? boxHeight : "h-12 sm:h-10",
            " object-cover rounded-full "
          )}
        />
      ) : unknown && dark ? (
        <img
          src={`https://ik.imagekit.io/socialboat/Component_5_dq-LHC32N.png?ik-sdk-version=javascript-1.4.3&updatedAt=1657007375343`}
          alt="user"
          className={clsx(
            boxWidth ? boxWidth : "w-12 sm:w-10",
            boxHeight ? boxHeight : "h-12 sm:h-10",
            " object-cover rounded-full"
          )}
        />
      ) : unknown ? (
        <img
          src={`https://ik.imagekit.io/socialboat/icons8-user-32_gYsSDEjsk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1653133030743`}
          alt="user"
          className={clsx(
            boxWidth ? boxWidth : "w-12 sm:w-10",
            boxHeight ? boxHeight : "h-12 sm:h-10",
            " object-cover rounded-full"
          )}
        />
      ) : null}
    </div>
  );
};

export default UserImage;
