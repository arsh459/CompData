import { ChevronRightIcon } from "@heroicons/react/solid";
import { UserInterface } from "@models/User/User";
import V2 from "@modules/Patients/Components/ListExpander/V2";
import Link from "next/link";

interface Props {
  user?: UserInterface;
  highlightColor: string;
}

const PreviousReports: React.FC<Props> = ({ user, highlightColor }) => {
  return user?.dietForm?.uploadedReports ? (
    <V2
      headingText="View Previous Reports"
      color="#FFFFFF"
      bgColor={highlightColor}
    >
      {user?.dietForm?.uploadedReports.map((each) =>
        each.url ? (
          <Link key={each.id} href={each.url} target="_blank">
            <div
              className="flex justify-between items-center border-t pt-3 mt-3"
              style={{ borderColor: `${highlightColor}66` }}
            >
              <p className="text-sm text-black">{each.filename}</p>
              <div className="flex items-center">
                <p className="text-sm text-[#665D62] mr-2">View/Download</p>
                <ChevronRightIcon className="w-6 h-6" color="#665D62" />
              </div>
            </div>
          </Link>
        ) : null
      )}
    </V2>
  ) : null;
};

export default PreviousReports;
