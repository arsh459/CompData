// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { usePatients } from "@hooks/patients/usePatients";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserInterface } from "@models/User/User";

import PatientCardWrapper from "@modules/Patients/PatientCardWrapper";
import PatientListPageHeader from "@modules/Patients/PatientListPageHeader";
import React from "react";
interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
}

const PatientTemplate: React.FC<Props> = ({ userObj, onSignOut }) => {
  // const [filterBy, setFilterBy] = useState<"asc" | "desc">("asc");

  const { patients, nextExists, onNext } = usePatients(userObj.uid, "asc"); // filterBy);
  const { targetRef } = useNextOnScroll(onNext, nextExists);

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg mx-auto ">
        <PatientListPageHeader userObj={userObj} onSignOut={onSignOut} />
        <div className="  bg-white  mx-4 px-4  md:px-10 rounded-3xl h-full max-h-[80vh] overflow-y-scroll">
          <div className="flex justify-between pt-6">
            <p>My Patients</p>
            {/* <div className="flex items-center gap-2">
              <p>Latest to oldest</p>
              {filterBy === "asc" ? (
                <ChevronUpIcon
                  className="h-5 w-5"
                  color="#000"
                  onClick={() => setFilterBy("desc")}
                />
              ) : (
                <ChevronDownIcon
                  className="h-5 w-5"
                  color="#000"
                  onClick={() => setFilterBy("asc")}
                />
              )}
            </div> */}
          </div>
          <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-5  sm:gap-y-9 py-6">
            {patients?.map((patient) => {
              // const time = patient?.lastConsultation
              //   ? format(patient.lastConsultation, "dd MMM yyyy")
              //   : "";
              return <PatientCardWrapper patient={patient} key={patient.uid} />;
            })}
            <div ref={targetRef} className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTemplate;
