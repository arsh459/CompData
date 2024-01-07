import { format } from "date-fns";
import { View, Text, Image } from "react-native";

export const blogCardHeight = 115;

interface Props {
  title?: string;
  image?: string;
  readingTime?: number;
  publishedAt?: string;
}

const BlogCard: React.FC<Props> = ({
  title,
  image,
  readingTime,
  publishedAt,
}) => {
  return (
    <View className="bg-[#343150] p-4 flex flex-row">
      <Image
        className="w-1/3 aspect-video rounded-lg"
        source={{ uri: image }}
        resizeMode="cover"
      />
      <View className="w-4 aspect-square" />
      <View className="flex-1 flex justify-between">
        <Text className="text-xs iphoneX:text-sm text-white" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex flex-row items-center">
          <Text
            className="text-[10px] iphoneX:text-xs text-white/50"
            numberOfLines={1}
          >
            {`${readingTime} mins read`}
          </Text>
          {readingTime && publishedAt ? (
            <View className="w-1 aspect-square rounded-full bg-white mx-2" />
          ) : null}
          {publishedAt ? (
            <Text
              className="text-[10px] iphoneX:text-xs text-white/50"
              numberOfLines={1}
            >
              {format(new Date(publishedAt), "do,MMM,yy")}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default BlogCard;
