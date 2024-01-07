import Button from "@components/button";
import clsx from "clsx";

interface Props {
  currency?: "₹" | "$" | "Day" | "Kg:" | "Yrs:" | "Minutes:";
  value: number;
  suffix: string;
  heading: string;
  helperText: string;
  onCurrencyChange: () => void;
  onValueChange: (newVal: number) => void;
  buttonText: string;
  onButtonPress: () => void;
  placeholder: string;
  leftButtonText?: string;
  leftButtonOnPress?: () => void;
}

const CollectPrice: React.FC<Props> = ({
  heading,
  value,
  suffix,
  helperText,
  currency,
  onCurrencyChange,
  onValueChange,
  buttonText,
  onButtonPress,
  placeholder,
  leftButtonText,
  leftButtonOnPress,
}) => {
  return (
    <div>
      <div className="pb-4">
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        </div>

        <div className="flex items-center">
          {currency ? (
            <div className="pr-2">
              <p className="text-gray-500 text-2xl">{currency}</p>
            </div>
          ) : null}

          <input
            inputMode="numeric"
            value={value ? value : 0}
            onChange={(e) => onValueChange(Number.parseFloat(e.target.value))}
            autoFocus={true}
            placeholder={placeholder}
            className={clsx(
              "focus:outline-none  rounded-lg placeholder-gray-400",
              "text-gray-600 text-3xl font-light",
              "bg-transparent",
              "w-full"
            )}
          />

          {suffix ? (
            <div className="pl-2">
              <p className="text-gray-500 text-2xl">{suffix}</p>
            </div>
          ) : null}
        </div>

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

export default CollectPrice;
