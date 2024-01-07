import { TerraUser } from "@models/Terra/TerraUser";
// import { UserInterface } from "@models/User/User";
import Connect from "./Connect";
import Connected from "./Connected";

interface Props {
  terraUser?: TerraUser;
  uid?: string;
  leaderKey: string;
  eventKey?: string;
  workout?: boolean;
}

const WearableConnect: React.FC<Props> = ({
  terraUser,
  uid,
  leaderKey,
  eventKey,
  workout,
}) => {
  return (
    <div>
      {terraUser && uid ? (
        <div className="pb-0">
          <Connected terraUser={terraUser} uid={uid} />
        </div>
      ) : uid ? (
        <div className="pb-0">
          <Connect
            leaderKey={leaderKey}
            uid={uid}
            workout={workout}
            eventKey={eventKey}
          />
        </div>
      ) : null}
    </div>
  );
};

export default WearableConnect;
