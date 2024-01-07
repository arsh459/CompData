import clsx from "clsx";

interface Props {
  value: string | undefined;
  onChangeText: (newVal: string) => void;
  placeholder: string;
  icon: string;
  iconAlt: string;
  autofocus: boolean;
}

const LinkInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  icon,
  iconAlt,
  autofocus,
}) => {
  return (
    <div className="flex items-center">
      <div className="pr-2">
        <img src={icon} className="w-6 h-6 object-cover" alt={iconAlt} />
      </div>
      <input
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        autoFocus={autofocus}
        placeholder={placeholder}
        className={clsx(
          "focus:outline-none rounded-lg placeholder-gray-400",
          "text-gray-700 text-md font-light",
          "bg-transparent",
          "w-full"
        )}
      />
    </div>
  );
};

export default LinkInput;
