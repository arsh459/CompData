import Button from "@components/button";

interface Props {
  heading: string;
  buttonText: string;
  helperText: string;
  leftButtonPress: () => void;
  onButtonPress: () => void;
  leftButtonText: string;
}

const ListIntermediate: React.FC<Props> = ({
  leftButtonText,
  heading,
  children,
  leftButtonPress,
  onButtonPress,
  buttonText,
  helperText,
}) => {
  return (
    <div>
      <div>
        <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
      </div>
      <div className="pt-2">{children}</div>
      <div className="flex pt-4">
        <div className="pr-2">
          <Button
            appearance="control"
            onClick={leftButtonPress}
            // onClick={() => onChange((prev: ListItem[]) => [...prev])}
          >
            <div className="pl-2 pr-2">
              <p className="capitalize text-gray-700 font-medium">
                {leftButtonText}
              </p>
            </div>
          </Button>
        </div>
        <Button
          appearance="contained"
          onClick={onButtonPress}
          //   onClick={() => onButtonPress("schedule", "", dateTimeList)}
        >
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ListIntermediate;
