import { View, Text, Pressable } from "react-native";
import UserImage from "@components/UserImage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { ReactNode } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  optionNode?: ReactNode;
  defaultOption?: boolean;
  defaultOptionOnPress?: () => void;
}

const OptionNode: React.FC<Props> = ({
  optionNode,
  defaultOption,
  defaultOptionOnPress,
}) => {
  const { state, signInRequest } = useAuthContext();
  const navigation = useNavigation();

  const { name, profileImage } = useUserStore(({ user }) => {
    return {
      name: user?.name,
      profileImage: user?.profileImage,
    };
  }, shallow);

  return defaultOption || optionNode ? (
    <>
      {state.status === "SUCCESS" ? (
        <View className="ml-3 flex flex-row items-center">
          {optionNode ? optionNode : null}
          {defaultOption ? (
            <Pressable
              onPress={() => {
                if (defaultOptionOnPress) {
                  defaultOptionOnPress();
                } else {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }

                weEventTrack("home_clickProfile", {});
              }}
            >
              <UserImage
                image={profileImage}
                name={name}
                width="w-8 iphoneX:w-10"
                height="h-8 iphoneX:h-10"
              />
            </Pressable>
          ) : null}
        </View>
      ) : (
        <Text
          className="text-[#ff735c] iphoneX:text-lg"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          onPress={() => signInRequest()}
        >
          Sign In
        </Text>
      )}
    </>
  ) : null;
};

export default OptionNode;
