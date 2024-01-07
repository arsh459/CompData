import clsx from "clsx";

interface Props {
  fields: string[];
  selectedValue?: string;
  selectedValues?: string[];
  multiSelect?: boolean;
  onSelect: (field: string) => void;
  onRemove?: (field: string) => void;
}

const FieldSelect: React.FC<Props> = ({
  fields,
  onSelect,
  selectedValue,
  selectedValues,
  multiSelect,
  onRemove,
}) => {
  return (
    <div className="flex flex-wrap">
      {fields.map((item) => {
        let selected = false;
        if (multiSelect && selectedValues) {
          selected = selectedValues.includes(item) ? true : false;
        } else if (selectedValue) {
          selected = item === selectedValue ? true : false;
        }

        return (
          <div
            key={item}
            className={clsx(
              selected ? "border-green-500 border-2" : "border border-gray-400",
              "p-2 m-2 cursor-pointer"
            )}
          >
            <p className="text-lg pb-1">{item}</p>
            <p className="text-green-500" onClick={() => onSelect(item)}>
              Add
            </p>
            {onRemove && selected ? (
              <p className="pt-2 text-red-500" onClick={() => onRemove(item)}>
                Remove
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default FieldSelect;
