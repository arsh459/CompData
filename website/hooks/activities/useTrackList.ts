import { Activity } from "@models/Activities/Activity";
// import { useDayActivityPosts } from "@hooks/activities/useDayActivityPosts";
import { useDayRawActivities } from "@hooks/activities/useDayRawActivities";
import { useEffect } from "react";
// import { FirestoreTerra } from "@models/Terra/TerraUser";

export const useTrackList = (uid: string, activities?: Activity[]) => {
  const { rawActivities } = useDayRawActivities(uid, activities);
  //   const { actPosts } = useDayActivityPosts(activities);
  //   const [totalfPoints, setTotalfPoints] = useState<number>(0);
  //   const [totalCalories, setTotalCalories] = useState<number>(0);
  //   const [totalDurationMinutes, setTotalDuration] = useState<number>(0);

  //   const [sortedActivities, setSortedActivities] = useState<
  //     (FirestoreTerra | Activity)[]
  //   >([]);

  useEffect(() => {
    // Write a function to sort activities && rawActivities
    if (activities) {
    }
  }, [activities, rawActivities]);
};

/**
 * Duration: minutes
 * Total fPoints
 * Date
 *
 * {[date: string]: Activity[]}
 * {[activityId: string]: Post}
 */
