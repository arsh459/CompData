import { dietSuggestions, dietTypes } from "@models/Appintment";
import TextDivider from "../TextDivider";
import TextInputField from "../TextInputField";

const dietTypesObj: { [key in dietTypes]: string } = {
  low_carb: "Low Carb",
  keto: "Keto",
  vegan: "Vegan",
  high_protein: "High Protein",
};

interface Props {
  color: string;
  dietData?: dietSuggestions;
  setDietData: (val: dietSuggestions) => void;
}

const DietaryGols: React.FC<Props> = ({ color, dietData, setDietData }) => {
  const onToggle = (tag: dietTypes) => {
    const remoteParticularDietToFollow = dietData?.particularDietToFollow;

    const newParticularDietToFollow = remoteParticularDietToFollow?.includes(
      tag
    )
      ? remoteParticularDietToFollow.filter((each) => each !== tag)
      : remoteParticularDietToFollow
      ? [...remoteParticularDietToFollow, tag]
      : [tag];

    setDietData({
      ...dietData,
      particularDietToFollow: newParticularDietToFollow,
    });
  };

  const getDietTag = (tag: dietTypes) => {
    const isSelected = dietData?.particularDietToFollow?.includes(tag);
    return (
      <div
        key={tag}
        onClick={() => onToggle(tag)}
        className="text-sm text-center cursor-pointer rounded-full font-popL capitalize px-4 py-2 border"
        style={{
          backgroundColor: isSelected ? `${color}80` : "transparent",
          color: isSelected ? "#FFFFFF" : color,
          borderColor: isSelected ? "transparent" : `${color}80`,
        }}
      >
        {dietTypesObj[tag]}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <TextDivider text="Dietary goals" />
      <TextInputField
        label="Note for dietician"
        multiline={true}
        placeholder="Example - break insulin resistance"
        value={dietData?.noteForDietician || ""}
        onChange={(e) =>
          setDietData({
            ...dietData,
            noteForDietician: e.target.value,
          })
        }
      />
      <TextInputField
        label="Nutrients to include"
        placeholder="Example - protein, soya"
        value={dietData?.nutrientsToInclude || ""}
        onChange={(e) =>
          setDietData({
            ...dietData,
            nutrientsToInclude: e.target.value,
          })
        }
      />
      <TextInputField
        label="Any particular food item to be included"
        placeholder="Example - include honey water"
        value={dietData?.particularFoodToInclude || ""}
        onChange={(e) =>
          setDietData({
            ...dietData,
            particularFoodToInclude: e.target.value,
          })
        }
      />

      <div className="flex flex-wrap gap-4">
        <div className="whitespace-nowrap text-sm text-center text-black/80 font-popM py-2">
          Particular diet to follow:
        </div>
        {Object.keys(dietTypesObj).map((each) => getDietTag(each as dietTypes))}
      </div>
    </div>
  );
};

export default DietaryGols;
