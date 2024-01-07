// import { usePostWithRef } from "@hooks/activities/usePostWithRef";
// import { useRawActivities } from "@hooks/activities/useRawActivities";
import { Activity } from "@models/Activities/Activity";
import { Post } from "@models/Posts/Post";
import { FirestoreTerra } from "@models/Terra/TerraUser";
// import clsx from "clsx";
// import { format } from "date-fns";
// import PostSnippet from "./PostSnippet";
// import RawActivityLine from "./RawActivityLine";

interface Props {
  uid: string;
  activities: (Activity | FirestoreTerra)[];
  posts: { [actId: string]: Post };
}

const UserActivityDetailsV2: React.FC<Props> = ({ activities, uid }) => {
  //   const { rawActivities, actSum, countedSum } = useRawActivities(
  //     uid,
  //     activity.id,
  //     true
  //   );

  //   const { post } = usePostWithRef(activity.postRef);

  // console.log(post);

  //   console.log("rawActivities", rawActivities);

  return <div className="border px-4 py-2 shadow-sm"></div>;
};

export default UserActivityDetailsV2;
