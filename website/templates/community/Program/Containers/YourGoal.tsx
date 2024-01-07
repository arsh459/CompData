import YourGoalIllustraints from "./YourGoalIllustraints";

interface Props {
  goal?: string;
  goalPoints: string[];
  gameId: string;
}

const YourGoal: React.FC<Props> = ({ goal, goalPoints, gameId }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-8">
      <YourGoalIllustraints gameId={gameId} goal={goal} />
      {goalPoints.length ? (
        <div className="w-full text-sm iphoneX:text-base">
          <h5 className="font-bold py-1">What does it mean?</h5>
          {goalPoints.map((item, index) => (
            <div key={`gl-${index}`} className="flex items-center py-1">
              <span>{index + 1}.</span>
              <p className="pl-2">{item}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default YourGoal;
