import Menu from "@components/Menu";
import UserImage from "@components/UserImage";
import LeaveTeam from "@modules/LeaveTeam";
import { useUserContext } from "@providers/user/UserProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable } from "react-native";
import clsx from "clsx";

interface Props {
  tone?: "dark" | "light";
}

const HeaderOption: React.FC<Props> = ({ tone }) => {
  const { user } = useUserContext();
  const { team } = useTeamContext();
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  return (
    <>
      <Pressable onPress={() => setIsMenuVisible(!isMenuVisible)}>
        <UserImage
          image={user?.profileImage}
          name={user?.name}
          width="w-8 iphoneX:w-10"
          height="h-8 iphoneX:h-10"
        />
      </Pressable>
      {user ? (
        <Menu
          visible={isMenuVisible}
          onClose={() => setIsMenuVisible(false)}
          menuItems={[
            {
              text: "profile",
              callback: () => navigation.navigate("User", { userId: user.uid }),
            },
            { text: "leave team", callback: () => setShowLeaveModal(true) },
          ]}
          menuColor={tone === "dark" ? "bg-stone-800" : "bg-stone-200"}
          menuItemsColor={tone === "dark" ? "bg-black" : "bg-white"}
          textStyle={clsx(
            tone === "dark" ? "text-white" : "text-black",
            "capitalize"
          )}
        />
      ) : null}
      <LeaveTeam
        visible={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        teamId={team?.id}
        userId={user?.uid}
      />
    </>
  );
};

export default HeaderOption;
