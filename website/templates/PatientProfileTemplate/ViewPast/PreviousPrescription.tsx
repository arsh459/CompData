import { ChevronRightIcon } from "@heroicons/react/solid";
import { useUserAppointments } from "@hooks/appointments/useUserAppointments";
import { UserInterface } from "@models/User/User";
import V2 from "@modules/Patients/Components/ListExpander/V2";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  user?: UserInterface;
  highlightColor: string;
}

const PreviousPrescription: React.FC<Props> = ({ user, highlightColor }) => {
  const { appointments } = useUserAppointments(user?.uid);

  return appointments.length ? (
    <V2 headingText="View Previous Prescription" color={highlightColor}>
      {appointments.map((each) => (
        <Link key={each.id} href={`/admin/appointments/${each.id}`}>
          <div
            className="flex justify-between items-center border-t pt-3 mt-3"
            style={{ borderColor: `${highlightColor}66` }}
          >
            <p className="text-sm text-black">{each.name}</p>
            <div className="flex items-center">
              {each.startSlot ? (
                <p className="text-sm text-[#665D62] mr-2">
                  {format(new Date(each.startSlot), "dd/MM/yy")}
                </p>
              ) : null}
              <ChevronRightIcon className="w-6 h-6" color="#665D62" />
            </div>
          </div>
        </Link>
      ))}
    </V2>
  ) : null;
};

export default PreviousPrescription;
