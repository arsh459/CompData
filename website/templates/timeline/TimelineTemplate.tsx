// import { useActivities } from "@hooks/activities/useActivities";
import { useTimelineActivities } from "@hooks/activities/useTimelineActivities";
import { UserInterface } from "@models/User/User";
import NextButton from "@templates/community/Program/NextButton";
import ActivityUserCard from "./ActivityUserCard";

interface Props {
  leader: UserInterface;
}

const TimelineTemplate: React.FC<Props> = ({ leader }) => {
  // const { activities, nextExists, onNext } = useActivities(
  //   leader.uid,
  //   20,
  //   "desc"
  // );

  const { dtArray, activities, onNext } = useTimelineActivities(leader.uid);

  // return <div></div>;

  // console.log("dtArray here", dtArray);
  // console.log("dtArray here", activities);

  // console.log("act", activities);
  return (
    <div className="px-4 py-4">
      <div className="pb-4">
        <p className="text-3xl font-semibold">{leader.name}</p>
        <p>{leader.phone}</p>
        <p>{leader.email}</p>

        <div className="pt-1">
          <p className="text-lg text-green-600 font-semibold">
            Wearable connected:{" "}
            {leader.terraUser ? `${leader.terraUser.provider}` : "NONE"}
          </p>
        </div>
      </div>

      {dtArray.map((item) => {
        return (
          <div key={item.dateBucket} className="pb-4">
            <ActivityUserCard
              start={item.start}
              uid={leader.uid}
              end={item.end}
              dtBucket={item.dateBucket}
              activities={activities[item.dateBucket]}
            />
          </div>
        );
      })}

      <div className="pt-8">
        <div className="w-full">
          <div className="bg-white">
            <NextButton onClick={onNext} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineTemplate;
