import { UserInterface } from "@models/User/User";
import PreviousPrescription from "./PreviousPrescription";
import PreviousReports from "./PreviousReports";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import UploadReports from "./UploadReports";

interface Props {
  user?: UserInterface;
  highlightColor: string;
}

const ViewPast: React.FC<Props> = ({ user, highlightColor }) => {
  return (
    <div className="mx-4">
      <Link href={`${user?.uid}/progress`}>
        <div
          className="w-full flex justify-between items-center rounded-xl p-4"
          style={{ backgroundColor: `${highlightColor}33` }}
        >
          <p className="text-[#000000B3] font-nunitoM text-base">
            View User Progress
          </p>
          <ChevronRightIcon className="w-6 h-6" color="#000000B3" />
        </div>
      </Link>
      <div className="w-4 aspect-1" />
      <PreviousPrescription user={user} highlightColor={highlightColor} />
      <div className="w-4 aspect-1" />
      <div className=" py-4">
        <p>Add Report</p>
      </div>
      {user?.uid && <UploadReports uid={user?.uid} />}
      <PreviousReports user={user} highlightColor={highlightColor} />
    </div>
  );
};

export default ViewPast;
