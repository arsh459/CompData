import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { getUserFitnessGoal } from "@models/User/parseUtils";
import { getUserListCardColors } from "@modules/Appointments/utils";
import { useRouter } from "next/router";
import ProfileForm from "./ProfileForm";
import PatientsProfileHeader from "@modules/Patients/PatientsProfileHeader";
import { useUserSnapshot } from "@hooks/user/useUserSnapshot";
import { useUserLastAppointment } from "@hooks/appointments/useUserLastAppointment";
import SettingIcon from "@components/SvgIcons/SettingIcon";

interface Props {
  patientId: string;
  onSignOut: () => void;
  isAdmin: boolean;
}

const PatientProfileTemplate: React.FC<Props> = ({
  patientId,
  onSignOut,
  isAdmin,
}) => {
  const { user } = useUserSnapshot(patientId);
  const { appointment } = useUserLastAppointment(patientId);
  const goal = getUserFitnessGoal(user);
  const color = getUserListCardColors(goal).textColor;
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg  mx-auto ">
        <div className="flex flex-1 items-center justify-between py-4">
          <div onClick={onBack} className="cursor-pointer">
            <ChevronLeftIcon className="w-8 h-8" color="#23262F" />
          </div>

          <p className="text-[#23262F] text-base font-popSB flex-1 px-4 md:text-center">
            {`${user?.name}'s Profile`}
          </p>
          <a href={`/admin/patients/${user?.uid}/config`}>
            <div className="w-5 aspect-1 mr-2 cursor-pointer">
              <SettingIcon color="#23262F" />
            </div>
          </a>
        </div>

        <div
          className="mx-4 rounded-3xl"
          style={{ backgroundColor: `${color}1a`, borderColor: `${color}1a` }}
        >
          <PatientsProfileHeader user={user} />

          <div className="md:bg-white/40 md:p-4 rounded-2xl  md:rounded-[45px]  md:m-4">
            <a href={`/admin/patients/${user?.uid}/appointments`}>
              <div className="p-4">
                <div className="flex items-center">
                  <p className="font-popM text-sm text-black/70 pr-1">
                    Last appointment details:
                  </p>
                  <div className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                    <ChevronRightIcon className="w-4 h-4" color="#23262F" />
                  </div>
                </div>
                <p className="font-popR text-xs text-black/30 pt-2">
                  {appointment?.chiefComplaints}
                </p>
              </div>
            </a>
            <ProfileForm
              appointment={appointment}
              user={user}
              color="#FFFFFF"
              highlightColor={color}
              canEdit={isAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileTemplate;
