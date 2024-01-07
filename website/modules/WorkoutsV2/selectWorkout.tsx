// import { useState } from "react";
// import Image from "next/image";
// import SearchIcon from "../../public/icons/SearchIcon";
import Fireicon from "../../public/icons/FireIcon";
import BackIcon from "../../public/icons/BackIcon";
import AddIcon from "@templates/community/Transformations/AddIcon";
import { useTasks } from "@hooks/tasks/useTasks";
import MediaTile from "@templates/listing/HeaderImage/MediaTile";
import { getFitPointString } from "@modules/PaymentPopover/utils";
import { Link } from "@mui/material";
import { taskType } from "@models/Tasks/Task";

interface Props {
  onSelectWorkoutFn: (newId: string, type?: taskType) => void;
  isAdmin: boolean;
  onBack: () => void;
}

// SHUBHAM: NEEDS TO GO
// IMPLEMENT SEARCH WITH FIRESTORE
// GET all tasks from DB
// Search on client side
// const workoutData = [
//   {
//     avatar: "https://img.icons8.com/ios-filled/50/000000/exercise.png",
//     name: "Running",
//     cal: "400",
//     id: "25bb08b1-cf3e-4180-9d58-3890ca1b1e28",
//   },
//   {
//     avatar: "https://img.icons8.com/ios-filled/50/000000/exercise.png",
//     name: "Walking",
//     cal: "200",
//     id: "ab",
//   },
//   {
//     avatar: "https://img.icons8.com/ios-filled/50/000000/exercise.png",
//     name: "Swimming",
//     cal: "600",
//     id: "abc",
//   },
//   {
//     avatar: "https://img.icons8.com/ios-filled/50/000000/exercise.png",
//     name: "Cycling",
//     cal: "100",
//     id: "abcd",
//   },
// ];

const SelectWorkout: React.FC<Props> = ({
  onSelectWorkoutFn,
  isAdmin,
  onBack,
}) => {
  const { taskList } = useTasks();
  // console.log("taskList", taskList);
  // console.log("isAdmin", isAdmin);

  // const [srchTxt, setSrchTxt] = useState("");
  // const [workoutArr, setWorkoutArr] = useState(workoutData);

  // SHUBHAM: Search with firestore
  // const updateSearchTxtFn = (val: string) => {
  //   setSrchTxt(val);
  //   let filteredWorkout = workoutData;
  //   if (val !== "") {
  //     filteredWorkout = workoutArr.filter((workout) => {
  //       if (workout.name.toLowerCase().startsWith(val.toLowerCase())) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   setWorkoutArr(filteredWorkout);
  // };

  return (
    <div>
      <div className="px-4 py-4 pt-6">
        <div className="flex justify-between">
          <div className="cursor-pointer" onClick={onBack}>
            <span className="text-gray-400 z-20 hover:text-gray-500">
              <BackIcon style={{ height: "25", width: "25", fill: "gray" }} />
            </span>
          </div>
          {/* <input
            type="text"
            value={srchTxt}
            className="h-14 text-2xl w-96 pr-8 pl-14 mr-5 mb-5 ml-5 border rounded z-0 focus:shadow focus:outline-none"
            placeholder="Search workout"
            onChange={(e) => updateSearchTxtFn(e.target.value)}
          />
          <div className="absolute top-8 right-9">
            <span className="text-gray-400 z-20 hover:text-gray-500">
              <SearchIcon style={{ height: "28", width: "28", fill: "gray" }} />
            </span>
          </div> */}
          {isAdmin ? (
            <div className="">
              <Link href="/addActivity" target="_blank">
                <AddIcon />
              </Link>
            </div>
          ) : null}
          {/* <div className="flex items-center sticky bg-white w-full px-2 py-0">
            <div className="pl-4">
              <h2 className="font-semibold text-2xl pb-0 text-left bg-white text-gray-700 ">
                {srchTxt !== "" && workoutArr.length === 0
                  ? "No workout found"
                  : "Select your workout"}
              </h2>
            </div>
          </div> */}
        </div>
      </div>
      <div className="px-4 py-4 pb-8">
        <h2 className="font-bold text-gray-700 text-3xl">
          Select your workout
        </h2>
      </div>
      <div className="flex flex-wrap justify-between">
        {/** SHUBHAM: Move to WorkoutCard */}
        {taskList.map(
          ({ name, fitPoints, avatar, id, durationMinutes, type }) => (
            <div
              className="flex cursor-pointer flex-col justify-start items-center  w-1/2 px-4 pb-8"
              key={id}
              onClick={() => onSelectWorkoutFn(id, type)}
            >
              {avatar ? (
                <div className="flex flex-none">
                  <MediaTile
                    alt={name ? name : "img"}
                    media={avatar}
                    width={360}
                    height={360}
                    paused={true}
                    // gif={true}
                    rPlayer={true}
                    rounded={true}
                    playing={false}
                    noControls={true}
                    widthString="w-full h-full border  shadow-sm"
                    roundedString="rounded-full"
                  />
                </div>
              ) : (
                <div className="bg-gray-100 flex-none w-1/2 h-1/2 rounded-full" />
              )}

              <div className="w-full pt-1 ">
                <div className="font-semibold text-center text-gray-700 text-lg capitalize">
                  {name}
                </div>

                {type === "mediaTask" ? (
                  <div className="flex justify-center pb-1">
                    <div className="px-2 py-0.5 rounded-md shadow-sm bg-orange-500">
                      <p className="text-white text-sm">Booster</p>
                    </div>
                  </div>
                ) : null}
                <div className="flex justify-center w-full ">
                  <Fireicon style={{ height: "20", width: "20" }} />
                  <p className="mx-1 break-all text-sm text-center text-gray-500 font-bolder">
                    {getFitPointString(fitPoints, durationMinutes, type)}
                  </p>
                </div>
                {isAdmin ? (
                  <Link href={`/admin/tasks/add?id=${id}`} target="_blank">
                    <p className="text-center text-sm underline">Edit</p>
                  </Link>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SelectWorkout;
