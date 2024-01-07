import { UserInterface } from "@models/User/User";
import AppointmentLists from "@modules/Appointments/AppointmentLists";

import clsx from "clsx";
import Loading from "@components/loading/Loading";
import { AppointmentInterface } from "@models/Appintment";
import PatientDetail from "@modules/Appointments/PatientDetail";
import { useAppointmentAttempts } from "@hooks/appointments/useAppointmentAttempts";

interface Props {
  user: UserInterface;
  fetchAll?: boolean;
  onSignOut: () => void;
}

const AppointmentAttemptTemplate: React.FC<Props> = ({
  onSignOut,
  user,
  fetchAll,
}) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const { fetching, appointments, selected, setSelected, setAppointments } =
    useAppointmentAttempts(user.uid, fetchAll);
  // const [viewStyle, setViewStyle] = useState<viewStyles>("allList");

  // const changeToSingle = () => setViewStyle("singleApp");

  const handleSelect = (val: AppointmentInterface) => {
    // changeToSingle();
    setSelected(val);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 100);
  };

  // console.log("viewStyle", viewStyle);

  return (
    <div className="w-screen min-h-screen bg-[#f6f6f6] flex flex-col relative z-0">
      <div className="flex-1 w-screen max-w-screen-xl p-4 mx-auto flex flex-col gap-4">
        <div className="flex-1 grid md:grid-flow-col auto-cols-fr auto-rows-fr gap-12">
          <div
            className={clsx(
              selected ? "hidden md:block" : "block",
              "w-full bg-white p-4 rounded-3xl mx-auto"
            )}
          >
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
          ) : selected ? (
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
              <p>Select one from list to see details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentAttemptTemplate;
