import UppyWidget from "@components/Uppy";
// import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
// import { useUploadWidget } from "@hooks/cloudinary/useUploadWidget";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import clsx from "clsx";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name: string;
  uploadProfileImg: (img: (CloudinaryMedia | AWSMedia)[]) => void;
  uid: string;
  //   removeProfileImg: () => void;
}

const ProfileImg: React.FC<Props> = ({
  img,
  name,
  uploadProfileImg,
  uid,
  //   removeProfileImg,
}) => {
  // useUploadWidget(uploadProfileImg, true, false, 1);

  return (
    <>
      <div className="flex justify-center items-center">
        {img ? (
          <div>
            <MediaTile
              media={img}
              width={400}
              height={400}
              roundedString={clsx("rounded-full")}
              alt="user"
              widthString={"w-24"}
              heightString={"h-24"}
            />
          </div>
        ) : (
          <div>
            <img
              className="w-24 h-24 rounded-full"
              src={`https://avatars.dicebear.com/api/initials/${
                name ? name : "user"
              }.svg`}
              alt="user"
            />
          </div>
        )}
      </div>

      <div>
        <UppyWidget
          uid={uid}
          onUpload={uploadProfileImg}
          screenName="profile"
          taskName="profileUpdate"
        >
          <p className="pt-2 text-orange-500 text-sm text-center font-semibold cursor-pointer">
            Change profile
          </p>
        </UppyWidget>
      </div>
    </>
  );
};

export default ProfileImg;
