// import CreateModal from "./CreateModal/CreateModal";
// import { useClaps } from "@hooks/community/useClaps";
// import TopClose from "./Feed/TopClose";
import { Divider } from "@mui/material";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
// import ClapAvatar from "./ClapAvatar";
// import { useUserClaps } from "@hooks/community/useUserClaps";
// import { DocumentReference } from "@firebase/firestore";
import CreateModal from "../CreateModal/CreateModal";
import TopClose from "../Feed/TopClose";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  heading?: string;
  selectedPrize?: ListItem;
  //   signedInUID?: string;
  // eventId?: string;
  // postId?: string;
  // parentPostId?: string;
  //   postRef?: DocumentReference;
}

const PrizeModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  selectedPrize,
  //   signedInUID,
  // eventId,
  // postId,
  // parentPostId,
  //   postRef,
}) => {
  //   const { clappers } = useClaps(isOpen, postRef);

  // console.log("selectedPrize", selectedPrize?.heading);

  return (
    <div className="">
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onCloseModal}
        onCloseModal={onCloseModal}
        heading={""}
        onButtonPress={() => {}}
      >
        <>
          <div className="p-4 max-h-[85vh] overflow-y-auto scrollbar-hide relative">
            <div className="cursor-pointer">
              <TopClose onCloseModal={onCloseModal} />
              <div className="pt-2">
                <Divider />
              </div>
            </div>

            <p className="text-center pt-2 font-semibold">Rules</p>

            <div>
              {selectedPrize?.heading === "WeightLoss Champion" ? (
                <div>
                  <p className="text-sm pt-1">
                    {`1. Please upload a photograph of the weighing machine with today's newspaper.`}
                  </p>
                  <p className="text-sm pt-1">
                    {`2. We will not accept old photos here. The first photo will be considered the first entry`}
                  </p>
                  <p className="text-sm pt-1">
                    {`3. You are expected to post the first photo as early as possible`}
                  </p>
                  <p className="text-sm pt-1">
                    {`4. You can update this as many times.`}
                  </p>
                  <p className="text-sm pt-1">
                    {`5. Your last updated photo will be considered as the final entry.`}
                  </p>
                </div>
              ) : selectedPrize?.heading === "The Habit Ninja" ? (
                <div>
                  <p className="text-sm pt-1">
                    1.A day is considered successful workout, if you burn 500
                    calories
                  </p>
                  <p className="text-sm pt-1">
                    2. Your progress dashboard should have atleast 21 days of
                    500 calories burnt.
                  </p>
                  <p className="text-sm pt-1">
                    3. This will auto sync from your wearable, in case it
                    doesn’t, please upload relevant screenshots.
                  </p>
                  <p className="text-sm pt-1">
                    4. All start and end times are valid in IST only.
                  </p>
                </div>
              ) : selectedPrize?.heading === "HealthStreak Champ" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. This award is auto-calculated from your progress
                    dashboard.
                  </p>
                  <p className="text-sm pt-1">
                    2. In case your wearable is not auto-synced, please upload
                    workout screenshots with dates mentioned clearly.
                  </p>
                  <p className="text-sm pt-1">
                    3. Please note, we only consider active calories and not all
                    calories.
                  </p>
                  <p className="text-sm pt-1">
                    4. We encourage recovery days after every 6 days of workout
                    - so please do remember to take one off day.
                  </p>
                </div>
              ) : selectedPrize?.heading === "Champion Coach" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. The coach with most number of health-streaks wins this
                    reward.
                  </p>
                  <p className="text-sm pt-1">
                    2. Only the heatlstreak in the HealthStreak Champ awards are
                    considered for this and not other rewards.
                  </p>
                  <p className="text-sm pt-1">
                    3. Coaches can also share their own workouts as an
                    individual in the community
                  </p>
                </div>
              ) : selectedPrize?.heading === "Motivator Award" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. Clearly tag your coach, SocialBoat and share a link to
                    your coaches community in your story/post.
                  </p>
                  <p className="text-sm pt-1">
                    2. Assured rewards to every successful post.
                  </p>
                  <p className="text-sm pt-1">
                    3. In case you have a private account and SocialBoat did not
                    repost your story - please share screenshot in the
                    community.
                  </p>
                </div>
              ) : selectedPrize?.heading === "Fastest Santa" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. You can run outdoors or within a gym
                  </p>
                  <p className="text-sm pt-1">
                    2. If you are running outdoors, we need a screenshot of your
                    wearable app .
                  </p>
                  <p className="text-sm pt-1">
                    3. The Screenshot should clearly mention date, time,
                    distance, pace.
                  </p>
                  <p className="text-sm pt-1">
                    4. You have to run a min of 1km. We will consider only
                    average speed of the total distance run.
                  </p>
                  <p className="text-sm pt-1">
                    5. No entries will be considered after the end date
                  </p>
                </div>
              ) : selectedPrize?.heading === "NY Resolution Run" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. You can run outdoors or within a gym 2.
                  </p>
                  <p className="text-sm pt-1">
                    2. If you are running outdoors, we need a screenshot of your
                    wearable app.
                  </p>
                  <p className="text-sm pt-1">
                    3. The Screenshot should clearly mention date, time,
                    distance, steps.
                  </p>
                  <p className="text-sm pt-1">
                    4. You have to run a min of 1km. We will consider only
                    average speed of the total distance run.
                  </p>
                  <p className="text-sm pt-1">
                    5. No entries will be considered after the end date
                  </p>
                </div>
              ) : selectedPrize?.heading === "Smoothie Sunday" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. You submit your recipes on the 8th.
                  </p>
                  <p className="text-sm pt-1">
                    2. You can make recipe shared by anyone except yourself.
                  </p>
                  <p className="text-sm pt-1">
                    3. Please upload photos or videos of the smoothie/shake
                    after you have made.
                  </p>
                  <p className="text-sm pt-1">
                    4. The screenshot with most number of unique upvotes wins.
                  </p>
                </div>
              ) : selectedPrize?.heading === "PoseDay Winner" ? (
                <div>
                  <p className="text-sm pt-1">
                    1. Please record a video showing you + a clock or a spare
                    phone with stopwatch.
                  </p>
                  <p>2. The clock should clearly show a 2 minute countdown</p>
                  <p className="text-sm pt-1">
                    3. Your community coaches will judge and rate your
                    submissions.
                  </p>
                  <p className="text-sm pt-1">
                    4. Every winner gets a FlexNext exclusive voucher.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={onCloseModal}
              >
                Okay
              </button>
            </div>
          </div>
        </>
      </CreateModal>
    </div>
  );
};

export default PrizeModal;
