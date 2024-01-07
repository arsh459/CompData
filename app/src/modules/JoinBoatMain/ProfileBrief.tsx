import UploadMedia from "@components/MediaPicker/UploadMedia";
import TextField from "@components/TextField";
import UserImage from "@components/UserImage";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { UserInterface } from "@models/User/User";
import { View, Text, Platform } from "react-native";

interface Props {
  localUser: UserInterface | undefined;
  uploadProfileImg: (file: (CloudinaryMedia | AWSMedia)[]) => void;
  onNameUpdate: (val: string) => void;
  onEmailUpdate: (val: string) => void;
  onInstaUpdate: (val: string) => void;
  onBioUpdate: (val: string) => void;
}

const ProfileBrief: React.FC<Props> = ({
  localUser,
  uploadProfileImg,
  onNameUpdate,
  onEmailUpdate,
  onInstaUpdate,
  onBioUpdate,
}) => {
  return (
    <View
      // contentContainerStyle={{ flex: 1 }}
      className="bg-[#100F1A]  p-4"
      // behavior="position"
    >
      <View className="flex justify-center items-center pb-2 iphoneX:pb-4">
        {localUser?.profileImage || localUser?.name ? (
          <UserImage
            image={localUser?.profileImage}
            name={localUser?.name}
            width="w-24"
            height="h-24"
          />
        ) : (
          <UploadMedia
            uid={localUser ? localUser.uid : ""}
            setMedia={uploadProfileImg}
            className="w-24 iphoneX:w-28 aspect-square"
          >
            <View className="bg-[#444444] w-full h-full rounded-full flex justify-center items-center">
              <Text className="text-4xl text-white">+</Text>
            </View>
          </UploadMedia>
        )}
        <UploadMedia
          uid={localUser ? localUser.uid : ""}
          setMedia={uploadProfileImg}
          className="flex justify-center items-center"
        >
          <Text className="text-xs iphoneX:text-sm text-white py-4">
            {`${
              localUser?.profileImage || localUser?.name ? "Change" : "Upload"
            } Profile Picture`}
          </Text>
        </UploadMedia>
      </View>
      <View>
        <TextField
          text={localUser?.name}
          onChange={onNameUpdate}
          textStyle="text-xs"
          outlined={true}
          placeHolder={Platform.OS === "ios" ? "Your handle" : "Name"}
          roundStr="rounded-lg"
          textColor="text-white/80"
          outlinColor="border-[#F5F5F7]/80"
          bgPlaceHolderColor="bg-[#100F1A]"
        />
        {Platform.OS === "ios" ? (
          <View className="pb-2">
            <Text className="text-[#F5F8FF] text-xs font-light p-2 pt-0">
              *What your player will be called
            </Text>
          </View>
        ) : null}
      </View>
      <TextField
        text={localUser?.email}
        onChange={onEmailUpdate}
        outlined={true}
        placeHolder="E-mail"
        roundStr="rounded-lg"
        textStyle="text-xs"
        textColor="text-white/80"
        outlinColor="border-[#F5F5F7]/80"
        bgPlaceHolderColor="bg-[#100F1A]"
      />
      {/* <TextField
        text={localUser?.instagramHandle}
        onChange={onInstaUpdate}
        outlined={true}
        placeHolder="Instagram Handle"
        roundStr="rounded-lg"
        outlinColor="border-[#F5F5F7]"
        bgPlaceHolderColor="bg-[#100F1A]"
      /> */}
      <TextField
        text={localUser?.bio}
        onChange={onBioUpdate}
        multiline={true}
        outlined={true}
        textColor="text-white/80"
        placeHolder="Bio"
        textStyle="text-xs"
        roundStr="rounded-lg"
        outlinColor="border-[#F5F5F7]/80"
        bgPlaceHolderColor="bg-[#100F1A]"
      />
    </View>
  );
};

export default ProfileBrief;
