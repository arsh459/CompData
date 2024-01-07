import { useUserEnrolledEvents } from "@hooks/user/useUserEnrolledEvents";
import { UserInterface } from "@models/User/User";
import NextButton from "@templates/community/Program/NextButton";
// import { useState } from "react";
import DiscoverGames from "./DiscoverGames";
import TeamCard from "./TeamCard";

interface Props {
  user: UserInterface;
}

const TeamsView: React.FC<Props> = ({ user }) => {
  // const [numVisible, setNumVisible] = useState<number>(3);
  const { userEvents, onNext, nextMembersExist, fetched } =
    useUserEnrolledEvents(user.uid);

  // console.log("userEvents", userEvents);

  // console.log("userEvents", userEvents);

  // const onNext = () => setNumVisible((prev) => prev + 5);

  return (
    <div className=" py-2">
      <>
        {userEvents.length ? (
          <div className="pb-2 px-4">
            <p className="text-gray-700 text-4xl font-semibold">Your Teams</p>
          </div>
        ) : null}
        <div className="pt-4">
          {/** each event should member keys. Order should be basis member activity */}
          {userEvents.map((item) => {
            return (
              <div key={item.id} className="pt-4">
                <TeamCard id={item.id} sbEvent={item} />
              </div>
            );
          })}
        </div>

        {nextMembersExist ? (
          <div className="bg-white w-full mb-4 md:pb-0">
            <NextButton onClick={onNext} text={"Show More"} />
          </div>
        ) : null}
      </>

      {!fetched ? null : (
        <div className="pt-20">
          <DiscoverGames heading="Discover other games" />
        </div>
      )}
    </div>
  );
};

export default TeamsView;
