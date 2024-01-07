import clsx from "clsx";
import { Menu, MenuItem } from "@mui/material";
// import { getPrefixSuffix } from "@constants/organization";
// import { AppSubscription } from "@models/AppSubscription/AppSubscription";

import { currency } from "@templates/OurPlans/Plan";
import { SbPlans } from "@models/SbPlans/interface";

interface Props {
  allPlans: SbPlans[];
  selectedPlan: SbPlans; // //AppSubscription;
  anchorEl: null | HTMLElement;
  currency: currency;
  isOpen: boolean;
  handleClose: (plan: SbPlans) => void; // (plan: AppSubscription) => void;
}

const PayOptions: React.FC<Props> = ({
  selectedPlan,
  anchorEl,
  currency,
  isOpen,
  handleClose,
  allPlans,
}) => {
  // console.log("sel", selectedPlan.id);
  return (
    <Menu
      id="pay-screen-positioned-menu"
      open={isOpen}
      onClose={() => handleClose(selectedPlan)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {allPlans.map((plan, index) => {
        // const tempDur = getPrefixSuffix(
        //   plan.durationInDays ? plan.durationInDays : 0
        // );
        return (
          <MenuItem
            key={`plan-${plan.durationInDays}-${index}`}
            onClick={() => handleClose(plan)}
          >
            <div
              className={clsx(
                "w-full flex items-center px-6 py-4 border-white/60",
                index !== allPlans.length - 1 && "border-b"
              )}
            >
              <div className="flex-1 flex justify-between items-center text-white">
                <span className="font-popR text-base whitespace-nowrap">
                  {plan.name}
                </span>
                <div className="w-8" />
                <span className="font-popM text-base whitespace-nowrap">{`${currency} ${
                  currency === "INR" ? Math.round(plan.cost) : plan.usdCost
                }`}</span>
              </div>
              <div
                className={clsx(
                  "w-3.5 aspect-1 rounded-full border-2 border-white ml-4",
                  plan.id === selectedPlan.id ? "bg-black" : "bg-white"
                )}
              />
            </div>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default PayOptions;
