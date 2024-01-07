import { useUsersBySignup } from "@hooks/patients/useUsersBySignup";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserInterface } from "@models/User/User";
import PatientCard from "@modules/Patients/PatientCard";
import PatientListPageHeader from "@modules/Patients/PatientListPageHeader";
import { format } from "date-fns";
import React from "react";
interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
}

const SalesPatientTemplate: React.FC<Props> = ({ userObj, onSignOut }) => {
  // const [filterBy, setFilterBy] = useState<"asc" | "desc">("asc");

  const { patients, nextExists, onNext } = useUsersBySignup(10); // filterBy);
  const { targetRef } = useNextOnScroll(onNext, nextExists);

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg mx-auto ">
        <PatientListPageHeader userObj={userObj} onSignOut={onSignOut} />
        <div className="  bg-white  mx-4 px-4  md:px-10 rounded-3xl h-full max-h-[80vh] overflow-y-scroll">
          <div className="flex justify-between pt-6">
            <p>All Signups</p>
          </div>
          <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-5 auto-cols-fr sm:gap-y-9 py-6">
            {patients?.map((patient) => {
              const time = patient?.authSigninTime
                ? format(patient.authSigninTime, "hh:mma dd MMM yyyy")
                : "";
              return (
                <PatientCard time={time} patient={patient} key={patient.uid} />
              );
            })}
            <div ref={targetRef} className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPatientTemplate;
