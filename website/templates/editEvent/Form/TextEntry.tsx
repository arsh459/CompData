import Button from "@components/button";
import clsx from "clsx";

interface Props {
  heading: string;
  helperText: string;
  value: string | number | undefined;
  onChangeText: (newVal: string) => void;
  buttonText: string;
  onButtonPress: () => void;
  multiline?: boolean;
  placeholder: string;
  warning?: boolean;
  success?: boolean;
  inputMode: "text" | "numeric" | "email";
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const TextEntry: React.FC<Props> = ({
  heading,
  helperText,
  value,
  onChangeText,
  buttonText,
  onButtonPress,
  multiline,
  placeholder,
  warning,
  children,
  inputMode,
  leftButtonText,
  leftButtonOnPress,
  success,
}) => {
  return (
    <div className="">
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        </div>
        {children}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            name="Text1"
            rows={5}
            placeholder={placeholder}
            className={clsx(
              "placeholder-gray-400 px-2 py-2",
              "bg-white shadow-xl hover:shadow-2xl focus:shadow-2xl rounded-lg",
              "font-light",
              "max-w-3xl",
              "w-full text-gray-600 border-none rounded-lg outline-none focus:ring-0"
            )}
          ></textarea>
        ) : (
          <input
            value={value}
            inputMode={inputMode}
            onChange={(e) => {
              // console.log("v", e.target.value);
              onChangeText(e.target.value);
            }}
            autoFocus={true}
            placeholder={placeholder}
            className={clsx(
              "focus:outline-none  rounded-lg ",
              " text-3xl font-light",
              "bg-transparent",
              "w-full",
              success ? "border-b-green-500 border-b-2 rounded-none" : "",
              warning && value
                ? "placeholder-red-400 text-red-500"
                : "text-gray-600 placeholder-gray-400"
            )}
          />
        )}

        <p className="text-sm text-gray-700 font-light pt-1">{helperText}</p>
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
        {buttonText ? (
          <Button type="button" appearance="contained" onClick={onButtonPress}>
            <div className="pl-2 pr-2">
              <p className="capitalize">{buttonText}</p>
            </div>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default TextEntry;
