import { useAppointments } from "@hooks/appointments/useAppointments";
import { UserInterface } from "@models/User/User";
import AppointmentLists from "@modules/Appointments/AppointmentLists";
import AppointmentsHeader from "./AppointmentsHeader";
import clsx from "clsx";
import Loading from "@components/loading/Loading";
import { AppointmentInterface } from "@models/Appintment";
import PatientDetail from "@modules/Appointments/PatientDetail";
import FilterAgents from "./FilterAgents";

interface Props {
  user: UserInterface;
  fetchAll?: boolean;
  onSignOut: () => void;
}

const AppointmentTemplate: React.FC<Props> = ({
  onSignOut,
  user,
  fetchAll,
}) => {
  const {
    fetching,
    appointments,
    selected,
    setSelected,
    setAppointments,
    agentType,
    setAgentType,
  } = useAppointments(user.uid, fetchAll);

  const changeToList = () => {
    setSelected(undefined);
  };

  const handleSelect = (val: AppointmentInterface) => {
    setSelected(val);
  };

  return (
    <div className="w-screen min-h-screen bg-[#f6f6f6] flex flex-col relative z-0">
      <div className="flex-1 w-screen max-w-screen-xl p-4 mx-auto flex flex-col gap-4">
        <AppointmentsHeader
          userObj={user}
          onSignOut={onSignOut}
          showBack={selected ? true : false}
          onBack={changeToList}
        />

        <div className="flex-1 grid md:grid-flow-col auto-cols-fr auto-rows-fr gap-12">
          <div
            className={clsx(
              selected ? "hidden md:block" : "block",
              "w-full bg-white p-4 rounded-3xl mx-auto"
            )}
          >
            {fetchAll ? (
              <div className="pb-8">
                <FilterAgents
                  agentType={agentType}
                  setAgentType={setAgentType}
                />
              </div>
            ) : null}
            {fetching ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loading fill="#ff735c" width={48} height={48} />
              </div>
            ) : appointments.length ? (
              <AppointmentLists
                appointments={appointments}
                setAppointments={setAppointments}
                setSelected={handleSelect}
                selected={selected}
                showDocName={fetchAll ? true : false}
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-[#23262F] text-xl font-qsB capitalize">
                  No Upcoming appointments
                </p>
              </div>
            )}
          </div>

          {fetching ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          ) : selected && appointments?.length ? (
            <div
              className={clsx(
                selected ? "block" : "hidden md:block",
                "w-full bg-white p-4 rounded-3xl mx-auto"
              )}
            >
              <PatientDetail selected={selected} />
            </div>
          ) : (
            <div className="hidden md:flex justify-center items-center font-popM text-2xl text-center bg-white p-4 rounded-3xl">
              {appointments?.length ? (
                <p>Select one from list to see details.</p>
              ) : (
                <p className="text-[#23262F] text-xl font-qsB capitalize">
                  No Upcoming appointments
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentTemplate;
