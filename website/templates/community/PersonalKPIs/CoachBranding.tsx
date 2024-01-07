import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UserPhoto from "../Program/Feed/PostView/UserPhoto";

interface Props {
  profileImage?: CloudinaryMedia | AWSMedia;
  coachName?: string;
  signedInUserImage?: CloudinaryMedia | AWSMedia;
  signedInUserName?: string;
  isCoach?: boolean;
}

const CoachBranding: React.FC<Props> = ({
  profileImage,
  coachName,
  signedInUserName,
  signedInUserImage,
  isCoach,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <UserPhoto
          name={coachName}
          img={profileImage}
          nameInvisible={true}
          size="medium"
          onImgClick={() => {}}
        />
      </div>

      {!isCoach ? (
        <>
          <div className="px-2 ">
            <p className="text-4xl">💪</p>
          </div>

          <div>
            <UserPhoto
              name={signedInUserName}
              nameInvisible={true}
              img={signedInUserImage}
              size="medium"
              onImgClick={() => {}}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CoachBranding;
