import { weEventTrack } from "@analytics/webengage/user/userLog";
import { getQueryForPlan } from "@hooks/drawer/utils";
import { PlanTypes } from "@models/SbPlans/interface";
import clsx from "clsx";
import { NextRouter, useRouter } from "next/router";
export interface planParams {
  type?: PlanTypes;
  source?: "joinboat";
}

export type planQueryKeys = "type";

export const updatePlanParam = (
  router: NextRouter,
  q: planParams,
  newType: PlanTypes
) => {
  q.type = newType;

  router.push(getQueryForPlan(q), undefined, { shallow: true });
};

const PlanTypeToggler = () => {
  const router = useRouter();
  const q = router.query as planParams;

  const planType = q.type ? q.type : "pro";

  const setPro = () => {
    updatePlanParam(router, q, "pro");
    weEventTrack("plans_setPro", {});
  };
  const setProPlus = () => {
    updatePlanParam(router, q, "proPlus");
    weEventTrack("plans_setProPlus", {});
  };

  return (
    <div className="w-full bg-black/10 backdrop-blur-2xl border sm:border-0 border-white/20 rounded-lg sm:rounded-none overflow-hidden px-2">
      <div className="w-full max-w-xl mx-auto flex items-center relative z-0">
        <div
          onClick={setPro}
          className="flex-1 flex justify-center items-center py-3 cursor-pointer"
        >
          <p className="text-white font-popSB text-base sm:text-lg text-center transition-all flex items-center gap-1">
            <span className="hidden sm:flex">SocialBoat</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#CCA467] via-[#CCA467] to-[#CCA467]">
              Pro
            </span>
          </p>
        </div>
        <div
          onClick={setProPlus}
          className="flex-1 flex justify-center items-center py-3 cursor-pointer"
        >
          <p className="text-white font-popSB text-base sm:text-lg text-center transition-all flex items-center gap-1">
            <span className="text-white hidden sm:flex">SocialBoat</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF317B] via-[#FF8C8C] to-[#FF477D]">
              Pro Plus
            </span>
          </p>
        </div>
        <div
          className={clsx(
            "absolute top-1.5 sm:top-[95%] bottom-1.5 sm:bottom-0 left-1.5 right-1/2 rounded-md bg-white -z-10 transition-all",
            planType === "pro" ? "translate-x-0" : "translate-x-full"
          )}
        />
      </div>
    </div>
  );
};

export default PlanTypeToggler;
