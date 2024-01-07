import DropdownMenu from "@components/dropdown/DropDownMenu";
import { UserInterface } from "@models/User/User";
import { getTimeOfDay } from "@modules/MyProgram/utils";
import UserProfileDropdownV2 from "@templates/WomenTemplate/components/V2/CourseHeader/UserProfileDropdownV2";
import React from "react";
interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
}
const PatientListPageHeader: React.FC<Props> = ({ onSignOut, userObj }) => {
  const menuItems = [
    { label: "My Patients", href: "/admin/patients" },
    { label: "My Appointments", href: "/admin/appointments" },
  ];
  return (
    <div className="flex justify-between items-center h-16 py-16 mx-4 px-4">
      <div className="flex-1  flex flex-col md:flex-row ">
        <p className="text-stone-950 text-sm lg:text-4xl font-normal">
          Good {getTimeOfDay()}
        </p>
        <p className="text-indigo-800 md:pl-2  lg:text-4xl font-bold">
          {userObj?.name}
        </p>
      </div>

      <div className="max-w-fit ">
        <UserProfileDropdownV2
          userObj={userObj}
          onSignOut={onSignOut}
          containerTw="rounded-2xl px-5 py-2 flex justify-between"
        >
          <DropdownMenu menuItems={menuItems} onSignOut={onSignOut} />
        </UserProfileDropdownV2>
      </div>
    </div>
  );
};

export default PatientListPageHeader;
