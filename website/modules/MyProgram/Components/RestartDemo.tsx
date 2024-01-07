import WarningModal from "@components/WarningModal";
import { db } from "@config/firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { makeGeneratorCall } from "@hooks/myProgram/generatorCall";
import { useTodayDate } from "@hooks/myProgram/useTodayDate";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import { Badge } from "@models/Prizes/PrizeV2";
import { UserInterface } from "@models/User/User";
import { doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  startUnixDayStart: number;
  user: UserInterface;
  badge: Badge;
  setLoading: (val: boolean) => void;
}

const RestartDemo: React.FC<Props> = ({
  startUnixDayStart,
  badge,
  user,
  setLoading,
}) => {
  const { status } = usePaidStatus(user.uid);
  const [hide, sethide] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { todayUnix } = useTodayDate();

  const variants = {
    open: { y: "0%" },
    closed: { y: "82%" },
  };

  const onSave = async () => {
    setVisible(false);
    setLoading(true);

    if (badge?.id && user.uid) {
      await updateDoc(doc(db, "users", user.uid), {
        [`recommendationConfig.badgeConfig.${badge.id}.start`]: todayUnix,
      });

      await makeGeneratorCall(user.uid, "workout", true, true, badge?.id);
    }

    setLoading(false);
  };

  const daysLeft = Math.round(
    (todayUnix - startUnixDayStart) / (24 * 60 * 60 * 1000)
  );

  return status !== "LOADING" && status === "INACTIVE" && daysLeft > 1 ? (
    <>
      <motion.div
        animate={hide ? variants.closed : variants.open}
        className="fixed bottom-0 left-0 right-0"
      >
        <div
          onClick={() => sethide(!hide)}
          className="w-max mx-auto px-4 py-px rounded-t-xl bg-[#9880FF] text-white cursor-pointer text-sm"
        >
          {hide ? "Show" : "Hide"}
        </div>
        <div className="w-full bg-[#9880FF] flex justify-center items-center">
          <img
            src={`https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1000000810_C1FR79ksk.png?updatedAt=1688572011225`}
            alt="retry icon"
            className="w-12 aspect-1 object-contain"
          />
          <div className="p-4">
            <p className="text-sm sm:text-base text-white font-semibold px-2">
              Restart Demo Workout
            </p>
            <p className="text-xs sm:text-sm text-white/70 px-2">
              Want to try your 1 day Demo of your
              <br />
              program again?
            </p>
          </div>
          <div
            onClick={() => setVisible(true)}
            className="cursor-pointer w-12 aspect-1 flex justify-center items-center bg-white rounded-full rotate-180 p-3"
          >
            <ArrowLeftIcon className="w-full h-full text-[#9880FF]" />
          </div>
        </div>
      </motion.div>

      <WarningModal
        visible={visible}
        onClose={() => setVisible(false)}
        heading=""
        subtitle="Restarting the demo would remove your current Progress. Are you sure you wish to continue?"
        ctaProceed="Yes, for sure"
        ctaCancel="No Thanks"
        onNext={onSave}
      />
    </>
  ) : null;
};

export default RestartDemo;
