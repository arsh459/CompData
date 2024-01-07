import { UserInterface } from "@models/User/User";
// import PreferenceListElement from "@modules/Appointments/PreferenceListElement";
import {
  getCommaSepratedIssues,
  getTrueKeysString,
} from "@modules/Appointments/utils";
import ListElementCard from "@modules/Patients/ListElementCard";
import React, { useState } from "react";
import ListExpander from "../ListExpander";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { getOverallLifeStyleEditObject } from "@modules/Patients/utils/OverallLifeStyleUtils";

interface Props {
  user?: UserInterface;
  color: string;
  highlightColor: string;
  onEdit?: (val: EditObject) => void;
}

const OverallLifeStyle: React.FC<Props> = ({
  user,
  color,
  highlightColor,
  onEdit,
}) => {
  const [show, setShow] = useState(false);
  const onExpand = () => {
    setShow((p) => !p);
  };
  const addiction = getCommaSepratedIssues(
    user?.dietForm?.addiction,
    user?.dietForm?.addictionText
  );
  const sexuallyActive = `${user?.doctorForm?.sexuallyActive ? "Yes" : "No"}`;

  const handleEdit = onEdit
    ? () => {
        onEdit(getOverallLifeStyleEditObject(user));
      }
    : undefined;

  return (
    <ListExpander
      onExpand={onExpand}
      show={show}
      headingText="Overall Lifestyle"
      color={color}
      highlightColor={highlightColor}
      onEdit={handleEdit}
    >
      {show ? (
        <>
          <div className="bg-black/10 h-px w-full" />
          <ListElementCard
            primaryText="Any supplements taken?"
            secondaryText={
              getTrueKeysString(user?.dietForm?.medication) || "NA"
            }
            borderTw="border-b   "
          />
          <ListElementCard
            primaryText="Smoking or drinking?"
            secondaryText={addiction || "NA"}
            borderTw="border-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10">
            <div className="mx-0">
              <ListElementCard
                primaryText="Workout frequency?"
                secondaryText={
                  user?.dietForm?.exerciseDayInWeek
                    ? `${user?.dietForm?.exerciseDayInWeek} times / week`
                    : "NA"
                }
              />

              <ListElementCard
                primaryText="Daily Water intake?"
                secondaryText={
                  user?.dietForm?.waterIntakeDaily
                    ? `${user?.dietForm?.waterIntakeDaily} glass / day`
                    : "NA"
                }
              />
              <ListElementCard
                primaryText="Usual Working Hours"
                secondaryText={
                  user?.dietForm?.workingHour
                    ? `${user?.dietForm?.workingHour} hrs / day`
                    : "NA"
                }
              />
              <ListElementCard
                primaryText="Avg Sleep Quality"
                secondaryText={`${user?.sleepQuality} hrs / day` || "NA"}
                // borderTw="md:border-none"
              />
            </div>

            <div className="mx-0">
              <ListElementCard
                primaryText="Preferred Workout?"
                secondaryText={
                  user?.workoutStyle ? `${user?.workoutStyle}` : "NA"
                }
              />
              <ListElementCard
                primaryText="Eating out?"
                secondaryText={
                  user?.dietForm?.outsideFoodInWeek
                    ? `${user?.dietForm?.outsideFoodInWeek} times / week`
                    : "NA"
                }
              />

              <ListElementCard
                primaryText="Sexually active?"
                secondaryText={sexuallyActive}
                // borderTw="border-none"
              />
            </div>
          </div>
        </>
      ) : null}
    </ListExpander>
  );
};

export default OverallLifeStyle;
