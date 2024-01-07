import { UserInterface } from "@models/User/User";
import { getTrueKeysString } from "@modules/Appointments/utils";
import { TextField } from "@mui/material";
import { useState } from "react";
interface Props {
  user: UserInterface;
}
const Overiew: React.FC<Props> = ({ user }) => {
  const [text, setText] = useState("");
  return (
    <div className="">
      <div className="">
        <p className="text-black/70 font-popM text-sm pb-2.5 pl-2.5">
          Chief complaints
        </p>
        <TextField
          style={{ width: "100%" }}
          InputProps={{
            style: { borderRadius: "12px", backgroundColor: "#FFF5FA" },
          }}
          placeholder={"Type here"}
          onChange={(val) => setText(val.target.value)}
          value={text || ""}
        />
      </div>
      <div className="flex justify-between pt-4 px-2.5">
        <p className="text-black/70 font-popM text-sm pb-2.5 ">
          Medical History
        </p>
        <p className="text-[#f62088] font-popM text-xs pb-2.5 ">Save Details</p>
      </div>
      <div className="p-4 bg-[#FFFCFD] rounded-xl">
        <p className="text-[#00000066] font-popR text-sm ">
          `Diagnosed with Lorem ipsum dolor sit amet .Lorem ipsum dolor sit amet
          ...`
        </p>
        {/* <TextField
          style={{ width: "100%" }}
          multiline
          InputProps={{
            style: { borderRadius: "12px", backgroundColor: "#FFFCFD" },
          }}
          placeholder={"Type here"}
          variant="filled"
          onChange={(val) => setText(val.target.value)}
          value={`Diagnosed with Lorem ipsum dolor sit amet .Lorem ipsum dolor sit amet
          ...`}
        /> */}
        <p className="text-[#00000080] font-popR text-sm flex  items-center pt-3">
          <span className="font-popM text-black ">Family Disease :</span>
          <span className="break-words  pl-2">
            {getTrueKeysString(user?.dietForm?.familyHistory) || "NA"}
          </span>
        </p>
      </div>
      <div className="pt-4">
        <p className="text-black/70 font-popM text-sm pb-2.5 pl-2.5">
          Surgical History
        </p>
        <TextField
          style={{ width: "100%" }}
          InputProps={{
            style: { borderRadius: "12px", backgroundColor: "#FFF5FA" },
          }}
          placeholder={"Type here"}
          onChange={(val) => setText(val.target.value)}
          value={text || ""}
        />
      </div>
      <p className="text-[#00000080] font-popR text-sm flex bg-[#FFF5FA] rounded-2xl my-2 p-4">
        <span className="font-popM text-black">Average cycle :</span>
        <span className="break-words  pl-2">{`${
          user?.periodTrackerObj?.inputCycleLength || "NA"
        }`}</span>
      </p>
      <p className="text-[#00000080] font-popR text-sm flex bg-[#FFF5FA] rounded-2xl my-2 p-4">
        <span className="font-popM text-black">Average period length :</span>
        <span className="break-words  pl-2">{`${
          user?.periodTrackerObj?.inputPeriodLength || "NA"
        }`}</span>
      </p>
    </div>
  );
};

export default Overiew;
