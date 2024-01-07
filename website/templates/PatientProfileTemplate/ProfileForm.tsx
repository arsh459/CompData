import DietPreference from "@modules/Patients/Components/DietPreference";
import DoctorRecommendation from "@modules/Patients/Components/DoctorRecommendation";
import MenstrualDetails from "@modules/Patients/Components/MenstrualDetails";
import OverallLifeStyle from "@modules/Patients/Components/OverallLifeStyle/OverallLifeStyle";
import MedicalHistory from "@modules/Patients/MedicalHistory";
import { UserInterface } from "@models/User/User";
import { AppointmentInterface } from "@models/Appintment";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";
import { EditObject } from "./ProfileEdit/interface";
import LeadgenDetails from "@modules/Patients/LeadgenDetails";
import ViewPast from "./ViewPast";

interface Props {
  appointment?: AppointmentInterface;
  user?: UserInterface;
  color: string;
  highlightColor: string;
  canEdit?: boolean;
  isPrescription?: boolean;
}

const ProfileForm: React.FC<Props> = ({
  appointment,
  user,
  color,
  highlightColor,
  canEdit,
  isPrescription,
}) => {
  const [editModalObject, setEditModalObject] = useState<EditObject>();

  return (
    <>
      <MedicalHistory
        user={user}
        appointment={appointment}
        color={color}
        highlightColor={highlightColor}
        onEdit={canEdit ? setEditModalObject : undefined}
      />
      <MenstrualDetails
        user={user}
        color={color}
        highlightColor={highlightColor}
        onEdit={canEdit ? setEditModalObject : undefined}
      />
      <OverallLifeStyle
        user={user}
        color={color}
        highlightColor={highlightColor}
        onEdit={canEdit ? setEditModalObject : undefined}
      />
      {isPrescription ? null : (
        <DoctorRecommendation
          user={user}
          appointment={appointment}
          color={color}
          highlightColor={highlightColor}
          onEdit={undefined}
        />
      )}
      <DietPreference
        user={user}
        color={color}
        highlightColor={highlightColor}
        onEdit={canEdit ? setEditModalObject : undefined}
      />

      <LeadgenDetails
        user={user}
        color={color}
        highlightColor={highlightColor}
      />
      {editModalObject ? (
        <ProfileEdit
          visible={!!editModalObject}
          onClose={() => setEditModalObject(undefined)}
          color={highlightColor}
          editObject={editModalObject}
        />
      ) : null}
      <div className="w-full h-20" />
      <ViewPast user={user} highlightColor={highlightColor} />
    </>
  );
};

export default ProfileForm;
