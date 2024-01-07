// import { useFitnessPageParams } from "@hooks/fitness/useFitnessPageParams";
import { TerraUser } from "@models/Terra/TerraUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

import WaveBtn from "@components/WaveBtn";
import WearablePairing from "./WearablePairing";

interface Props {
  gotoComponent: () => void;
  terraUser: TerraUser | undefined;
}

const ConnectYourWearable: React.FC<Props> = ({ gotoComponent, terraUser }) => {
  const router = useRouter();
  const q = router.query as { state?: "success" | "failed" };

  //   console.log("q", q.state);

  useEffect(() => {
    if (router.isReady) {
      if (q.state === "success" && terraUser?.user_id) {
        const timer = setTimeout(() => {
          gotoComponent();
        }, 200);

        return () => {
          clearTimeout(timer);
        };
      } else if (q.state === "failed") {
        const timer = setTimeout(() => {
          gotoComponent();
        }, 3000);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, [gotoComponent, router.isReady, q.state, terraUser?.user_id]);

  return (
    <div className="flex h-screen flex-col justify-center items-center py-20 bg-[#F4F7F9] text-[#335E7D]">
      <h1 className="text-3xl text-center p-4">
        {q.state === "success"
          ? "Connecting your wearable"
          : q.state === "failed"
          ? "Wearable connection failed"
          : ""}
      </h1>
      <WearablePairing />
      <p className="mb-12">{terraUser ? terraUser.provider : ""}</p>
      <WaveBtn
        text={
          q.state === "success"
            ? "Pairing"
            : q.state === "failed"
            ? "Redirecting your"
            : "Loading..."
        }
      />
    </div>
  );
};

export default ConnectYourWearable;
