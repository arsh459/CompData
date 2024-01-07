import Button from "@components/button";
// import clsx from "clsx";

interface Props {
  heading: string;
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
  buttonText: string;
  onButtonPress: () => void;
  helperText: string;
}

const EditorLayout: React.FC<Props> = ({
  heading,
  leftButtonText,
  leftButtonOnPress,
  buttonText,
  onButtonPress,
  helperText,
  children,
}) => {
  return (
    <div className="">
      <div className="pb-4">
        <p className="text-4xl text-gray-600 font-medium">{heading}</p>
      </div>

      {children}

      <div>
        <p className="text-base text-gray-500 font-normal pt-1">{helperText}</p>
      </div>
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
        <Button appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default EditorLayout;
