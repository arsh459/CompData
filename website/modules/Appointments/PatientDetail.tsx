import { useUserV2 } from "@hooks/auth/useUserV2";
import { useState } from "react";
import ListElementHeading from "./ListElementHeading";
import ListSelectElement from "./ListSelectElement";
import PatientListElement from "./PatientListElement";
import PreferenceListElement from "./PreferenceListElement";
import UserListCard from "./UserListCard";
import {
  calculateUserBMI,
  getArrayString,
  getBooleanStringData,
  getTrueKeysString,
  getUserListCardColors,
} from "./utils";
import { AppointmentInterface } from "@models/Appintment";
import { getUserFitnessGoal } from "@models/User/parseUtils";

import Link from "next/link";
// import { viewStyles } from "@templates/AppointmentTemplate/AppointmentsHeader";
interface Props {
  selected: AppointmentInterface;
  // viewStyle: viewStyles;

  // onBack: () => void;
  // show: boolean;
}

const PatientDetail: React.FC<Props> = ({ selected }) => {
  const { user } = useUserV2(selected.patientId);

  const [showDiet, setShowDiet] = useState(false);
  const [showLifestyle, setShowLifestyle] = useState(false);
  const goal = getUserFitnessGoal(user);
  const colors = getUserListCardColors(goal);
  const bmi = calculateUserBMI(user?.height, user?.weight);

  return (
    <>
      <div className="flex justify-between items-center rounded-b-none">
        <p className="text-[#23262F] text-xl font-qsB pl-4  capitalize ">
          Up Next
        </p>
        <Link href={`/admin/appointments/${selected.id}`}>
          <div className="flex text-[#00045A]  bg-gradient-to-r from-cyan-200 to-indigo-300 rounded-2xl px-7 py-2.5 items-center text-xs font-popM">
            <p>Consultation</p>
          </div>
        </Link>
      </div>

      <div className="w-full pt-4 h-[77vh] bg-white  overflow-y-scroll   rounded-t-none rounded-b-3xl lg:mx-auto">
        <div
          className="w-full h-full   pb-4  overflow-y-scroll rounded-[20px]"
          style={{
            backgroundColor: colors.borderColor
              ? colors.borderColor
              : "#F62088",
          }}
        >
          {selected ? (
            <UserListCard
              noBorder={true}
              navOnProfile={true}
              isDetailCard={true}
              appointment={selected}
              showDocName={false}
            />
          ) : null}
          {showLifestyle || showDiet ? null : (
            <>
              <PatientListElement
                primaryKey={"Goal :"}
                primaryValue={goal || "NA"}
                secondaryKey="BMI :"
                secondaryValue={bmi}
              />

              <PatientListElement
                primaryKey="Average cycle :"
                primaryValue={`${
                  user?.periodTrackerObj?.inputCycleLength || "NA"
                }`}
                secondaryKey="Average period length :"
                secondaryValue={`${
                  user?.periodTrackerObj?.inputPeriodLength || "NA"
                }`}
              />

              <div className="bg-[#FFECF5] rounded-2xl p-4 mx-4 my-2">
                <p className="text-[#00000080] font-popR text-sm flex ">
                  <span className="font-popM text-black">Chief complaints</span>
                </p>
                <p className="text-[#00000080] font-popR text-sm pt-2.5">
                  <span> {selected.chiefComplaints || "NA"}</span>
                </p>
              </div>
              <PatientListElement
                primaryKey="Symptoms during period :"
                primaryValue={
                  getArrayString(
                    user?.periodTrackerObj?.symptomsDuringPeriod
                  ) || "NA"
                }
              />

              <PatientListElement
                primaryKey="Symptoms before period :"
                primaryValue={
                  getArrayString(
                    user?.periodTrackerObj?.symptomsBeforePeriod
                  ) || "NA"
                }
              />

              <div className="block lg:flex items-center justify-between">
                <ListSelectElement
                  onClick={() => setShowLifestyle(true)}
                  text="Overall Lifestyle"
                />
                <ListSelectElement
                  onClick={() => setShowDiet(true)}
                  text="Diet Preference"
                />
              </div>
              <div className="bg-[#FFECF5]  rounded-2xl p-4 py-3 mx-4 my-2">
                <div className="flex justify-between items-center">
                  <p className="text-[#00000080] font-popR text-sm flex ">
                    <span className="font-popM text-black">
                      Medical History{" "}
                    </span>
                  </p>
                  {/* <div className="rounded-3xl border border-[#FDC1DD] py-2 px-3">
                    <p className="cursor-pointer  text-[#F62088] text-xs font-popR">
                      View past reports
                    </p>
                  </div> */}
                </div>
                {/* <p className="text-[#00000080] text-xs break-words  font-popR text-ellipsis line-clamp-2 py-2">
                  {selected?.prescriptionData?.diagnosis}
                </p> */}
                <div className="pt-2">
                  <p className="text-[#00000080] font-popR text-sm flex ">
                    <span className="font-popM text-black">
                      Pregnancy History :
                    </span>
                    <span className="break-words  pl-2">
                      {" "}
                      {getBooleanStringData(
                        user?.doctorForm?.pregnantHistory,
                        user?.doctorForm?.pregnancyDate
                      )}
                    </span>
                  </p>
                  <p className="text-[#00000080] font-popR text-sm flex pt-1">
                    <span className="font-popM text-black">
                      Surgerical History :
                    </span>
                    <span className="break-words  pl-2">
                      {" "}
                      {getBooleanStringData(
                        user?.doctorForm?.surgicalHistory,
                        user?.doctorForm?.surgeryBrief
                      )}
                    </span>
                  </p>
                  <p className="text-[#00000080] font-popR text-sm flex pt-1 ">
                    <span className="font-popM text-black">
                      Sexially Active :
                    </span>
                    <span className="break-words  pl-2">
                      {" "}
                      {user?.doctorForm?.sexuallyActive ? "YES" : "NO"}
                    </span>
                  </p>

                  <p className="text-[#00000080] font-popR text-sm flex pt-1 ">
                    <span className="font-popM text-black">
                      Family History :
                    </span>
                    <span className="break-words  pl-2">
                      {" "}
                      {getTrueKeysString(user?.dietForm?.familyHistory)}
                      {user?.dietForm?.familyHistoryText
                        ? `, ${user.dietForm.familyHistoryText}`
                        : ""}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
          {showLifestyle ? (
            <div className="bg-[#FFFFFF73] rounded-2xl  mx-4 my-2 ">
              <ListElementHeading
                onClick={() => setShowLifestyle(false)}
                text="Overall Lifestyle"
              />

              <PreferenceListElement
                primaryText="How often user works out?"
                secondaryText={
                  user?.dietForm?.exerciseDayInWeek
                    ? `${user?.dietForm?.exerciseDayInWeek} times/week`
                    : "NA"
                }
              />
              <PreferenceListElement
                primaryText="Any supplements taken?"
                secondaryText={
                  getTrueKeysString(user?.dietForm?.medication) || "NA"
                }
              />
              <PreferenceListElement
                primaryText="Daily Water consumption?"
                secondaryText={
                  user?.dietForm?.waterIntakeDaily
                    ? `${user?.dietForm?.waterIntakeDaily} glass a day`
                    : "NA"
                }
              />
              <PreferenceListElement
                primaryText="Eating out frequency?"
                secondaryText={
                  user?.dietForm?.outsideFoodInWeek
                    ? `${user?.dietForm?.outsideFoodInWeek} times in a week`
                    : "NA"
                }
              />
              <PreferenceListElement
                primaryText="Working hours?"
                secondaryText={
                  user?.dietForm?.workingHour
                    ? `${user?.dietForm?.workingHour} Hrs / day`
                    : "NA"
                }
              />

              <PreferenceListElement
                primaryText="Alcohol or Smoking?"
                secondaryText={
                  `${getTrueKeysString(user?.dietForm?.addiction)}${
                    user?.dietForm?.addictionText
                      ? `, ${user.dietForm.addictionText}`
                      : ""
                  }` || "NA"
                }
              />

              <div className="px-4 py-5 border-b border-[#00000014]" />
            </div>
          ) : null}
          {showDiet ? (
            <div className="bg-[#FFFFFF73] rounded-2xl  mx-4 my-2 ">
              <ListElementHeading
                onClick={() => setShowDiet(false)}
                text="Diet Lifestyle"
              />

              <PreferenceListElement
                primaryText="Please tell about your cuisine preference ? "
                secondaryText={
                  getTrueKeysString(user?.dietForm?.cuisinePreference) || "NA"
                }
              />
              <PreferenceListElement
                primaryText="Do you have any food allergies?"
                secondaryText={
                  getTrueKeysString(user?.dietForm?.allergies) || "NA"
                }
              />
              <PreferenceListElement
                primaryText="Daily Water consumption?"
                secondaryText={
                  user?.dietForm?.waterIntakeDaily
                    ? `${user?.dietForm?.waterIntakeDaily} glass a day`
                    : "NA"
                }
              />
              <PreferenceListElement
                primaryText="Eating out frequency?"
                secondaryText={
                  user?.dietForm?.outsideFoodInWeek
                    ? `${user?.dietForm?.outsideFoodInWeek} times in a week`
                    : "NA"
                }
              />

              <div className="px-4 py-5 border-b border-[#00000014]" />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default PatientDetail;
