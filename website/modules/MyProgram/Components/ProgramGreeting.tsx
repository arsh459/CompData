import { shieldIconFrame30 } from "@constants/icons/iconURLs";
import Link from "next/link";
import { getTimeOfDay } from "../utils";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { UserInterface } from "@models/User/User";

interface Props {
  user: UserInterface;
}
const ProgramGreeting: React.FC<Props> = ({ user }) => {
  const { status } = usePaidStatus(user.uid);
  const isPro = status !== "LOADING" && status === "ACTIVE";

  return (
    <Link
      href={isPro ? "/proplan" : "/plans"}
      className="flex w-fit items-center mb-6"
    >
      <p className="font-popM text-2xl sm:text-3xl lg:text-4xl text-white/50 pr-2.5">
        Good {getTimeOfDay()},{" "}
        <span className="text-[#F1F1F1] font-popR">{user.name}</span>
      </p>
      {isPro ? (
        <img
          src={shieldIconFrame30}
          className="w-6 sm:w-7 lg:w-8 aspect-1"
          alt="shield icon"
        />
      ) : null}
    </Link>
  );
};

export default ProgramGreeting;
