import { Link } from "@mui/material";

interface Props {}

const PermissionsContent: React.FC<Props> = ({}) => {
  return (
    <div>
      <p className="text-center text-gray-700 font-semibold">
        Connecting your Wearable
      </p>
      <p className="text-gray-700 text-sm pt-2">
        Please share all the permissions when prompted. No human will see your
        data!
      </p>

      <div className="pt-1">
        <li className="text-gray-700 text-sm">
          You can disconnect & share your workout screenshots too.
        </li>
        <li className="text-gray-700 text-sm">
          We will never share your data to any 3rd party
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

export default PermissionsContent;
