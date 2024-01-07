import UppyWidget from "@components/Uppy";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserImage from "@templates/listing/Header/UserImage";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  uploadProfileImg: (img: (CloudinaryMedia | AWSMedia)[]) => void;
  uid: string;
}

const ProfileImg: React.FC<Props> = ({ img, name, uploadProfileImg, uid }) => {
  return (
    <>
      <div className="flex justify-center items-center">
        {img || name ? (
          <UserImage
            image={img}
            name={name}
            boxWidth="w-24 iphoneX:w-28"
            boxHeight="h-24 iphoneX:h-28"
          />
        ) : (
          <UppyWidget
            uid={uid}
            onUpload={uploadProfileImg}
            screenName="profile"
            taskName="profileUpdate"
          >
            <div className="w-24 iphoneX:w-28 h-24 iphoneX:h-28 bg-[#444444] rounded-full flex justify-center items-center">
              <p className="text-4xl">+</p>
            </div>
          </UppyWidget>
        )}
      </div>

      <div className="flex justify-center items-center">
        <UppyWidget
          uid={uid}
          onUpload={uploadProfileImg}
          screenName="profile"
          taskName="profileUpdate"
        >
          <p className="py-2 iphoneX:py-4 text-sm text-center cursor-pointer">
            {img ? "Change Profile Picture" : "Upload Profile Picture"}
          </p>
        </UppyWidget>
      </div>
    </>
  );
};

export default ProfileImg;
