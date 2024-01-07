import { useUserEnrolledEvents } from "@hooks/user/useUserEnrolledEvents";
import TeamCard from "./TeamCard";

interface Props {
  uid: string;
  color: string;
}

const TeamsCarousal: React.FC<Props> = ({ uid, color }) => {
  const { userEvents, nextMembersExist, onNext, fetched } =
    useUserEnrolledEvents(uid);

  return (
    <div className="px-4">
      {userEvents.map((item) => (
        <TeamCard key={item.id} team={item} />
      ))}

      {fetched && nextMembersExist ? (
        <button
          onClick={onNext}
          className="w-full py-2 mb-4 rounded-lg text-lg text-white"
          style={{ backgroundColor: color }}
        >
          Show More
        </button>
      ) : null}
    </div>
  );
};

export default TeamsCarousal;
