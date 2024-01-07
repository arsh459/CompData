interface Props {
  weight?: number;
  height?: number;
  lowestIdeal: number;
  hightestIdeal: number;
}

const getStatus = (lowestW: number, highestW: number, weight?: number) => {
  if (weight) {
    if (weight >= lowestW && weight <= highestW) {
      return { action: "perfect", qty: 0 };
    } else if (weight < lowestW) {
      return { action: "gain", qty: Math.abs(weight - lowestW) };
    } else {
      return { action: "lose", qty: Math.abs(highestW - weight) };
    }
  }
  return {};
};

const BMIText: React.FC<Props> = ({
  weight,
  height,
  lowestIdeal,
  hightestIdeal,
}) => {
  const { action, qty } = getStatus(lowestIdeal, hightestIdeal, weight);

  return (
    <div>
      {weight && height ? (
        <div>
          <div className="">
            <p className="text-gray-700">
              On base of your BMI, you{" "}
              {action === "lose"
                ? "should lose"
                : action === "gain"
                ? "should gain"
                : "are on your ideal weight"}{" "}
            </p>
            {qty ? (
              <p className="text-gray-700 font-semibold">
                {Math.abs(Math.round(qty * 10)) / 10} kg(s)
              </p>
            ) : null}
          </div>
          <p className="text-gray-700 pt-2">
            Share your fitness objectives, to get a crisp workout/nutrition plan
          </p>
        </div>
      ) : (
        <p className="text-gray-700">
          Do a quick fitness assessment by clicking below
        </p>
      )}
    </div>
  );
};

export default BMIText;
