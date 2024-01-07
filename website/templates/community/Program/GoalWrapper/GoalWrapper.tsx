import LineDivider from "@templates/editEvent/Form/SessionHolder/LineDivider";
interface Props {
  goal?: string;
}

const GoalWrapper: React.FC<Props> = ({ goal }) => {
  return (
    <>
      <div className="pb-2">
        {goal ? (
          <>
            <LineDivider text="And" paddingString="pt-2 pb-2" />

            <p className="text-center text-xl text-gray-700 font-medium">
              {`"${goal}"`}
            </p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default GoalWrapper;
