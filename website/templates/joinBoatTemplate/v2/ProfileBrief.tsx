import Button from "@components/button";
import { TextField } from "@mui/material";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import ProfileImg from "./ProfileImg";
// import { useState } from "react";
// import { useState } from "react"

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
  //   removeProfileImg: () => void;

  onButtonPress: (
    name?: string,
    instagramHandle?: string,
    email?: string
  ) => void;
  onBack?: () => void;
  img?: CloudinaryMedia | AWSMedia;
  uid: string;
}

const ProfileBrief: React.FC<Props> = ({
  name,
  instagramHandle,
  email,
  bio,
  onBioUpdate,
  onButtonPress,
  onNameUpdate,
  onInstaUpdate,
  onEmailUpdate,
  uploadProfileImg,
  img,
  onBack,
  uid,
}) => {
  return (
    <div>
      <div>
        <ProfileImg
          uid={uid}
          uploadProfileImg={uploadProfileImg}
          img={img}
          //   removeProfileImg={removeProfileImg}
          name={name ? name : "US"}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"What people call you"}
          label={"Your name"}
          // onBlur={onBlur}
          variant="outlined"
          onChange={
            (newVal) => onNameUpdate(newVal.target.value)
            // (newVal) => onChangeText(newVal)
            // setSelectedItem({ ...item, heading: newVal.target.value })
          }
          value={name}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
        <TextField
          style={{ width: "100%" }}
          placeholder={"To invite you to award shows"}
          label={"Your Instagram handle"}
          // onBlur={onBlur}
          variant="outlined"
          onChange={
            // () => {}
            (newVal) => onInstaUpdate(newVal.target.value)
            // (newVal) => onChangeText(newVal)
            // setSelectedItem({ ...item, heading: newVal.target.value })
          }
          value={instagramHandle}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div className="pt-8">
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

      <div className="pt-8">
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
      <div className="pt-8 flex justify-center">
        {onBack ? (
          <div className="pr-2">
            <Button appearance="ghost" onClick={onBack}>
              <p className="text-gray-700">Back</p>
            </Button>
          </div>
        ) : null}

        <div className="px-4">
          <Button
            // size="medium"
            appearance="contained"
            onClick={() => onButtonPress(name, instagramHandle, email)}
          >
            SAVE PROFILE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBrief;
