import { View, Text } from "react-native";

// import { useUserContext } from "@providers/user/UserProvider";
import UserImage from "@components/UserImage";
import { UserInterface } from "@models/User/User";
interface Props {
  user?: UserInterface;
}
const RecentVoucherBuyerCard: React.FC<Props> = ({ user }) => {
  // const { user } = useUserContext();

  return (
    <View className="flex justify-center items-center w-1/3 p-2">
      {user ? (
        <UserImage
          image={user?.profileImage}
          name={user?.name}
          width="w-16"
          height="h-16"
        />
      ) : null}
      <Text
        numberOfLines={1}
        className="text-[#C6C6C6] text-sm pt-2.5 capitalize"
        style={{ fontFamily: "BaiJamjuree-Regular" }}
      >
        {user?.name}
      </Text>
    </View>
  );
};

export default RecentVoucherBuyerCard;
