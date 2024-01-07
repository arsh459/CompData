import DropdownMenu from "@components/dropdown/DropDownMenu";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { UserInterface } from "@models/User/User";
import { getTimeOfDay } from "@modules/MyProgram/utils";
import UserProfileDropdownV2 from "@templates/WomenTemplate/components/V2/CourseHeader/UserProfileDropdownV2";
import clsx from "clsx";

interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
  showBack: boolean;
  onBack: () => void;
  // viewStyle: viewStyles;
}

export type viewStyles = "allList" | "singleApp";

const AppointmentsHeader: React.FC<Props> = ({
  userObj,
  onSignOut,
  showBack,
  onBack,
  // viewStyle,
}) => {
  const menuItems = [
    { label: "My Patients", href: "/admin/patients" },
    { label: "My Appointments", href: "/admin/appointments" },
  ];
  return (
    <div className="flex justify-between items-center">
      <div>
        <div
          className={clsx(
            showBack ? "flex md:hidden" : "hidden",
            "justify-between items-center cursor-pointer"
          )}
          onClick={onBack}
        >
          <ChevronLeftIcon className="w-8 h-8" color="#5F647E" />
          <p className="text-[#5F647E] text-xl font-qsB capitalize">Back</p>
        </div>
      </div>

      <p
        className={clsx(
          showBack ? "hidden md:block" : "block",
          "flex-1 text-stone-950 text-2xl sm:text-3xl lg:text-4xl font-normal"
        )}
      >
        Good {getTimeOfDay()}{" "}
        {/* <span className="text-indigo-800 md:pl-2 font-bold">
          {userObj?.name}!
        </span> */}
      </p>

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

export default AppointmentsHeader;
