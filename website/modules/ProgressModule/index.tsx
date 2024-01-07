import { UserInterface } from "@models/User/User";
import { useRouter } from "next/router";
import ActivityLog from "./Components/ActivityLog";
import ManageStreak from "./Components/ManageStreak";
import ProgressHeader from "./Components/ProgressHeader";
import AwardsView from "./AwardModule/AwardsView";
import FollowupModule from "./FollowupModule/FollowupModule";
import AppointmentsModule from "./FollowupModule/AppointmentsModule";
import SettingMenu from "./Components/SettingMenu";

interface Props {
  remoteUser: UserInterface | undefined;
}

const ProgressModule: React.FC<Props> = ({ remoteUser }) => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  return (
    <div className="w-screen h-screen relative z-0">
      <div className="fixed inset-0 bg-[#F6F6F6] -z-10" />
      <div className="w-full max-w-screen-lg h-full mx-auto ">
        <ProgressHeader
          onBack={onBack}
          text={`${remoteUser?.name}'s Profile`}
          moreNode={
            remoteUser ? <SettingMenu remoteUser={remoteUser} /> : undefined
          }
        />
        <div className="  bg-[#FFECF5] py-10 px-4 mx-4 rounded-3xl   overflow-y-scroll">
          <ManageStreak remoteUser={remoteUser} />
          <ActivityLog remoteUser={remoteUser} />
          <AppointmentsModule uid={remoteUser?.uid} />
          <FollowupModule remoteUser={remoteUser} />
          <AwardsView remoteUser={remoteUser} />
        </div>
      </div>
    </div>
  );
};

export default ProgressModule;
