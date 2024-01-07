import Button from "@components/button";

interface Props {
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
  buttonText: string;
  onButtonPress: () => void;
}

const ButtonWrapper: React.FC<Props> = ({
  leftButtonText,
  leftButtonOnPress,
  buttonText,
  onButtonPress,
}) => {
  return (
    <div>
      <div className="flex">
        {leftButtonOnPress && leftButtonText ? (
          <div className="pr-2">
            <Button appearance="control" onClick={leftButtonOnPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {leftButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
        <Button type="button" appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ButtonWrapper;
