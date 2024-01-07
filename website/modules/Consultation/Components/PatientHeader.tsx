import { AppointmentInterface } from "@models/Appintment";
import { UserInterface } from "@models/User/User";
import { getBMI } from "@models/User/parseUtils";
import UserImage from "@templates/listing/Header/UserImage";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  appointment?: AppointmentInterface;
  user?: UserInterface;
  color: string;
  onSave: () => Promise<void>;
}

const PatientHeader: React.FC<Props> = ({
  appointment,
  user,
  color,
  onSave,
}) => {
  const router = useRouter();
  const bmi = getBMI(user);

  const appointmentLink = appointment?.link;

  const handleSave = async () => {
    await onSave();

    router.push(`/prescription/${appointment?.id}`);
    // router.back();
  };

  return (
    <div
      className="flex justify-between rounded-t-[20px] rounded-b-lg p-4"
      style={{ backgroundColor: `${color}1a` }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        {/* Circle and name,age,cause */}
        <div className="flex items-center">
          {user?.profileImage || user?.name ? (
            <div
              className="p-1 border rounded-full"
              style={{ borderColor: `${color}80` }}
            >
              <Link href={`/admin/patients/${user.uid}`}>
                <UserImage
                  boxHeight="h-12"
                  boxWidth="w-12"
                  image={user?.profileImage}
                  name={user?.name}
                  color={`${color}33`}
                />
              </Link>
            </div>
          ) : null}

          <div className=" text-xs font-popR pl-2 md:pl-3">
            <Link href={`/admin/patients/${user?.uid}`}>
              <p className="text-black font-popM text-base pb-1.5 underline">
                {user?.name}
              </p>
            </Link>
            <p className="text-xs font-popR text-[#474747]">
              <span className=" " style={{ color: "#F62088" }}>
                {appointment?.cause}
              </span>{" "}
              {user?.age ? `${user?.age} Years` : ""}
            </p>
          </div>
        </div>

        {/* Goal and Bmi */}
        <div className="flex-1 ">
          <p className="text-[#00000080] text-xs  flex ">
            <span className="font-popM text-black pr-2 ">Goal :</span>
            <span className="break-words font-popR flex-1 capitalize">
              {user?.fitnessGoal?.length
                ? user.fitnessGoal[0].replaceAll("_", " ")
                : "NA"}
            </span>
          </p>

          <p className="text-[#00000080]  text-xs pt-3">
            <span className="font-popM text-black">Body Mass Index :</span>
            <span className="font-popR"> {bmi}</span>
          </p>
        </div>
      </div>

      {/* Profile and save details */}
      <div className="fixed bottom-4 inset-x-4 md:relative md:bottom-0 md:inset-x-0 z-50">
        <div className="grid grid-flow-col auto-cols-fr gap-4">
          {appointmentLink ? (
            <Link href={appointmentLink}>
              <div
                className="whitespace-nowrap cursor-pointer text-xs font-popM rounded-xl text-center border px-5 py-3 backdrop-blur"
                style={{ color: `${color}e6`, borderColor: color }}
              >
                Join Meet
              </div>
            </Link>
          ) : (
            <Link href={`/admin/patients/${user?.uid}`}>
              <div
                className="whitespace-nowrap cursor-pointer text-xs font-popM rounded-xl text-center border px-5 py-3 backdrop-blur"
                style={{ color: `${color}e6`, borderColor: color }}
              >
                View User Profile
              </div>
            </Link>
          )}

          <div
            onClick={handleSave}
            className="whitespace-nowrap cursor-pointer text-xs font-popM text-white rounded-xl text-center px-5 py-3"
            style={{ backgroundColor: color }}
          >
            Save details
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;
