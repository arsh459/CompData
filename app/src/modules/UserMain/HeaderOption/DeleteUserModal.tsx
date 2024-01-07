import UseModal from "@components/UseModal";
import clsx from "clsx";
import { Pressable, Text, View } from "react-native";
// import auth from "@react-native-firebase/auth";
import { useAuthContext } from "@providers/auth/AuthProvider";
import axios from "axios";
import { useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  //   const navigation = useNavigation();
  const { signOut, state } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios({
        url: "https://asia-south1-holidaying-prod.cloudfunctions.net/deleteUser",
        method: "POST",
        data: {
          uid: state.uid,
        },
      });
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error", error);
    }
    signOut();
  };
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      bgColor="bg-[#292832]"
    >
      <View className="flex items-center justify-center flex-1">
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-[#FF556C] text-3xl"
        >
          {loading ? "Deleting Data ..." : "Are you sure?"}
        </Text>
        <Text
          style={{ fontFamily: "BaiJamjuree-Medium" }}
          className="text-white text-base px-4 py-2"
        >
          {loading
            ? "This action may take a few minutes. You can quit the app if you prefer"
            : "This action is irreversible. Once your account is deleted it cannot be recovered. Please note it might take 10-15 minutes for your data to be deleted"}
        </Text>

        {loading ? null : (
          <View className="flex flex-row justify-end py-4">
            <View className="pr-2">
              <Pressable
                className={clsx(
                  "rounded-lg border border-[#FF93A2] p-2 "
                  // "bg-[#FF556C]"
                  // "opacity-0"
                )}
                onPress={onDelete}
              >
                <Text
                  style={{ fontFamily: "BaiJamjuree-Medium" }}
                  className="font-medium text-white text-xl text-center"
                >
                  Delete My Account
                </Text>
              </Pressable>
            </View>
            <Pressable
              className={clsx(
                "rounded-lg border border-[#FF93A2] p-2 ",
                "bg-[#FF556C]"
                // "opacity-0"
              )}
              onPress={onClose}
            >
              <Text
                style={{ fontFamily: "BaiJamjuree-Medium" }}
                className="font-medium text-white text-xl text-center"
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </UseModal>
  );
};

export default DeleteUserModal;
