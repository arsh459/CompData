import { Link } from "@mui/material";
import { UserInterface } from "@models/User/User";
import { getCommunityNames } from "./utils";

interface Props {
  leaders: UserInterface[];
}

const UsersTemplate: React.FC<Props> = ({ leaders }) => {
  return (
    <div className="pt-20">
      <div className="flex flex-wrap max-w-screen-lg mx-auto">
        {leaders.map((item, index) => {
          const enNames = getCommunityNames(leaders, item.enrolledCommunities);
          return (
            <div
              key={`key-${item.uid}-${index}`}
              className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              {item.userKey ? (
                <Link href={`/${item.userKey}`} target="_blank">
                  <p className="underline hover:text-orange-500 font-semibold">
                    {item.name ? `${item.name}` : "No Name"}
                  </p>
                  <p className="underline hover:text-orange-500 text-sm">
                    {`@${item.userKey}`}
                  </p>
                </Link>
              ) : (
                <>
                  <p className="font-semibold">
                    {item.name ? item.name : "No Name"}
                  </p>
                  <p className="text-sm">{"no handle"}</p>
                </>
              )}

              <p className="text-xs break-words">
                Phone: {item.phone ? item.phone : "No Phone"}
              </p>

              <p className="text-xs break-words">
                Email: {item.email ? item.email : "No Email"}
              </p>

              <p className="text-sm">
                Communities:{" "}
                {item.enrolledCommunities
                  ? item.enrolledCommunities.length
                  : "0"}
              </p>

              {enNames.map((cName, index_2) => {
                return (
                  <div key={`${item.uid}-${cName}-${index_2}`} className="pl-2">
                    <p className="text-xs">{cName}</p>
                  </div>
                );
              })}

              <p className="text-sm">
                Events: {item.enrolledEvents ? item.enrolledEvents.length : "0"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersTemplate;
