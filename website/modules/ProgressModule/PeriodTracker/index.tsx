import { UserInterface } from "@models/User/User";
import ActivityLog from "../Components/ActivityLog";
import ProgressHeader from "../Components/ProgressHeader";
import { useRouter } from "next/router";
import PeriodCalender from "./PeriodCalender";
import { usePeriodCycles } from "./hook/usePeriodCycles";
import { usePeriodDatesForUser } from "./hook/usePeriodDatesForUser";
import NavWrapper from "@components/NavWrapper";
import AddLogBtn from "../Components/AddLogBtn";
import PeriodSubComp from "./PeriodSubComp";

interface Props {
  remoteUser?: UserInterface;
}

const PeriodTracker: React.FC<Props> = ({ remoteUser: user }) => {
  const router = useRouter();

  // fetch cycles
  usePeriodCycles(user?.uid);
  usePeriodDatesForUser(user?.uid);

  const onBack = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${user?.name}'s Weight Journey `}
        />
        <div className="bg-[#FFECF5] rounded-3xl p-4 sm:flex gap-4">
          <div className="flex-1 sm:flex-[.7]">
            <PeriodCalender isEditable={false} uid={user?.uid} />
          </div>
          <div className="flex-1 sm:flex-[.3] flex flex-col justify-between gap-8">
            <PeriodSubComp />
            <NavWrapper
              baseLink={`/admin/patients/${user?.uid}/progress/period`}
              link="add"
            >
              <AddLogBtn replaceText="Log Period" />
            </NavWrapper>
          </div>
        </div>
        <ActivityLog remoteUser={user} hideSection="period" />
      </div>
    </div>
  );
};

export default PeriodTracker;
