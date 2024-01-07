import { UserInterface } from "@models/User/User";
import { View, Text } from "react-native";
import { getLevelColorV4 } from "@utils/level/levelColor";
import CirclePercent from "@components/CirclePercent";
import UserImage from "@components/UserImage";

interface Props {
  user?: UserInterface;
  size?: number;
  strokeWidth?: number;
  padding?: number;
  fontSize?: number;
}

const UserProfile: React.FC<Props> = ({
  user,
  size,
  strokeWidth,
  padding,
  fontSize,
}) => {
  const progress = user?.progressV2 ? user.progressV2 : 0;
  const level = user?.userLevelV2 ? user.userLevelV2 : 0;
  const lvlData = getLevelColorV4(level);

  return (
    <View className="relative">
      <CirclePercent
        circleSize={size ? size : 50}
        percent={progress > 1 ? 1 : progress < 0 ? 0 : progress}
        activeColor={lvlData.color}
        inActiveColor={"#14131E"}
        strokeWidth={strokeWidth ? strokeWidth : 3}
        padding={padding ? padding : 2}
        showInactive={true}
        startAngle={207}
        circleRatio={0.85}
        noAnimation={true}
      >
        <UserImage
          image={user?.profileImage}
          name={user?.name}
          width="w-full"
          height="h-full"
        />
      </CirclePercent>
      <View className="absolute left-0 right-0 -bottom-1.5 flex justify-center">
        <Text
          style={{
            color: lvlData.color,
            fontFamily: "BaiJamjuree-Bold",
            fontSize: fontSize ? fontSize : 5,
            textAlign: "center",
          }}
        >
          Lvl {level}
        </Text>
      </View>
    </View>
  );
};

export default UserProfile;
