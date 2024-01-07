import { LocalUser } from "@hooks/joinBoat/V6/interface";
import { diagnosedPeriodType } from "@models/User/User";
import OptionBox, { optionType } from "./OptionBox";

const options: optionType[] = [
  { key: "not_diagnosed", text: "Not Diagnosed" },
  { key: "just_got_diagnosed", text: "just Got Diagnosed" },
  { key: "3_6_months", text: "3 - 6 Months" },
  { key: "more_than_6_months", text: "More than 6 Months" },
];

interface Props {
  localUser?: LocalUser | undefined;
  onDiagnosedPeriodClick: (val: diagnosedPeriodType) => void;
}

const SetonDiagnosedPeriod: React.FC<Props> = ({
  localUser,
  onDiagnosedPeriodClick,
}) => {
  return (
    <div className="grid gap-4 p-4">
      {options.map((option) => (
        <OptionBox
          key={option.key}
          option={option}
          onPress={() =>
            onDiagnosedPeriodClick(option.key as diagnosedPeriodType)
          }
          isSelected={
            localUser?.diagnosedPeriod === (option.key as diagnosedPeriodType)
          }
        />
      ))}
    </div>
  );
};

export default SetonDiagnosedPeriod;
