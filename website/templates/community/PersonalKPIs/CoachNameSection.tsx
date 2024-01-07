interface Props {
  coachName?: string;
  signedInUserName?: string;
  isCoach?: boolean;
}

const CoachNameSection: React.FC<Props> = ({
  coachName,
  signedInUserName,
  isCoach,
}) => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-center text-gray-600 text-base pr-1">{coachName}</p>
      {!isCoach ? (
        <>
          <p className="text-center text-orange-500 text-base  pr-1">with</p>
          <p className="text-center text-gray-600 text-base ">
            {signedInUserName}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default CoachNameSection;
