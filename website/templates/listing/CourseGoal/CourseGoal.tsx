interface Props {
  courseGoal?: string;
}

const CourseGoal: React.FC<Props> = ({ courseGoal }) => {
  return (
    <div>
      <div>
        <p className="text-center text-lg text-gray-500">You will achieve</p>
        <p className="text-center text-2xl text-gray-700">
          {`"${courseGoal ? courseGoal : "Your course goal"}"`}
        </p>
      </div>
    </div>
  );
};

export default CourseGoal;
