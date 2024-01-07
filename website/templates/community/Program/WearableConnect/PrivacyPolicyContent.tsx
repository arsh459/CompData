import { Link } from "@mui/material";

interface Props {}

const PrivacyPolicyContent: React.FC<Props> = ({}) => {
  return (
    <div>
      <p className="text-center text-gray-700 font-semibold">
        Your privacy is important
      </p>
      <p className="text-gray-700 text-sm pt-2">We ensure the following:</p>

      <div className="pt-1">
        <li className="text-gray-700 text-sm">
          Your data will never be shared to any 3rd party
        </li>
        <li className="text-gray-700 text-sm">
          We access only your daily calorie data for the leaderboard.
        </li>
        <li className="text-gray-700 text-sm">
          Data shown is only for motivation. No ads will be sent to you.
        </li>
        <li className="text-gray-700 text-sm">
          You can disconnect & share your workout screenshots too.
        </li>
        <div className="flex">
          <li className="text-gray-700 text-sm pr-1">
            In case of any issue reach out to us:
          </li>
          <Link
            href="https://calendly.com/socialboat/consultation"
            target="_blank"
          >
            <p className="text-orange-500 underline text-sm">here</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
