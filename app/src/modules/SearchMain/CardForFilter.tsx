import { TouchableOpacity } from "react-native";
import TaskCard from "./TaskCard";
import ReelCard from "./ReelCard";
import { getDateStr } from "@modules/Nutrition/V2/DaySelector/hooks/useBadgeProgressCalender";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import ResultCard from "./ResultCard";
import { useNavigation } from "@react-navigation/native";
import BlogCard from "./BlogCard";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { useNavStore } from "@providers/nav/navStore";
import { shallow } from "zustand/shallow";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  item: AlgoliaAppSearch;
  index: number;
}

const CardForFilter: React.FC<Props> = ({ item, index }) => {
  const navigation = useNavigation();

  const { subStatus } = useSubscriptionContext();

  let go: boolean = false;
  if (subStatus === "SUBSCRIBED") {
    go = true;
  } else if (item.freeTask) {
    go = true;
  }

  const setWorkoutFinish = useNavStore(
    (state) => state.setWorkoutFinishNav,
    shallow
  );

  const filter = useAlgoliaStore((state) => state.filter);

  const reelPress = () => {
    if (item.tags?.includes("Recipes")) {
      navigation.navigate("RecipeeDetailScreen", { taskId: item.objectID });
    } else {
      navigation.navigate("ReelView", { taskId: item.objectID });
    }

    weEventTrack("searchReelItem", {});
  };

  const workoutPress = (item: AlgoliaAppSearch) => {
    if (go) {
      navigation.navigate("CourseTaskPreviewScreen", {
        taskId: item.objectID,
        attemptedDate: getDateStr(new Date()),
      });

      weEventTrack("searchWorkoutItem", {});
      setWorkoutFinish("WorkoutDoneScreen");
    } else {
      navigation.navigate("UpgradeScreen");
      weEventTrack("searchProItem", {});
    }
  };

  const nutritionPress = () => {
    if (item.tags?.includes("Recipes")) {
      navigation.navigate("RecipeeDetailScreen", { taskId: item.objectID });
    } else {
      navigation.navigate("MealScreen", {
        taskId: item.objectID,
        // badgeId: item.badgeId || "",
        selectedUnix: Date.now(),
      });
    }

    weEventTrack("searchNutritionItem", {});
  };

  const blogPress = () => {
    if (item.slug) {
      navigation.navigate("BlogScreen", {
        name: item.name || item.slug,
        source: `https://www.socialboat.live/blog/post/${item.slug}?noHeader=true`,
      });

      weEventTrack("searchBlogItem", {});
    }
  };

  const resultPress = () => {
    if (item.taskType === "reel") {
      reelPress();
    } else if (item.taskType === "workout") {
      workoutPress(item);
    } else if (item.taskType === "recipee") {
      nutritionPress();
    } else if (item.taskType === "blog") {
      blogPress();
    }
  };

  switch (filter) {
    case "reel":
    case "recipee":
      return (
        <TouchableOpacity onPress={reelPress}>
          <ReelCard
            name={item?.name}
            userId={item?.userId}
            reelThumbnail={item.reelThumbnail}
            reelMediaDuration={item.mediaDuration}
          />
        </TouchableOpacity>
      );
    case "workout":
      return (
        <TouchableOpacity onPress={() => workoutPress(item)}>
          <TaskCard
            isPro={!go}
            item={item}
            cardType="workout"
            arrowColor="#19C8FF"
          />
        </TouchableOpacity>
      );

    case "blog":
      return (
        <TouchableOpacity onPress={blogPress}>
          <BlogCard
            title={item.name}
            image={item.feature_image}
            readingTime={item.reading_time}
            publishedAt={item.published_at}
          />
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity onPress={resultPress}>
          <ResultCard
            index={index}
            contentType={item.taskType}
            heading={item.name}
            isPro={!go}
            media={
              item.thumbnail ||
              item.reelThumbnail ||
              item.videoThumbnail ||
              item.feature_image
            }
          />
        </TouchableOpacity>
      );
  }
};

export default CardForFilter;
