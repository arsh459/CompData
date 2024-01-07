import Button from "@components/button";
import { TextField } from "@mui/material";
import clsx from "clsx";

interface Props {
  heading: string;
  helperText?: string;
  value: string;
  onChangeText: any;
  onBlur: any;
  buttonText?: string;
  onButtonPress?: () => void;
  multiline?: boolean;
  placeholder?: string;
  success?: boolean;
  type: "email" | "password" | "text";
  name: string;
}

const ConsumerText: React.FC<Props> = ({
  heading,
  helperText,
  value,
  onChangeText,
  buttonText,
  onButtonPress,
  multiline,
  success,
  placeholder,
  type,
  name,
  onBlur,
}) => {
  return (
    <div className="">
      <div>
        {/* <div className="pb-1">
          <p className="text-sm text-gray-600 font-medium">{heading}</p>
        </div> */}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChangeText(e.target.value)}
            name="Text1"
            rows={5}
            placeholder={placeholder}
            className={clsx(
              "placeholder-gray-400 px-2 py-2",
              "bg-gray-200 shadow-xl hover:shadow-2xl focus:shadow-2xl rounded-lg",
              "font-light",
              "w-full text-gray-600 border-none rounded-lg outline-none focus:ring-0"
            )}
          ></textarea>
        ) : (
          <div className="">
            <TextField
              style={{ width: "100%" }}
              // helperText={helperText}
              name={name}
              placeholder={placeholder}
              label={heading}
              onBlur={onBlur}
              variant="outlined"
              onChange={
                onChangeText
                // (newVal) => onChangeText(newVal.target.value)
                // (newVal) => onChangeText(newVal)
                // setSelectedItem({ ...item, heading: newVal.target.value })
              }
              value={value}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* <input
              value={value}
              type={type}
              name={name}
              onChange={onChangeText}
              onBlur={onBlur}
              // onChange={(e) => onChangeText(e.target.value)}
              autoFocus={true}
              placeholder={placeholder}
              className={clsx(
                "bg-gray-200 shadow-xl focus:shadow-2xl rounded-lg placeholder-gray-400",
                "text-gray-600 text-base font-light",
                "h-12",
                "pl-4",
                "focus:ring-0",
                "focus:outline-none",
                success
                  ? "focus:ring-green-500 ring-2 ring-green-500 outline-[green]"
                  : "",
                //   "bg-transparent",
                "w-full"
              )}
            /> */}
          </div>
        )}

        {helperText ? (
          <p className="text-xs text-gray-600 font-light pt-1 pl-1">
            {helperText}
          </p>
        ) : null}
      </div>
      {buttonText && onButtonPress ? (
        <div className="flex">
          <Button appearance="contained" onClick={onButtonPress}>
            <div className="pl-2 pr-2">
              <p className="capitalize">{buttonText}</p>
            </div>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ConsumerText;
