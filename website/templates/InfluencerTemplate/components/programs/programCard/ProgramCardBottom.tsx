import Link from "next/link";
import { ProgramInterface } from "../OurPrograms";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";

interface Props {
  each: ProgramInterface;
  coachUID: string;
}
const ProgramCardBottom: React.FC<Props> = ({ each, coachUID }) => {
  const { utm_source } = useCoachAtt();

  return (
    <div className="w-full h-[30%] px-7 py-3 flex flex-col justify-around">
      <Link
        href={`/course/${each.slug}?coach=${coachUID}&utm_source=${utm_source}`}
      >
        <div className="border border-white rounded-xl">
          <p className="text-[#FFF] text-sm font-pJSSB text-center py-4 tracking-wide">
            {each.courseDescriptionTitle}
          </p>
        </div>
      </Link>
      <Link href={`/start?coach=${coachUID}&utm_source=${utm_source}`}>
        <div className="rounded-xl bg-white">
          <p className="text-[#232323] text-sm font-pJSSB text-center py-4 tracking-wide ">
            Starting at INR {each.coursePricePerMonth}/month
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProgramCardBottom;
