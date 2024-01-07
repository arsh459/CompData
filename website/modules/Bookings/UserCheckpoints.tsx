import { UserInterface, checkpoints } from "@models/User/User";
import { updateUserCheckpoint, updateUserUnsub } from "./updateSlotStatus";
import { Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  user: UserInterface;
}

const UserCheckpoints: React.FC<Props> = ({ user }) => {
  const [bootcamp, setBootcamp] = useState<boolean>(
    user.waMessageStatus?.bootcamp ? true : false
  );
  const [community, setCommunity] = useState<boolean>(
    user.waMessageStatus?.joinedWellnessCommunity ? true : false
  );
  const [paymentDone, setPaymentDone] = useState<boolean>(
    user.waMessageStatus?.paymentDone ? true : false
  );

  const [unsub, setUnsub] = useState<boolean>(user.unsubscribe ? true : false);

  const updateFlag = async (key: checkpoints, value: boolean) => {
    await updateUserCheckpoint(user.uid, key, value);
    if (key === "bootcamp") {
      setBootcamp(value);
    } else if (key === "paymentDone") {
      setPaymentDone(value);
    } else {
      setCommunity(value);
    }
  };

  const unsubChange = async (value: boolean) => {
    // console.log("value", value);
    await updateUserUnsub(user.uid, value);

    setUnsub(value);
  };

  return (
    <div className="p-4 border border-gray-500 m-4">
      <p className="pb-2 text-lg font-bold">Flags</p>

      <div className="flex">
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={bootcamp}
            onChange={() => updateFlag("bootcamp", !bootcamp)}
          />
          <p className="text-gray-700">bootcamp done</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={community}
            onChange={() => updateFlag("joinedWellnessCommunity", !community)}
          />
          <p className="text-gray-700">Wellness Community</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={paymentDone}
            onChange={() => updateFlag("paymentDone", !paymentDone)}
          />
          <p className="text-gray-700">Payment Done</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={unsub}
            onChange={() => unsubChange(!unsub)}
          />
          <p className="text-gray-700">Unsubscribed</p>
        </div>
      </div>
    </div>
  );
};

export default UserCheckpoints;
