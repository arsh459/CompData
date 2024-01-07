import { TextField } from "@mui/material";
import React from "react";

interface Props {
  email?: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextHandle: () => void;
}
const SelectEmail: React.FC<Props> = ({
  email,
  error,
  handleChange,
  onNextHandle,
}) => {
  return (
    <div className="w-full  flex flex-col items-center  justify-start pt-24 ">
      <div className="w-full max-w-screen-lg flex-1 flex flex-col justify-evenly  px-4">
        <div>
          <div className=" w-full max-w-3xl text-white text-3xl lg:text-4xl font-popR">
            <p>Select your interests ✨</p>
          </div>
          <div className="h-px w-full my-5 bg-white/25" />

          <div className="flex w-full max-w-4xl  flex-col  mx-auto lg:mx-0">
            <p className="text-white text-xl lg:text-2xl pb-4 font-popR">
              Add Your Email
            </p>

            <TextField
              hiddenLabel
              // label="Email"
              type="email"
              value={email}
              variant="filled"
              onChange={handleChange}
              error={error !== ""}
              helperText={error}
              InputProps={{
                style: { color: "#FFFFFF" },
              }}
              placeholder="your@email.com"
            />
          </div>
        </div>
        <div className="w-full inset-x-0 max-w-screen-md flex justify-center pt-6 absolute bottom-8 mx-auto">
          <div
            onClick={onNextHandle}
            className="w-[95%] lg:w-full  max-w-2xl   cursor-pointer rounded-xl py-2  bg-gradient-to-r from-[#DE369D] to-[#DE369D]"
          >
            <p className="text-xl text-center font-popR text-[#EAEAEA]">
              Start Reading
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectEmail;
