// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useLeads } from "@hooks/leads/useLeads";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserInterface } from "@models/User/User";
import PatientCard from "@modules/Patients/PatientCard";
import PatientListPageHeader from "@modules/Patients/PatientListPageHeader";
import clsx from "clsx";
import React, { useState } from "react";
interface Props {
  userObj: UserInterface;
  onSignOut: () => void;
}

export type flagState = "seen" | "completed";
const flagStates: flagState[] = ["seen", "completed"];

const LeadAdminTemplate: React.FC<Props> = ({ userObj, onSignOut }) => {
  // const [filterBy, setFilterBy] = useState<"asc" | "desc">("asc");

  const [flag, setFlag] = useState<"seen" | "completed">("seen");
  const { leads, nextExists, onNext } = useLeads(flag); // filterBy);
  const { targetRef } = useNextOnScroll(onNext, nextExists);

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg mx-auto ">
        <PatientListPageHeader userObj={userObj} onSignOut={onSignOut} />
        <div className="  bg-white  mx-4 px-4  md:px-10 rounded-3xl h-full max-h-[80vh] overflow-y-scroll">
          <div className="flex justify-between pt-6">
            <p>All Leads</p>
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
          <div className="flex py-4">
            {flagStates.map((item) => {
              return (
                <div
                  onClick={() => setFlag(item)}
                  className={clsx(
                    "pr-4 capitalize cursor-pointer text=gray-700",
                    item === flag ? "font-bold underline" : "font-light"
                  )}
                  key={item}
                >
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
          <div className="w-full grid grid-cols-1 gap-3 sm:grid-cols-4 lg:grid-cols-5  sm:gap-y-9 py-6">
            {leads?.map((patient) => {
              // const time = patient?.lastConsultation
              //   ? format(patient.lastConsultation, "dd MMM yyyy")
              //   : "";
              return (
                <PatientCard patient={patient} time={""} key={patient.uid} />
              );
            })}
            <div ref={targetRef} className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadAdminTemplate;
