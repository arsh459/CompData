import { useState } from "react";
import WearableData from "./WearableData";
import { terraResyncDay_internal } from "@templates/admin/resync";
import { useAllDayActivities } from "@hooks/activities/useAllDayActivities";
import LoadIndicator from "./LoadIndicator";
import { TerraUser } from "@models/Terra/TerraUser";
import clsx from "clsx";

interface Props {
  uid: string;
  terraUser: TerraUser | undefined;
  gotoComponent: () => void;
  onPost: () => void;
}

const WearableConnected: React.FC<Props> = ({
  uid,
  terraUser,
  gotoComponent,
  onPost,
}) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { day, activities } = useAllDayActivities(uid);

  const handleReSync = () => {
    setIsSyncing(true);
    terraResyncDay_internal(uid, day).finally(() => {
      // console.log("uid", uid, day);
      setTimeout(() => {
        setIsSyncing(false);
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center text-[#335E7D]">
      <h1 className="text-3xl text-center p-4 mb-8">Your data</h1>
      <div className="w-full my-4 relative z-0">
        <div
          className={clsx(
            "absolute -z-10 rounded-3xl",
            terraUser ? "-inset-0.5 blur-sm" : "-inset-px"
          )}
          style={{
            background:
              "linear-gradient(#600FF5, #F15454, #F19B38, #CCDB2C, #60C5D9)",
          }}
        />
        <WearableData
          uid={uid}
          activities={activities}
          terraUser={terraUser}
          gotoComponent={gotoComponent}
        />
      </div>
      <p className="my-4">Having issues with your data?</p>
      <div className="w-40">
        {terraUser ? (
          <button
            onClick={handleReSync}
            className="w-full h-12 my-4 flex justify-center items-center text-lg text-white bg-gradient-to-r from-[#96CCF1] to-[#95D3B2] rounded-full"
          >
            {isSyncing ? <LoadIndicator /> : <p>Re-Sync</p>}
          </button>
        ) : null}
        <button
          onClick={onPost}
          className="w-full h-12 my-4 text-center text-lg text-white bg-gradient-to-l from-[#F19B38] to-[#FD6F6F] rounded-full"
        >
          Add Manually
        </button>
      </div>
    </div>
  );
};

export default WearableConnected;
