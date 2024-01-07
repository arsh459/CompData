import { UserInterface } from "@models/User/User";
import {
  formatFoodTimings,
  getCommaSepratedIssues,
  getTrueKeysString,
} from "@modules/Appointments/utils";
import ListElementCard from "@modules/Patients/ListElementCard";
import React, { useState } from "react";
import ListExpander from "../ListExpander";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { getDietPreferenceEditObject } from "@modules/Patients/utils/DietPreferenceUtils";
import { getTimezone } from "@templates/Recommendations/utils";

interface Props {
  user?: UserInterface;
  color: string;
  highlightColor: string;
  onEdit?: (val: EditObject) => void;
}

const DietPreference: React.FC<Props> = ({
  user,
  color,
  highlightColor,
  onEdit,
}) => {
  const [show, setShow] = useState(false);
  const onExpand = () => {
    setShow((p) => !p);
  };
  const dietPreference = getCommaSepratedIssues(
    user?.dietForm?.dietPreference,
    user?.dietForm?.dietPreferenceText
  );

  const allergyIssues = getCommaSepratedIssues(
    user?.dietForm?.allergies,
    user?.dietForm?.allergiesText
  );

  const handleEdit = onEdit
    ? () => {
        onEdit(getDietPreferenceEditObject(user));
      }
    : undefined;

  return (
    <ListExpander
      onExpand={onExpand}
      show={show}
      headingText="Diet Preference"
      color={color}
      highlightColor={highlightColor}
      onEdit={handleEdit}
    >
      {show ? (
        <>
          <div>
            <div className="bg-black/10 h-px w-full" />
            <ListElementCard
              primaryText="Any Preferred cuisines"
              secondaryText={
                user?.dietForm?.cuisinePreference
                  ? getTrueKeysString(user?.dietForm?.cuisinePreference)
                  : "NA"
              }
            />
            <ListElementCard
              primaryText="Any Allergies?"
              secondaryText={allergyIssues || "NA"}
            />
            <ListElementCard
              primaryText="Preferred meal timings"
              secondaryText={
                user?.dietForm?.foodTimings
                  ? formatFoodTimings(
                      user.dietForm.foodTimings,
                      getTimezone(user)
                    )
                  : "NA"
              }
              // borderTw="border-none"
            />
            <ListElementCard
              primaryText="Preferred Meals"
              secondaryText={dietPreference || "NA"}
              borderTw="md:border-none"
            />
            {/* <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10">
              <div className="mx-0"></div>
              <div className="mx-0"></div>
            </div> */}
          </div>
        </>
      ) : null}
    </ListExpander>
  );
};

export default DietPreference;
