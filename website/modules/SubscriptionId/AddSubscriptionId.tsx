import { db } from "@config/firebase";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useAllSbPlans } from "@hooks/sbplan/useAllSbPlans";
import clsx from "clsx";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
  uid: string;
}

const AddSubscriptionId: React.FC<Props> = ({ uid }) => {
  const { user } = useUserV2(uid);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    user?.sbPlanId
  );
  const [trialStatus, setTrialStatus] = useState<boolean | undefined>(false);

  useEffect(() => {
    setSelectedId(user?.sbPlanId);
    setTrialStatus(user?.plusTrial ? true : false);
  }, [user?.sbPlanId, user?.plusTrial]);

  const { allSbPlans } = useAllSbPlans(10);

  const onClick = async (id: string) => {
    setSelectedId(id);
    await updateDoc(doc(db, "users", uid), { sbPlanId: id });
  };

  const onPlusTrial = async (trialValue: boolean) => {
    setTrialStatus(trialValue);
    await updateDoc(doc(db, "users", uid), { plusTrial: trialValue });
  };

  return (
    <div className="p-4 ">
      <div className="p-4 ">
        <p>Name: {user?.name}</p>
        <p>UID: {user?.uid}</p>

        <div className="pt-4 flex">
          {allSbPlans?.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onClick(item.id)}
                className={clsx(
                  "p-4 cursor-pointer border mr-4",
                  isSelected ? "border-green-500" : "border-gray-200"
                )}
              >
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex">
          <div
            onClick={() => onPlusTrial(!trialStatus)}
            className={clsx(
              trialStatus ? "border-green-500" : "border-gray-200",
              "p-4 cursor-pointer border"
            )}
          >
            <p>{trialStatus ? "PLUS TRIAL ON" : "NO PLUS TRIAL"}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddSubscriptionId;
