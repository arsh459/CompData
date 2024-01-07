import { useEffect, useState } from "react";
import Button from "@components/button";
import BMIText from "./BMIText";

interface Props {
  weight?: number;
  height?: number;
  leftButtonText?: string;
  buttonText?: string;
  leftButtonOnPress?: () => void;
  onButtonPress: () => void;
}

const lowerBMI = 18.5;
const upperBMI = 24.9;

const BMI: React.FC<Props> = ({
  weight,
  height,
  leftButtonText,
  leftButtonOnPress,
  buttonText,
  onButtonPress,
}) => {
  const [bmi, setBMI] = useState<number>(-1);
  // const [idealWeight, setIdealWeight] = useState<number>(-1);
  const [lowestIdeal, setLowestIdeal] = useState<number>(-1);
  const [highestIdeal, setHighestIdeal] = useState<number>(-1);

  // console.log("weight", weight, height);

  useEffect(() => {
    if (height && weight) {
      setBMI(weight / ((height * height) / 10000));
      setLowestIdeal(lowerBMI * (height / 100) * (height / 100));
      setHighestIdeal(upperBMI * (height / 100) * (height / 100));
    }
  }, [weight, height]);

  return (
    <div>
      <div className="pb-4">
        {bmi > 0 ? (
          <p className="text-4xl text-gray-600 font-medium">{`Your BMI is ${
            Math.round(bmi * 10) / 10
          }`}</p>
        ) : (
          <p className="text-4xl text-gray-600 font-medium">
            Fitness assessment pending
          </p>
        )}
      </div>
      <BMIText
        weight={weight}
        height={height}
        lowestIdeal={lowestIdeal}
        hightestIdeal={highestIdeal}
      />
      <div className="flex pt-4">
        {leftButtonOnPress && leftButtonText ? (
          <div className="pr-2">
            <Button appearance="control" onClick={leftButtonOnPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {leftButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}
        <Button type="button" appearance="contained" onClick={onButtonPress}>
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default BMI;
