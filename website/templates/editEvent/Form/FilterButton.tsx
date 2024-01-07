interface Props {
  buttonText: string;
  onPress: () => void;
  onCancel: () => void;
  cancelVisible: boolean;
}

const FilterButton: React.FC<Props> = ({
  onPress,
  buttonText,
  onCancel,
  cancelVisible,
}) => {
  return (
    <div className="flex items-center  p-2 px-4 shadow-md hover:shadow-lg border-blue-500 rounded-full border-2">
      <div onClick={onPress} className="cursor-pointer ">
        <p className="text-gray-600 font-medium text-sm capitalize">
          {buttonText ? buttonText : "Upload media"}
        </p>
      </div>
      {cancelVisible ? (
        <div onClick={onCancel} className="pl-1">
          <img
            alt="close-icon"
            src="/images/close-outline.svg"
            className="w-5 h-5"
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilterButton;
