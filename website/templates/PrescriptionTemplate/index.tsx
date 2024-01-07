import { ChevronLeftIcon } from "@heroicons/react/solid";
import { getUserFitnessGoal } from "@models/User/parseUtils";
import { getUserListCardColors } from "@modules/Appointments/utils";
import { useRouter } from "next/router";
import { useUserSnapshot } from "@hooks/user/useUserSnapshot";
import { useAppointment } from "@hooks/appointments/useAppointment";
import PrescriptionHeader from "./PrescriptionHeader";
import { format } from "date-fns";
import ListElementCard from "@modules/Patients/ListElementCard";
import { getDeltaWeighLable } from "@modules/Consultation/Components/PrescriptionComp/LifeStyleGoles";
import { doctorFitnessGoal } from "@models/Appintment";
import { useUserV2 } from "@hooks/auth/useUserV2";
import ScreenToPDF from "@components/ScreenToPdf";
import { useRef } from "react";
import Loading from "@components/loading/Loading";

interface Props {
  appointmentId: string;
  onSignOut: () => void;
  isAdmin?: boolean;
  signedInUID: string;
}

const PrescriptionTemplate: React.FC<Props> = ({
  appointmentId,
  onSignOut,
  isAdmin,
  signedInUID,
}) => {
  const { appointment } = useAppointment(appointmentId);
  const { user } = useUserSnapshot(appointment?.patientId);
  const { user: doctor } = useUserV2(appointment?.doctorId);
  const goal = getUserFitnessGoal(user);
  const color = getUserListCardColors(goal).textColor;
  const printRef = useRef(null);

  const createdOnText = appointment?.startSlot
    ? format(new Date(appointment.startSlot), "do MMMM yyyy")
    : "NA";

  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  const doctorFitnessGoalObj: { [key in doctorFitnessGoal]: string } = {
    lose_weight: "🔥 Weight loss",
    gain_weight: "💪🏻 Weight Gain",
    keep_fit: "🤸🏻‍♀️ Keep Fit",
  };
  const lifestyleGoles = appointment?.prescriptionData?.lifestyle;
  const diet = appointment?.prescriptionData?.diet;

  // console.log("app", appointment);

  if (!user?.uid) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading fill="#ff735c" width={48} height={48} />
      </div>
    );
  } else if (isAdmin || signedInUID === user?.uid) {
    return (
      <div className="w-screen h-screen relative overflow-y-scroll z-0">
        <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
        <div
          className="w-full max-w-[987px] h-screen-safe overflow-y-scroll mx-auto bg-[#F6F6F6] "
          ref={printRef}
        >
          <div className="flex items-center justify-between py-4">
            <div onClick={onBack} className="cursor-pointer">
              <ChevronLeftIcon className="w-8 h-8" color="#23262F" />
            </div>

            <p className="text-[#23262F] text-base font-popSB flex-1 px-4 md:text-center">
              SocialBoat
            </p>
            <div className="hidden sm:block">
              <ScreenToPDF elementRef={printRef} />
            </div>
          </div>

          <div
            className="mx-4  pb-4 rounded-3xl "
            style={{ backgroundColor: `${color}1a`, borderColor: `${color}1a` }}
          >
            <PrescriptionHeader user={user} createdOnText={createdOnText} />

            <div className="md:p-4  rounded-2xl  md:rounded-[45px]  md:m-4 ">
              <ListElementCard
                primaryText="Provisional diagnosis :"
                secondaryText={
                  appointment?.prescriptionData?.diagnosis
                    ? `${appointment.prescriptionData.diagnosis}`
                    : "NA"
                }
                borderTw="border-none md:bg-white/40  rounded-2xl"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center sm:my-2 gap-2 ">
                <ListElementCard
                  primaryText="Medications :"
                  secondaryText={
                    appointment?.prescriptionData?.medications
                      ? `${appointment.prescriptionData.medications}`
                      : "NA"
                  }
                  borderTw="border-none self-start h-full md:bg-white/40  rounded-2xl"
                />
                <div>
                  <ListElementCard
                    primaryText="Supplementation :"
                    secondaryText={
                      appointment?.prescriptionData?.supplements
                        ? `${appointment.prescriptionData.supplements}`
                        : "NA"
                    }
                    borderTw="border-none  md:bg-white/40  rounded-2xl"
                  />
                  <ListElementCard
                    primaryText="Tests to be done :"
                    secondaryText={
                      appointment?.prescriptionData?.tests
                        ? `${appointment.prescriptionData.tests}`
                        : "NA"
                    }
                    borderTw="border-none sm:mt-2 md:bg-white/40  rounded-2xl"
                  />
                </div>
              </div>
              {appointment?.prescriptionData?.miscData ? (
                <div className="pb-2">
                  <ListElementCard
                    primaryText="Additional Info :"
                    secondaryText={
                      appointment?.prescriptionData?.miscData
                        ? `${appointment?.prescriptionData?.miscData}`
                        : "NA"
                    }
                    borderTw="border-none md:bg-white/40  rounded-2xl"
                  />
                </div>
              ) : null}
              {appointment?.prescriptionData?.menstrualData ? (
                <div className="pb-2">
                  <ListElementCard
                    primaryText="Menstruation Info :"
                    secondaryText={
                      appointment?.prescriptionData?.menstrualData
                        ? `${appointment?.prescriptionData?.menstrualData}`
                        : "NA"
                    }
                    borderTw="border-none md:bg-white/40  rounded-2xl"
                  />
                </div>
              ) : null}
              {appointment?.nextFollowupDateNote ? (
                <div className="pb-2">
                  <ListElementCard
                    primaryText="Followup info :"
                    secondaryText={
                      appointment?.nextFollowupDateNote
                        ? `${appointment?.nextFollowupDateNote}`
                        : "NA"
                    }
                    borderTw="border-none md:bg-white/40  rounded-2xl"
                  />
                </div>
              ) : null}
              <div className="md:bg-white/40  rounded-2xl">
                <ListElementCard
                  primaryText="Lifestyle Goals"
                  borderTw="border-y md:border-b md:border-t-0"
                />
                {/* <hr /> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b md:border-none border-black/10">
                  <div>
                    <ListElementCard
                      primaryText="Target :"
                      secondaryText={
                        lifestyleGoles?.goal
                          ? doctorFitnessGoalObj[lifestyleGoles?.goal]
                          : ""
                      }
                      borderTw="border-none md:border-b"
                      flexDirectionTw="flex flex-row items-center gap-2"
                      // secondaryTextStyleTw="text-xxl"
                    />
                    <ListElementCard
                      primaryText={"Weekly Exercise goal :"}
                      borderTw="border-none"
                      secondaryText={
                        lifestyleGoles?.weeklyExerciseGoal
                          ? `${lifestyleGoles?.weeklyExerciseGoal} times/week`
                          : ""
                      }
                      // flexDirectionTw="flex flex-row items-center gap-2"
                      //   secondaryTextStyleTw="text-xl"
                    />
                  </div>
                  {/* <ListElementCard
                    primaryText="Note for dietician :"
                    secondaryText={diet?.noteForDietician || "NA"}
                  /> */}
                  <div>
                    <ListElementCard
                      primaryText={
                        lifestyleGoles?.goal
                          ? `${getDeltaWeighLable(lifestyleGoles?.goal)}`
                          : ""
                      }
                      secondaryText={
                        lifestyleGoles?.weightDelta
                          ? ` ${lifestyleGoles?.weightDelta}kgs`
                          : ""
                      }
                      borderTw="border-none md:border-b"
                      flexDirectionTw="flex flex-row items-center gap-2"
                      //   secondaryTextStyleTw="text-xl"
                    />
                    <ListElementCard
                      primaryText="Nutrients to include :"
                      borderTw="border-none"
                      secondaryText={diet?.nutrientsToInclude || "NA"}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 border">
                  <ListElementCard
                    primaryText={appointment?.nextFollowupDate || "-"}
                    secondaryText={"Next follow up on "}
                    borderTw="border-none sm:m-2  "
                  />
                </div>
                <div className="flex-1 flex justify-end border">
                  <ListElementCard
                    primaryText={doctor?.name || "-"}
                    secondaryText={doctor?.landingContent?.docRegistrationId}
                    //   thirdText={doctor?.phone || "-"}
                    borderTw="border-none sm:m-2  "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center  h-screen">
        <p className="text-4xl font-bold">Unauthorized user</p>
        <p className="text-gray-700 pt-2 text-base">
          Please login with the correct phone number
        </p>
        <p
          onClick={onSignOut}
          className="pt-2 underline text-gray-700 text-base cursor-pointer"
        >
          Try again
        </p>
      </div>
    );
  }
};

export default PrescriptionTemplate;
