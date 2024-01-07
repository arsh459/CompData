import { getUserFitnessGoal } from "@models/User/parseUtils";
import { UserInterface } from "@models/User/User";
import { getUserListCardColors } from "@modules/Appointments/utils";
import UserImage from "@templates/listing/Header/UserImage";
import { extractName } from "@utils/extractName";
import React from "react";
import { getDocString } from "./utils";
interface Props {
  patient: UserInterface;
  showDoc?: boolean;
  time: string;
}
const PatientCard: React.FC<Props> = ({ patient, time, showDoc }) => {
  const goal = getUserFitnessGoal(patient);
  const { textColor } = getUserListCardColors(goal);

  return (
    <div
      className="w-full xs:h-fit  py-4 pl-4 sm:px-0  flex justify-between items-center sm:flex-col rounded-3xl border "
      // style={{ borderColor: textColor ? textColor : "#F62088" }}
    >
      {/* <div className="flex flex-row w-full sm:flex-col items-center flex-1"> */}
      <div className="flex   flex-row sm:flex-col">
        <div className="h-12 w-12 sm:h-3/5  sm:w-3/5 mx-auto ">
          {patient?.profileImage || patient?.name ? (
            <UserImage
              boxHeight="h-full "
              boxWidth="w-full"
              image={patient?.profileImage || undefined}
              name={patient?.name}
              color={textColor}
            />
          ) : null}
        </div>
        <div className="pl-4  sm:py-3.5 ">
          <p className="text-black text-base font-sans font-medium whitespace-pre-wrap w-full text-ellipsis line-clamp-1">
            {extractName(patient?.name || "")}
          </p>
          <p
            className=" text-xs font-medium font-sans "
            style={{ color: textColor }}
          >
            {goal?.toUpperCase() || "No Goal"}
          </p>
          {showDoc && patient.doctorIds ? (
            <p className="text-xs font-sans text-left">
              {getDocString(patient.doctorIds)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex  flex-col sm:flex-col-reverse w-2/5  sm:w-full gap-2 text-center text-xs font-normal font-sans ">
        <a href={`/admin/patients/${patient.uid}`}>
          <p
            className=" w-4/5 mx-auto  sm:text-[#252525] sm:font-medium rounded-full  py-1 sm:py-2"
            style={{
              backgroundColor: textColor ? `${textColor}26` : "#F6208826",
            }}
          >
            View details
          </p>
        </a>
        {time ? (
          <p className="text-[#8C8C8C] sm:text-start sm:pb-2 sm:pl-4">
            On {time}
          </p>
        ) : (
          <p className="text-[#8C8C8C] sm:text-start sm:pb-2 sm:pl-4"></p>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
