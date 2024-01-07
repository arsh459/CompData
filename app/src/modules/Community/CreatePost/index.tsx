import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import BasicCTA from "@components/Buttons/BasicCTA";
import ImageWithURL from "@components/ImageWithURL";
import Loading from "@components/loading/Loading";
import MediaFile from "@components/MediaCard/MediaFile";
import UploadMedia from "@components/MediaPicker/UploadMedia";
import ProgressBar from "@components/ProgressBar";
import TypeWritter from "@components/TypeWritter";
import { addMediaIcon } from "@constants/imageKitURL";
import Header from "@modules/Header";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useNewPost } from "@hooks/postsV3/useNewPost";

const words = [
  "Cycled for 50kms 🚴",
  "Did a handstand for 45secs ⏱️",
  "100kg deadlift! Feeling 💪 ",
  "Join me for a run! 🏃‍♀️",
];

interface Props {
  postId?: string;
}

const CreatePost: React.FC<Props> = ({ postId }) => {
  const { uid, name, profileImage } = useUserStore(({ user }) => ({
    uid: user?.uid,
    name: user?.name,
    profileImage: user?.profileImage,
  }));

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const navigation = useNavigation();

  const { newPost, onUpdateText, onMediaDelete, onMediaUpload, onSave } =
    useNewPost("public", TEAM_ALPHABET_GAME, uid, name, profileImage, postId);

  const savePost = async () => {
    weEventTrack("WritePost_clickSavePost", {
      postId: newPost?.id || "no_postId",
      creatorId: uid || "no_creatorId",
    });
    if (newPost && (newPost.text || newPost.media.length)) {
      await onSave();
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <Header back={true} headerColor="#232136" tone="dark" />
      <View className="flex-1 flex flex-col bg-[#232136]">
        <View className="flex-1 flex flex-col relative z-0" style={{ flex: 1 }}>
          <TextInput
            className="flex-1 p-4"
            multiline
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            placeholder={hasFocus ? "How was your experience" : ""}
            placeholderTextColor="#7E7E7E"
            style={{ textAlignVertical: "top", color: "#FFFFFF" }}
            defaultValue={newPost?.text}
            onChangeText={onUpdateText}
          />
          <View
            className={clsx(
              "absolute left-3 top-3 z-0",
              (hasFocus || newPost?.text) && "hidden"
            )}
          >
            <TypeWritter textArr={words} textColor="#7E7E7E" />
          </View>
        </View>
        {newPost?.media.length ? (
          <View className="h-28 my-2">
            <FlatList
              data={newPost?.media}
              renderItem={({ item }) => (
                <View className="h-full aspect-square p-2">
                  <MediaFile mediaElement={item} onDelete={onMediaDelete} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : null}
        {progress > 0 && progress < 1 ? (
          <ProgressBar
            height={1}
            progress={progress * 100}
            activeColor="#3b82f6"
            inActiveColor="#7E7E7E"
          />
        ) : null}
        <SafeAreaView className="flex flex-row justify-center items-center border-t border-[#7D7D7D]">
          {uid ? (
            <>
              {progress > 0 && progress < 1 ? (
                <View className="w-1/2 p-4 flex justify-center items-center">
                  <Loading width="w-5" height="h-5" />
                </View>
              ) : (
                <UploadMedia
                  uid={uid}
                  className="w-1/2 p-4"
                  setMedia={onMediaUpload}
                  setProgress={setProgress}
                >
                  <View className="w-max flex flex-row justify-center items-center">
                    <ImageWithURL
                      source={{ uri: addMediaIcon }}
                      className="w-4 iphoneX:w-6 aspect-square"
                      resizeMode="contain"
                    />
                    <Text
                      className="pl-2.5 text-[#7D7D7D] text-sm iphoneX:text-base"
                      style={{ fontFamily: "Nunito-Medium" }}
                    >
                      Add Media
                    </Text>
                  </View>
                </UploadMedia>
              )}
            </>
          ) : null}
          <View className="w-1/2 p-4">
            <BasicCTA
              text="Post"
              onPress={savePost}
              color="bg-[#6D55D1] border-[#6D55D1]"
              disableColor="bg-[#6D55D1]/50 border-[#6D55D1]/50"
              paddingStr="px-4 py-2"
            />
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
