import { TextField } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import ProfileImg from "./ProfileImg";

interface Props {
  name?: string;
  instagramHandle?: string;
  email?: string;
  bio?: string;
  onNameUpdate: (newName: string) => void;
  onBioUpdate: (bio: string) => void;
  onInstaUpdate: (handle: string) => void;
  onEmailUpdate: (email: string) => void;
  uploadProfileImg: (img: (CloudinaryMedia | AWSMedia)[]) => void;
  img?: CloudinaryMedia | AWSMedia;
  uid: string;
}

const ProfileBrief: React.FC<Props> = ({
  name,
  instagramHandle,
  email,
  bio,
  onBioUpdate,
  onNameUpdate,
  onInstaUpdate,
  onEmailUpdate,
  uploadProfileImg,
  img,
  uid,
}) => {
  return (
    <>
      <ProfileImg
        uid={uid}
        uploadProfileImg={uploadProfileImg}
        img={img}
        name={name}
      />
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"What people call you"}
          label={"Your name"}
          variant="outlined"
          onChange={(newVal) => onNameUpdate(newVal.target.value)}
          value={name}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"To invite you to award shows"}
          label={"Your Instagram handle"}
          variant="outlined"
          onChange={(newVal) => onInstaUpdate(newVal.target.value)}
          value={instagramHandle}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Important communications"}
          label={"Your Email"}
          variant="outlined"
          onChange={(newVal) => onEmailUpdate(newVal.target.value)}
          value={email}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="JoinBoatField py-4">
        <TextField
          style={{ width: "100%" }}
          placeholder={"Brief about yourself"}
          label={"bio"}
          multiline={true}
          minRows={4}
          variant="outlined"
          onChange={(newVal) => onBioUpdate(newVal.target.value)}
          value={bio}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </>
  );
};

export default ProfileBrief;
