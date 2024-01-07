import { getBMI, getUserFitnessGoal } from "@models/User/parseUtils";
import { UserInterface } from "@models/User/User";
import { getUserListCardColors } from "@modules/Appointments/utils";
import UserImage from "@templates/listing/Header/UserImage";
import React from "react";
interface Props {
  user?: UserInterface;
}
const PatientsProfileHeader: React.FC<Props> = ({ user }) => {
  const goal = getUserFitnessGoal(user);
  const bmi = getBMI(user);
  const color = getUserListCardColors(goal).textColor;

  return (
    <div
      className="flex justify-between flex-1 rounded-t-[20px] rounded-b-lg p-4 "
      style={{ backgroundColor: `${color}1a` }}
    >
      <div className="flex flex-1 flex-col  md:flex-row md:items-center gap-4 md:gap-8">
        {/* Circle and name,age,cause */}
        <div className="flex items-center">
          {user?.profileImage || user?.name ? (
            <div
              className="p-1 border rounded-full"
              style={{ borderColor: `${color}80` }}
            >
              <UserImage
                boxHeight="h-12"
                boxWidth="w-12"
                image={user?.profileImage}
                name={user?.name}
                color={`${color}33`}
              />
            </div>
          ) : null}

          <div className=" text-xs font-popR pl-2 md:pl-3">
            <p className="text-black font-popM text-base pb-1.5">
              {user?.name}
            </p>
            <div className="flex items-center ">
              <p className="text-xs font-popR " style={{ color: "color" }}>
                {goal}
              </p>

              <p className="text-xs font-popR text-[#474747] pl-2">
                {user?.age ? `${user?.age} Years` : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Goal and Bmi */}
        <div className="flex-1">
          <p className="text-[#00000080] text-xs  flex ">
            <span className="font-popM text-black pr-2 ">Goal :</span>
            <span className="break-words font-popR flex-1 capitalize">
              {user?.fitnessGoal?.length
                ? user.fitnessGoal[0].replaceAll("_", " ")
                : "NA"}
            </span>
          </p>

          <p className="text-[#00000080]  text-xs pt-3">
            <span className="font-popM text-black">Body Mass Index :</span>
            <span className="font-popR"> {bmi}</span>
          </p>
        </div>
        {/* symptoms */}
        <p className="text-[#00000080]  text-xs self-start md:pr-5  md:pt-1">
          <span className="font-popM text-black">Symptoms : </span>
          <span className="font-popR">
            {user?.pcosSymptoms?.join(", ") || "NA"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PatientsProfileHeader;
