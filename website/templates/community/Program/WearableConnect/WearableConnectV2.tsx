// import { TerraUser } from "@models/Terra/TerraUser";
// import { UserInterface } from "@models/User/User";
// import Connect from "./Connect";
import BackIcon from "public/icons/BackIcon";
import ConnectV2 from "./ConnectV2";
// import Connected from "./Connected";

interface Props {
  //   terraUser?: TerraUser;
  uid?: string;
  leaderKey?: string;
  eventKey?: string;
  workout?: boolean;

  onSkip: () => void;
  onBack: () => void;
}

const WearableConnectV2: React.FC<Props> = ({
  uid,
  leaderKey,
  eventKey,
  workout,
  onSkip,
  onBack,
}) => {
  return (
    <div>
      <div className="px-4 pt-4 flex">
        <div className="cursor-pointer" onClick={onBack}>
          <span className="text-gray-400 z-20 hover:text-gray-500">
            <BackIcon style={{ height: "25", width: "25", fill: "gray" }} />
          </span>
        </div>
      </div>
      <div className="px-4 py-4 h-screen flex justify-center items-center flex-col">
        <p className="text-gray-700 font-semibold text-3xl text-center">
          Connect your wearable
        </p>
        <p className="text-gray-500 text-lg text-center pt-1">
          If you do not connect a wearable you will be asked to submit a proof
          of workout to validate your activity
        </p>
        <img
          className="w-24 h-24 object-cover"
          src="https://r7.hiclipart.com/path/1015/343/716/5bbf80833035d-c6b38b5a4bcf2061c0d748dbcbbc051e.png?dl=1"
        />

        <div className="pt-2">
          <ConnectV2
            uid={uid}
            leaderKey={leaderKey}
            eventKey={eventKey}
            workout={workout}
          />
        </div>

        <div className="pt-6 cursor-pointer" onClick={onSkip}>
          <p className="text-gray-500 text-lg">Skip</p>
        </div>
      </div>
    </div>
  );
};

export default WearableConnectV2;
