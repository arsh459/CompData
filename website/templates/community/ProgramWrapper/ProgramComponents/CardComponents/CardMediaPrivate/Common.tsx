import { postTypes } from "@hooks/community/v2/useCommunityParamsV3";
import { Activity } from "@models/Activities/Activity";
import ReviewStatusComponent from "../../ReviewStatusComponent";
import ViewResult from "../ViewResult";

interface Props {
  activityName: string;
  activity: Activity;
  fitPoints: number;
  totalFitPoints?: number;
  userLevel?: number;
  iButtonVisible: boolean;
  onPostClick: () => void;
  tryAgainURL: string;
  teamKey: string;
  eventKey: string;
  signedInUID: string;
  postType?: postTypes;
}

const Common: React.FC<Props> = ({
  activityName,
  activity,
  fitPoints,
  totalFitPoints,
  userLevel,
  iButtonVisible,
  onPostClick,
  tryAgainURL,
  teamKey,
  eventKey,
  signedInUID,
  postType,
}) => {
  return (
    <div className="bg-[#111111D6] border border-[#E0E0E0] rounded-3xl overflow-hidden italic">
      <div className="flex items-center border-b border-[#E0E0E0] px-3 py-2 iphoneX:px-4 iphoneX:py-2.5">
        <h2 className="flex-1 text-lg iphoneX:text-xl break-all font-bold line-clamp-1">
          {activityName === "Post"
            ? ""
            : activityName === "Terra"
            ? "Custom Workout"
            : activityName}
        </h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="flex-1 flex justify-center items-center px-3 py-2 iphoneX:px-4 iphoneX:py-2.5">
            {/* <img
              src={`https://ik.imagekit.io/socialboat/Vector__11__5Mi_iTCJd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650966172454`}
              className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-1 iphoneX:mr-2"
              alt="fitpoints icon"
            />
            <p className="text-sm iphoneX:text-xl font-bold whitespace-nowrap">
              {reviewStatus === "REVIEWED" ||
              reviewStatus === "SAVED" ||
              reviewStatus === "REVIEW_REQUEST"
                ? `${fitPoints} FP`
                : "-"}
            </p> */}
            {activity && postType !== "announcement" ? (
              <ReviewStatusComponent
                teamKey={teamKey}
                eventKey={eventKey}
                pointsSeen={activity.pointsSeen}
                taskId={activity.taskId}
                reviewStatus={activity.reviewStatus}
                totalFitPoints={totalFitPoints}
                fitPoints={fitPoints}
                activeMessage={activity.activeMessage}
                tryAgainURL={tryAgainURL}
                authorId={activity.authorUID}
                signedInUID={signedInUID}
                activity={activity}
                activityId={activity.id ? activity.id : activity.postId}
                isPrivatePost={true}
              />
            ) : null}
          </div>
          {/* <div className="flex-1 flex justify-center px-3 py-2 iphoneX:px-4 iphoneX:py-2.5 items-center">
            <img
              src={`https://ik.imagekit.io/socialboat/Ellipse_178_fH10R76Qkq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1650984146252`}
              className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 object-contain mr-1 iphoneX:mr-2"
              alt="fitpoints icon"
            />
            <p className="text-sm iphoneX:text-xl font-bold whitespace-nowrap">
              lvl {userLevel ? userLevel : 0}
            </p>
          </div> */}
        </div>
        <div className="flex justify-end px-2 py-2 iphoneX:px-4 iphoneX:py-2.5 items-center">
          {iButtonVisible ? <ViewResult onClick={onPostClick} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Common;
