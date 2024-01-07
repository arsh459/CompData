import GradientWaveCircle from "@components/GradientWaveCircle";
import SvgIcons from "@components/SvgIcons";
import UserProfile from "@components/UserProfile";
import { announcementIcon, spotlightIcon } from "@constants/imageKitURL";
import { Post } from "@models/Post/Post";
import { UserInterface } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
import { format } from "date-fns";
import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import ReportModal from "./ReportModal";

interface Props {
  post: Post;
  leader?: UserInterface;
  teamName?: string;
  showDetailsModal: () => void;
  colors?: boolean;
}

const CardHeader: React.FC<Props> = ({
  post,
  leader,
  teamName,
  showDetailsModal,
  colors,
}) => {
  const [reportOpen, setReportOpen] = useState<boolean>(false);
  const onClose = () => setReportOpen(false);
  const onOpen = () => {
    weEventTrack("community_clickMoreIcon", { target: "Post" });
    setReportOpen(true);
  };

  return (
    <View className="flex flex-row justify-between py-3 px-4">
      <ReportModal
        contentUID={post.creatorId}
        postId={post.id}
        isOpen={reportOpen}
        onClose={onClose}
        target="Post"
        screen="community"
      />
      <View className="flex-1 flex flex-row">
        <Pressable onPress={showDetailsModal}>
          <UserProfile user={leader} size={48} />
        </Pressable>
        <View className="flex-1 pl-4">
          <View className="flex-1 flex flex-row items-center mr-16">
            <Text
              numberOfLines={1}
              className={clsx(
                colors ? "text-[#100F1A]" : "text-white",
                "font-bold text-base iphoneX:text-xl"
              )}
              onPress={showDetailsModal}
            >
              {post.creatorName}
            </Text>
            {post.postType ? (
              <>
                <View className="w-1 aspect-square rounded-full bg-[#81809B] mx-3" />
                <GradientWaveCircle
                  color1={post.postType === "spotlight" ? "#A9E0F5" : "#F890C6"}
                  color2={post.postType === "spotlight" ? "#C0FEC2" : "#FF6E8B"}
                >
                  <Image
                    source={{
                      uri:
                        post.postType === "spotlight"
                          ? spotlightIcon
                          : announcementIcon,
                    }}
                    className="w-1/3 aspect-square"
                    resizeMode="contain"
                  />
                </GradientWaveCircle>
              </>
            ) : null}
          </View>
          <View className="flex flex-row items-center">
            {teamName ? (
              <>
                <Text className="text-xs text-[#0085E0]">
                  @
                  {teamName && teamName.length > 12
                    ? `${teamName.slice(0, 12)}...`
                    : teamName
                    ? teamName
                    : ""}
                </Text>
                <Text className="w-0.5 aspect-square rounded-full bg-[#4D4C5C] mx-2" />
              </>
            ) : null}
            <Text
              className={clsx(
                colors ? "text-[#464554]" : "text-[#81809B]",
                "text-xs"
              )}
            >
              {format(new Date(post.updatedOn), "hh:mmaaa dd MMM")}
            </Text>
          </View>
        </View>
        <Pressable
          className="w-5 mt-1 iphoneX:w-6 aspect-square"
          onPress={onOpen}
        >
          <SvgIcons iconType="moredot" color={colors ? "#100F1A" : undefined} />
        </Pressable>
      </View>
    </View>
  );
};

export default CardHeader;
