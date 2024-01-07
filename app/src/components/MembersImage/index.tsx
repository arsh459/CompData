import UserImage from "@components/UserImage";
import { View, Text } from "react-native";
import clsx from "clsx";
import { getLevelColorV2 } from "@utils/level/levelColor";
import { UserInterface } from "@models/User/User";

interface Props {
  members: UserInterface[];
  membersCount?: number;
  size?: "xs" | "small" | "large";
  hidePlusOthers?: boolean;
  ring?: boolean;
  dark?: boolean;
  ringColor?: string;
}

const MembersImage: React.FC<Props> = ({
  members,
  size,
  membersCount,
  hidePlusOthers,
  ring,
  dark,
  ringColor,
}) => {
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
      {members.map((each) => {
        const color = ringColor
          ? ringColor
          : getLevelColorV2(each?.userLevelV2 ? each.userLevelV2 : 0).color;
        return (
          <View key={each.uid}>
            <View
              className={clsx(
                "rounded-full",
                size === "small"
                  ? "-ml-2 iphoneX:-ml-3"
                  : size === "large"
                  ? "-ml-6 iphoneX:-ml-7"
                  : size === "xs"
                  ? "-ml-1 iphoneX:-ml-2"
                  : "-ml-4 iphoneX:-ml-5"
              )}
              style={{ borderWidth: ring ? 2 : 0, borderColor: color }}
            >
              <UserImage
                image={each.profileImage}
                name={each.name}
                color="#313131"
                unknown={!each.profileImage && !each.name}
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
        );
      })}
      {!hidePlusOthers && membersCount && membersCount - members.length > 0 ? (
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
            +{membersCount - members.length}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default MembersImage;
