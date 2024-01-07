import { TouchableOpacity } from "react-native";
import { SbPlans } from "@models/AppSubscription/AppSubscription";
import { getPrefixSuffix } from "../GetAccessMain/utils";
import clsx from "clsx";
import ListPlanItem from "../ListPlanItem";
import { planContent } from "../utils";
import GradientText from "@components/GradientText";
import { discriminatorMobile } from "./interface";

interface Props {
  plan: SbPlans;
  index: number;
  isSelected?: boolean;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ListPlanItems: React.FC<Props> = ({
  plan,
  index,
  isSelected,
  setSelectedIndex,
}) => {
  const duration = getPrefixSuffix(
    plan.durationInDays ? plan.durationInDays : 0
  );
  const planDetails =
    typeof index === "number" ? planContent[index] : planContent[0];

  return (
    <TouchableOpacity
      className={clsx(
        "relative z-0 cursor-pointer w-1/3 rounded-xl mr-1",
        isSelected && "bg-white/10"
      )}
      onPress={() => setSelectedIndex(index)}
    >
      {typeof index === "number" && (
        <GradientText
          text={`${duration.prefix} ${duration.suffix.split(" ").join("\n")}`}
          textStyle={{
            fontSize: 12,
            marginBottom: 0,
            color: "white",
          }}
          colors={planDetails?.colors || ["transparent", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          fallbackColor="white"
          txtTlStyle="text-center font-sans font-semibold py-4 leading-3"
        />
      )}
      <ListPlanItem
        label={discriminatorMobile[0]}
        value={plan?.cost ? `INR ${plan?.cost}` : "-"}
      />
      <ListPlanItem
        label={discriminatorMobile[1]}
        value={
          plan?.offerings?.nbLiveClasses
            ? `${plan?.offerings?.nbLiveClasses} sessions`
            : "No"
        }
      />
      <ListPlanItem
        label={discriminatorMobile[2]}
        value={plan.offerings?.nbDoctorConsultation || "X"}
      />
      <ListPlanItem
        label={discriminatorMobile[3]}
        value={plan.offerings?.nbDietConsultation || "X"}
      />
      <ListPlanItem
        label={discriminatorMobile[4]}
        value={plan.benefits?.isAccountabilityCoach ? "R" : "X"}
        isImage={true}
      />
      <ListPlanItem
        label={discriminatorMobile[5]}
        value={plan.offerings?.nbLiveInteraction}
      />
      <ListPlanItem
        label={discriminatorMobile[6]}
        value={`${plan?.offerings?.nbDailyVideoes} days`}
      />
      <ListPlanItem
        label={discriminatorMobile[7]}
        value={`${plan?.offerings?.nbPauseDays} days`}
      />
    </TouchableOpacity>
  );
};

export default ListPlanItems;
