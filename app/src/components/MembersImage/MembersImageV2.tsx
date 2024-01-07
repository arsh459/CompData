import UserImage from "@components/UserImage";
import { View, Text } from "react-native";
import clsx from "clsx";
import { getLevelColorV2 } from "@utils/level/levelColor";
import { useUserV2 } from "@hooks/auth/useUserV2";

interface Props {
  members: string[];
  numOfMembers?: number;
  size?: "xs" | "small" | "large";
  hidePlusOthers?: boolean;
  ring?: boolean;
  dark?: boolean;
}

const MembersImageV2: React.FC<Props> = ({
  members,
  numOfMembers,
  size,
  hidePlusOthers,
  ring,
  dark,
}) => {
  const remoteNumOfMembers = numOfMembers ? numOfMembers + 1 : 3;
  const remoteMembers =
    members.length > remoteNumOfMembers
      ? members.slice(0, remoteNumOfMembers)
      : members;

  return (
    <View
      className={clsx(
        size === "small"
          ? "pl-2 iphoneX:pl-3"
          : size === "large"
          ? "pl-6 iphoneX:pl-7"
          : size === "xs"
          ? "pl-1 iphoneX:pl-2"
          : "pl-4 iphoneX:pl-5",
        "flex flex-row justify-center items-center"
      )}
    >
      {remoteMembers.map((each) => {
        const { user } = useUserV2(each);
        const color = getLevelColorV2(
          user?.userLevelV2 ? user.userLevelV2 : 0
        ).color;
        return user ? (
          <View key={user.uid}>
            <View
              className={clsx(
                ring ? "rounded-full border-2" : "",
                size === "small"
                  ? "-ml-2 iphoneX:-ml-3"
                  : size === "large"
                  ? "-ml-6 iphoneX:-ml-7"
                  : size === "xs"
                  ? "-ml-1 iphoneX:-ml-2"
                  : "-ml-4 iphoneX:-ml-5"
              )}
              style={{ borderColor: `${color}` }}
            >
              <UserImage
                image={user.profileImage}
                name={user.name}
                color="#313131"
                unknown={!user.profileImage && !user.name}
                width={
                  size === "small"
                    ? "w-6 iphoneX:w-8"
                    : size === "large"
                    ? "w-14 iphoneX:w-16"
                    : size === "xs"
                    ? "w-3 iphoneX:w-5"
                    : "w-10 iphoneX:w-12"
                }
                height={
                  size === "small"
                    ? "h-6 iphoneX:h-8"
                    : size === "large"
                    ? "h-14 iphoneX:h-16"
                    : size === "xs"
                    ? "h-3 iphoneX:h-5"
                    : "h-10 iphoneX:h-12"
                }
              />
            </View>
          </View>
        ) : null;
      })}
      {!hidePlusOthers && members.length - remoteNumOfMembers > 0 ? (
        <View
          className={clsx(
            "bg-stone-500 flex justify-center items-center rounded-full overflow-hidden",
            size === "small"
              ? "w-6 iphoneX:w-8 h-6 iphoneX:h-8 -ml-2 iphoneX:-ml-3"
              : size === "large"
              ? "w-14 iphoneX:w-16 h-14 iphoneX:h-16 -ml-6 iphoneX:-ml-7"
              : size === "xs"
              ? "w-3 iphoneX:w-5 h-3 iphoneX:h-5 -ml-1 iphoneX:-ml-2"
              : "w-10 iphoneX:w-12 h-10 iphoneX:h-12 -ml-4 iphoneX:-ml-5"
          )}
        >
          <Text
            className={clsx(
              "text-white",
              size === "small"
                ? "text-[10px] iphoneX:text-xs"
                : size === "large"
                ? "text-xl iphoneX:text-2xl"
                : size === "xs"
                ? "text-[6px] iphoneX:text-[8px]"
                : "text-base iphoneX:text-lg"
            )}
          >
            +{members.length - remoteNumOfMembers}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default MembersImageV2;
