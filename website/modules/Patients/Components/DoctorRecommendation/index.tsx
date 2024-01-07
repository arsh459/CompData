import { AppointmentInterface } from "@models/Appintment";
import { UserInterface } from "@models/User/User";
import ListElementCard from "@modules/Patients/ListElementCard";
import React, { useState } from "react";
import ListExpander from "../ListExpander";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { getDoctorRecommendationEditObject } from "@modules/Patients/utils/DoctorRecommendationUtils";

interface Props {
  user?: UserInterface;
  appointment?: AppointmentInterface;
  color: string;
  highlightColor: string;
  onEdit?: (val: EditObject) => void;
}

const DoctorRecommendation: React.FC<Props> = ({
  user,
  appointment,
  color,
  highlightColor,
  onEdit,
}) => {
  const [show, setShow] = useState(false);
  const onExpand = () => {
    setShow((p) => !p);
  };

  const handleEdit = onEdit
    ? () => {
        onEdit(getDoctorRecommendationEditObject(appointment));
      }
    : undefined;

  return (
    <ListExpander
      onExpand={onExpand}
      show={show}
      headingText="Doc Consultation Summary"
      color={color}
      highlightColor={highlightColor}
      onEdit={handleEdit}
    >
      {show ? (
        <div>
          <div className="bg-black/10 h-px w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10">
            <div className="mx-0">
              <ListElementCard
                primaryText="Lifestyle Goal"
                secondaryText={
                  appointment?.prescriptionData?.lifestyle?.goal
                    ? `${appointment?.prescriptionData?.lifestyle?.goal}`
                    : "NA"
                }
              />
              <ListElementCard
                primaryText="Weekly Exercise goal"
                secondaryText={
                  appointment?.prescriptionData?.lifestyle?.weeklyExerciseGoal
                    ? `${appointment?.prescriptionData?.lifestyle?.weeklyExerciseGoal} times/week`
                    : "NA"
                }
              />
            </div>
            <div className="mx-0">
              <ListElementCard
                primaryText="How much to lose?"
                secondaryText={
                  appointment?.prescriptionData?.lifestyle?.weightDelta
                    ? `${appointment?.prescriptionData?.lifestyle?.weightDelta} Kgs`
                    : "NA"
                }
              />
            </div>
          </div>
          <ListElementCard
            primaryText="Note to Workout Coach :"
            secondaryText={
              appointment?.prescriptionData?.lifestyle?.noteForWorkoutCoach
                ? `${appointment?.prescriptionData?.lifestyle?.noteForWorkoutCoach}`
                : "NA"
            }
            // borderTw="border-none"
          />
          <ListElementCard
            primaryText="Note to dietician :"
            secondaryText={
              appointment?.prescriptionData?.diet?.noteForDietician
                ? `${appointment?.prescriptionData?.diet?.noteForDietician}`
                : "NA"
            }
            // borderTw="border-none"
          />
          <ListElementCard
            primaryText="Nutrients to include"
            secondaryText={
              appointment?.prescriptionData?.diet?.nutrientsToInclude
                ? `${appointment?.prescriptionData?.diet?.nutrientsToInclude}`
                : "NA"
            }
          />

          <ListElementCard
            primaryText="Supplements :"
            secondaryText={
              appointment?.prescriptionData?.supplements
                ? `${appointment?.prescriptionData?.supplements}`
                : "NA"
            }
            // borderTw="border-none"
          />

          <ListElementCard
            primaryText="Diet to follow"
            secondaryText={
              appointment?.prescriptionData?.diet?.particularDietToFollow
                ? `${appointment?.prescriptionData?.diet?.particularDietToFollow.join(
                    ", "
                  )}`
                : "NA"
            }
          />
          <ListElementCard
            primaryText="Any Particular food items"
            secondaryText={
              appointment?.prescriptionData?.diet?.particularFoodToInclude
                ? `${appointment?.prescriptionData?.diet?.particularFoodToInclude}`
                : "NA"
            }
          />
          <ListElementCard
            primaryText="Misc advice :"
            secondaryText={
              appointment?.prescriptionData?.miscData
                ? `${appointment?.prescriptionData?.miscData}`
                : "NA"
            }
            // borderTw="border-none"
          />

          <ListElementCard
            primaryText="Mensutral info :"
            secondaryText={
              appointment?.prescriptionData?.menstrualData
                ? `${appointment?.prescriptionData?.menstrualData}`
                : "NA"
            }
            // borderTw="border-none"
          />

          <ListElementCard
            primaryText="Followup note :"
            secondaryText={
              appointment?.nextFollowupDateNote
                ? `${appointment?.nextFollowupDateNote}`
                : "NA"
            }
            // borderTw="border-none"
          />

          <ListElementCard
            primaryText="Followup note Date:"
            secondaryText={
              appointment?.nextFollowupDate
                ? `${appointment?.nextFollowupDate}`
                : "NA"
            }
            // borderTw="border-none"
          />
        </div>
      ) : null}
    </ListExpander>
  );
};

export default DoctorRecommendation;
