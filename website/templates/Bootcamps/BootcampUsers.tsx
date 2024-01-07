import { useBootcampUsers } from "@hooks/bootcamps/useBootcampUsers";

import UserBootcampCard from "./Cards/UserBootcampCard";
import InviteWidget from "./Cards/InviteWidget";

interface Props {
  id: string;
}

const BootcampUsersTemplate: React.FC<Props> = ({ id }) => {
  const { bootcampUsers } = useBootcampUsers(id);

  return (
    <div className="p-4">
      <div className="py-4">
        <InviteWidget id={id} />
      </div>
      <div className="p-4 pt-8 flex flex-wrap">
        {bootcampUsers.map((item) => {
          return (
            <div className="border" key={item.uid}>
              <UserBootcampCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BootcampUsersTemplate;
