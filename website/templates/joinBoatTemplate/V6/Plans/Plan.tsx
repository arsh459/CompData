import { getPrefixSuffix } from "@constants/organization";
import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";

export const gradients: { [key: number]: string } = {
  30: "from-[#E376FF] to-[#FF57A2]",
  90: "from-[#FF6C77] to-[#FFAB70]",
  365: "from-[#39AAD7] to-[#2CD8B0]",
};

export const gradientsOpacity: { [key: number]: string } = {
  30: "from-[#E376FF]/20 to-[#FF57A2]/20",
  90: "from-[#FF6C77]/20 to-[#FFAB70]/20",
  365: "from-[#39AAD7]/20 to-[#2CD8B0]/20",
};

interface Props {
  user: UserInterface;
  plan: AppSubscription;
  setLoading: (val: boolean) => void;
  onTap: () => void;
}

const Plan: React.FC<Props> = ({ user, plan, setLoading, onTap }) => {
  const duration = getPrefixSuffix(
    plan.durationInDays ? plan.durationInDays : 0
  );

  return (
    <div
      onClick={onTap}
      className={clsx(
        "w-full bg-gradient-to-r backdrop-blur-[100px] relative z-0",
        "border rounded-2xl overflow-hidden cursor-pointer flex flex-col border-white/25",
        gradientsOpacity[plan.durationInDays || 30]
      )}
    >
      <h4
        className={clsx(
          "flex-1 p-4 font-nunitoB text-transparent text-center bg-gradient-to-r bg-clip-text",
          gradients[plan.durationInDays || 30]
        )}
      >
        {plan.cost === 0 ? (
          <>
            <span className="text-sm">Always</span>
            <br />
            <span className="text-2xl">Free</span>
          </>
        ) : (
          <>
            <span className="text-sm">INR</span>
            <br />
            <span className="text-2xl">{Math.round(plan.cost)}</span>
          </>
        )}
      </h4>
      <h3
        className={clsx(
          "bg-gradient-to-r font-nunitoB text-black text-center text-xs min-[400px]:text-sm p-2 whitespace-nowrap",
          gradients[plan.durationInDays || 30]
        )}
      >
        {plan.cost === 0 ? "∞" : duration.prefix}{" "}
        {plan.cost === 0 ? "days" : duration.suffix}
      </h3>
    </div>
  );
};

export default Plan;
