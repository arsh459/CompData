import { useActivities } from "@hooks/activities/useActivities";
import { TerraUser } from "@models/Terra/TerraUser";
import NextButton from "../Program/NextButton";
import ProfileActivityCard from "./ProfileActivityCard";

interface Props {
  uid: string;
  signedIn: boolean;
  terraUser?: TerraUser;
  canEdit?: boolean;
}

const ActivitiesJournal: React.FC<Props> = ({
  uid,
  terraUser,
  canEdit,
  signedIn,
}) => {
  const { activities, nextExists, onNext } = useActivities(uid, 10, "desc");

  //   console.log("activities", activities);

  return (
    <div>
      {!signedIn ? (
        <div>
          <div className="flex flex-col justify-center items-center pt-8">
            <img
              src="https://img.icons8.com/color/96/000000/lazy.png"
              className="w-36 h-46 object-cover"
            />
            <p className="text-center text-xl text-gray-700">
              This requires you to sign up
            </p>
            <p className="text-center text-base text-gray-500">
              Join Socialboat to see this information
            </p>
          </div>
        </div>
      ) : null}
      <div>
        {activities.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`} className="pb-0">
              <ProfileActivityCard
                uid={uid}
                activity={item}
                terraUser={terraUser}
                canEdit={canEdit}
              />
            </div>
          );
        })}
      </div>

      {nextExists ? (
        <div className="px-2 pt-4">
          <div className="bg-white w-full pb-4 md:pb-0">
            <NextButton onClick={onNext} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ActivitiesJournal;
