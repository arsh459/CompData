import { UserInterface } from "../../../models/User/User";

export const calculateKCalTarget = (user: UserInterface) => {
  // getBMR
  let bmr: number = 1600;

  if (user.gender === "male" && user.weight && user.height) {
    bmr = bmrMaleCalculator(user.weight, user.height, user.age ? user.age : 25);
  } else if (user.weight && user.height) {
    bmr = bmrFemaleCalculator(
      user.weight,
      user.height,
      user.age ? user.age : 25,
    );
  }

  let caloriesNeeded = bmr;
  // calories needed
  if (user.difficulty === "Easy") {
    caloriesNeeded = bmr * 1.375;
  } else if (user.difficulty === "Medium") {
    caloriesNeeded = bmr * 1.55;
  } else if (user.difficulty === "Not Easy") {
    caloriesNeeded = bmr * 1.55;
  } else if (user.difficulty === "Hard") {
    caloriesNeeded = bmr * 1.55;
  }

  const currentWeight = user.weight ? user.weight : -1;
  let desiredWeight: number = user.desiredWeight
    ? user.desiredWeight
    : currentWeight
    ? currentWeight
    : -1;

  if (desiredWeight === -1 || currentWeight === -1) {
    return caloriesNeeded;
  }

  if (desiredWeight > currentWeight) {
    return caloriesNeeded + 300;
  } else if (desiredWeight < currentWeight) {
    return caloriesNeeded - 500;
  } else {
    return caloriesNeeded;
  }
};

export const bmrMaleCalculator = (
  weight: number,
  height: number,
  age: number,
) => {
  return 66.5 + 13.75 * weight + 5.003 * height * 2.54 - 6.75 * age;
};

export const bmrFemaleCalculator = (
  weight: number,
  height: number,
  age: number,
) => {
  return 655.1 + 9.563 * weight + 1.85 * height * 2.54 - 4.676 * age;
};

export const bmrMaleCalculatorMifflin = (
  weight: number,
  height: number,
  age: number,
) => {
  return weight * 10 + 6.25 * height * 2.54 - 5 * age + 5;
};

export const bmrFemaleCalculatorMifflin = (
  weight: number,
  height: number,
  age: number,
) => {
  return weight * 10 + 6.25 * height * 2.54 - 5 * age - 161;
  // return 655.1 + 9.563 * weight + 1.85 * height * 2.54 - 4.676 * age;
};
