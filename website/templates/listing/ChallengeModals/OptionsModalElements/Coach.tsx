import MoreText from "@components/MoreText/MoreText";
import { WorkoutSeries } from "@models/Workouts/Series";

interface Props {
  eventSeries: WorkoutSeries[];
}

// const pointers = [
//   //   {
//   //     heading: "...Everything above",
//   //     text: "",
//   //     key: "access",
//   //   },
//   //   {
//   //     heading: "Community learning",
//   //     text: "Participate in discussions & interact with coach",
//   //     key: "community",
//   //   },
// ];

const Coach: React.FC<Props> = ({ eventSeries }) => {
  const cost = eventSeries.reduce((acc, item) => {
    return acc + item.cost;
  }, 0);

  return (
    <div>
      <div>
        <p className="text-orange-500 font-semibold text-center">₹{cost}</p>
      </div>
      <div className="pt-2">
        {/* {pointers.map((item) => {
          return (
            <div key={item.key} className="pr-1 pb-4">
              <p className="text-gray-700 text-sm font-semibold">
                {item.heading}
              </p>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          );
        })} */}
        <p className="text-gray-500 text-center font-semibold pb-2 text-sm">
          Daily Workout & nutrition plans 💪
        </p>
        {eventSeries.map((item) => {
          return (
            <div key={item.id} className="">
              <p className="text-gray-700 text-base font-medium">{item.name}</p>
              <MoreText text={item.description} numChars={120} size="sm" />
              {/* <p className="text-gray-500 text-sm">{item.description}</p> */}
              {item.numWorkouts > 0 ? (
                <p className="text-gray-700 text-sm font-medium">
                  {item.numWorkouts} workouts
                </p>
              ) : null}
              <p className="font-semibold text-sm text-gray-700 pt-2">
                Good for
              </p>
              <p className="text-sm text-gray-500">{item.goodFor}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Coach;
