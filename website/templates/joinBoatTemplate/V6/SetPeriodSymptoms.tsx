import { symptomId, symptomsList } from "@models/User/symptom";
import SymptomCard from "./SymptomCard";

interface Props {
  symptoms?: symptomId[];
  onPeriodSymptomsUpdate: (newVal: symptomId) => void;
  title: string;
  highlightedTitle: string;
  highlightedColor: string;
}

const SetPeriodSymptoms: React.FC<Props> = ({
  symptoms,
  onPeriodSymptomsUpdate,
  title,
  highlightedTitle,
  highlightedColor,
}) => {
  const splidedTitle = `__${title}__`.split(highlightedTitle);

  return (
    <div>
      <p
        className="text-[#F1F1F1] text-xl px-4"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {splidedTitle[0].replaceAll("__", "")}
        <span
          style={{ color: highlightedColor }}
        >{` ${highlightedTitle} `}</span>
        {splidedTitle[1].replaceAll("__", "")}
      </p>

      <div className="flex flex-row flex-wrap py-8">
        {symptomsList.map((item) => {
          const isSelected = symptoms?.includes(item.id) ? true : false;
          return (
            <div key={item.text} className="relative z-0">
              <SymptomCard
                onClick={() => onPeriodSymptomsUpdate(item.id)}
                item={item.text}
                image={item.image}
                isSelected={isSelected}
                textColor="#FFFFFF"
                tagColor={highlightedColor as string}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SetPeriodSymptoms;
