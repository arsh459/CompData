import { useLocalUser } from "@hooks/user/useLocalUser";
import Header from "@modules/Header";
import ProfileBrief from "@modules/JoinBoatMain/ProfileBrief";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  Platform,
} from "react-native";
import { updateUserBriefFields } from "./utils";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();

  const {
    localUser,
    uploadProfileImg,
    onBioUpdate,
    onNameUpdate,
    onEmailUpdate,
    onInstaUpdate,
  } = useLocalUser(user);

  const onSave = async (userId: string) => {
    await updateUserBriefFields(
      userId,
      localUser?.name,
      localUser?.instagramHandle,
      localUser?.email,
      localUser?.profileImage,
      localUser?.bio
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#100F1A]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1 ">
        <Header back={true} headerColor="#100F1A" tone="dark" />
        <View
          // className="flex-1"

          className="flex-1 flex justify-start items-center border p-4"
        >
          <ProfileBrief
            localUser={localUser}
            uploadProfileImg={uploadProfileImg}
            onNameUpdate={onNameUpdate}
            onEmailUpdate={onEmailUpdate}
            onInstaUpdate={onInstaUpdate}
            onBioUpdate={onBioUpdate}
          />
          <View className="flex pt-2 self-center ">
            <Pressable
              onPress={() => {
                user && onSave(user.uid);
                navigation.goBack();
              }}
              className="py-3 px-5 flex items-center justify-center rounded-md w-full shadow-sm bg-[#FF5970]"
            >
              <Text className="text-white  text-sm font-semibold ">
                SAVE PROFILE
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default EditProfile;
