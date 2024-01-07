import { homeDomain } from "@constants/seo";
import Link from "next/link";

interface Props {
  // eventKey?: string;
  urlPath?: string;
  subdomain?: string;
}
const LiveURL: React.FC<Props> = ({ urlPath, subdomain }) => {
  // console.log("subdomain", subdomain);
  return (
    <div>
      {urlPath ? (
        <div className="flex items-center">
          <p className="text-gray-500 text-base pr-2">URL:</p>

          {subdomain ? (
            <Link href={`https://${subdomain}.${homeDomain}${urlPath}`}>
              <p className="text-sm underline text-blue-600">{`https://${subdomain}.${homeDomain}${urlPath}`}</p>
            </Link>
          ) : (
            <Link href={urlPath}>
              <p className="text-sm underline text-blue-600">{`https://${homeDomain}${urlPath}`}</p>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default LiveURL;
