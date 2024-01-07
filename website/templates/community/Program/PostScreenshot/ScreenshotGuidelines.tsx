interface Props {}

const ScreenshotGuidelines: React.FC<Props> = ({}) => {
  return (
    <div>
      <div>
        <p></p>
      </div>
      <div>
        {[
          "1. Ensure the date & cals are visible",
          "2. We count only active calories",
          //   "3. Win the motivator award!",
        ].map((item, index) => {
          return (
            <div key={`shot-${index}`} className="pb-1">
              <p className="text-gray-700 text-base">{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScreenshotGuidelines;
