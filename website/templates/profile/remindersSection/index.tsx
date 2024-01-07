import clsx from "clsx";
import React from "react";
import Button from "@components/button/index";
import IconButton from "@components/button/iconButton";

interface Props {
  edit?: boolean;
}
const ReminderSection: React.FC<Props> = ({ edit }) => {
  return (
    <div
      className={clsx(
        edit ? "animate-wiggle p-2 shadow-xl rounded-md" : "",
        "relative"
      )}
    >
      <div>
        <p className={clsx("text-gray-700 font-medium text-xs")}>
          Subscribe for latest updates
        </p>
        <div className={clsx("flex pt-1")}>
          <input
            placeholder={"Phone:"}
            className={clsx(
              "focus:outline-none bg-gray-200 shadow-2xl rounded-md placeholder-gray-400",
              //   "border border-gray-200",
              "text-gray-700",
              "text-left",
              "text-xs font-light",
              "w-3/4 h-9",
              "pl-2"
            )}
          />

          <div className={clsx("flex ml-2")}>
            <Button appearance="contained" color="success">
              <p className={clsx("text-xs capitalize")}>Whatsapp</p>
            </Button>
          </div>
        </div>
      </div>
      {edit ? (
        <div className="absolute -right-2 -top-2">
          <IconButton />
        </div>
      ) : null}
    </div>
  );
};

export default ReminderSection;
