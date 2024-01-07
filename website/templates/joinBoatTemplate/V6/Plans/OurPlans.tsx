import { socialboatV3 } from "@constants/socialboatOrg";
import Plan from "./Plan";
import { UserInterface } from "@models/User/User";
import { sectionTypes } from "@hooks/joinBoat/V6/useSection";
import { useRouter } from "next/router";

interface Props {
  user?: UserInterface;
  gotoSection: (sec: sectionTypes, replace?: boolean) => void;
  setLoading: (val: boolean) => void;
}

const OurPlans: React.FC<Props> = ({ user, gotoSection, setLoading }) => {
  const router = useRouter();
  return user ? (
    <div className="absolute left-0 right-0 -bottom-4 bg-gradient-to-t from-[#242237] via-[#242237] justify-end flex flex-col px-4 pt-12">
      <h1 className="text-white font-nunitoSB text-xl">
        SocialBoat Pricing Plans
      </h1>
      <div className="grid grid-cols-3 auto-rows-fr gap-4 py-4">
        {socialboatV3.plans.map((plan, index) => (
          <Plan
            key={`${plan.id}-$${index}`}
            plan={plan}
            user={user}
            setLoading={setLoading}
            // onTap={() => gotoSection("pay")}
            onTap={() => router.push(`/pay?id=${plan.id}`)}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default OurPlans;
