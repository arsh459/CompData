import Tag from "./Tag";

interface Props {
  selectedTags?: { [tag: string]: boolean };
  onTagSelect: (newTag: string) => void;
}

const allTags = [
  "Wrong Posture",
  "Reps issue",
  "Rules not followed",
  "Form not Clear",
  "Repeat entry",
];

const AddTags: React.FC<Props> = ({ onTagSelect, selectedTags }) => {
  return (
    <div>
      <div className="pb-2">Tags:</div>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {allTags.map((item) => {
          return (
            <div
              key={item}
              className="cursor-pointer"
              onClick={() => onTagSelect(item)}
            >
              <Tag text={item} selected={selectedTags && selectedTags[item]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddTags;
