import { Task } from "@models/Tasks/Task";
import { UserInterface, checkpoints } from "@models/User/User";
import firestore from "@react-native-firebase/firestore";

export const percentageToFraction = (percentage: number): string => {
  if (isNaN(percentage) || percentage < 0 || percentage > 1) {
    return `${percentage}`;
  }

  const fraction = percentage;
  const wholeNumber = Math.floor(fraction);
  const remainder = fraction - wholeNumber;

  if (remainder === 0) {
    return `${wholeNumber}`;
  }

  let numerator = remainder * 100;
  let denominator = 100;

  // Reduce fraction to lowest terms
  const gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return wholeNumber === 0
    ? `${numerator}/${denominator}`
    : `${wholeNumber} ${numerator}/${denominator}`;
};

export const updateReelView = async (uid: string, key: checkpoints) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update({ [`waMessageStatus.${key}`]: true });
};



// Get all the Custom Recipes from gptTasks collection for a particular user and particular Task
export const getCustomizedRecipes = async (task: Task, user: UserInterface) => {
  let customTaskdata: Task[] = [];
  let querySnapshot = await firestore()
    .collection("gptTasks")
    .where("userId", "==", user.uid)
    .where("baseTaskId", "==", task.id)
    .get();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    customTaskdata.push(data as Task);
  });
  return customTaskdata;
};
