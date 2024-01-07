import { useUserKey } from "@hooks/user/useUserKey";
import { TextField } from "@mui/material";
import { generateFormattedKey } from "@models/User/userKey";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  uid?: string;
  keyValue?: string;
  lable: string;
  placeholder?: string;
  onKeyChange?: (newKey: string) => void;
  onNext: (val: string) => void;
  maxCharacterLength: number;
}

const VarifyFeild: React.FC<Props> = ({
  uid,
  keyValue,
  lable,
  placeholder,
  onKeyChange,
  onNext,
  maxCharacterLength,
}) => {
  const { keyValid } = useUserKey(keyValue, uid ? uid : "");

  const [text, seText] = useState<string>(keyValue ? keyValue : "");
  const [charLeft, setCharLeft] = useState<number>(
    maxCharacterLength ? maxCharacterLength : 14
  );
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    setClicked(false);
  }, [lable]);

  const onKeyStroke = (newText: string) => {
    if (newText.length <= maxCharacterLength) {
      const tmpText = generateFormattedKey(newText);

      seText(tmpText);
      setCharLeft(maxCharacterLength - tmpText.length);
      onKeyChange && onKeyChange(tmpText);
    }
  };

  // console.log("c", keyValue);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col py-4">
        <div className="JoinBoatField relative z-0">
          <TextField
            style={{ width: "100%" }}
            placeholder={placeholder}
            label={lable}
            variant="outlined"
            onChange={(newVal) => onKeyStroke(newVal.target.value)}
            value={text}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <img
            src={
              keyValid && charLeft < maxCharacterLength
                ? `https://ik.imagekit.io/socialboat/Component_1__1__Ty0DCxwIA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658929139107`
                : "https://ik.imagekit.io/socialboat/Group_424_c3AzfGVEY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659078110301"
            }
            className={clsx(
              !keyValue ? "opacity-0" : "",

              // uid
              //   ? keyValid && keyValue
              //     ? ""
              //     : !keyValid && keyValue
              //     ? ""
              //     : "opacity-0"
              //   : charLeft === 90
              //   ? "opacity-0"
              //   : "",
              "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
              "w-4 iphoneX:w-5 h-4 iphoneX:h-5 object-contain"
            )}
            alt="varify icon"
          />
        </div>
        <p className="text-sm font-light p-2">
          {uid
            ? !keyValue
              ? "Enter your unique handle"
              : keyValid
              ? "This is valid! You can start playing games with this"
              : "This handle already exists. Please try something else"
            : `${charLeft} characters left`}
        </p>
      </div>
      <button
        className={clsx(
          "m-4 border border-[#FF93A2] rounded-lg font-medium iphoneX:text-xl self-end w-max px-8 py-2",
          uid
            ? keyValid && keyValue
              ? ""
              : "opacity-0"
            : charLeft === 90
            ? "opacity-0"
            : "",
          clicked ? "bg-[#7D2834]" : "bg-[#FF556C]"
        )}
        onClick={() => {
          onNext(text);
          setClicked(true);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default VarifyFeild;
