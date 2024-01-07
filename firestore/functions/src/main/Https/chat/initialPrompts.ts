import { toSwapnilPhone } from "../../../constants/email/contacts";
import { getUserById } from "../../../models/User/Methods";
import { UserInterface } from "../../../models/User/User";

export const createUserPrompt = (user: UserInterface) => {
  return `You are Sakhi - a health and wellness ChatBot. You are talking to ${getUserString(
    user,
  )}. Generate 4 questions the user can ask Sakhi to improve their health and fitness. Each question should be less than 150 characters. Respond in the following format  - "Prompts: 1. [Question 1] 2. [Question 2] 3. [Question 3] 4. [Question 4]"`;

  // return `You are a health and wellness coach and your goal is to help people get fit by working out and eating healthy. You are talking to ${getUserString(
  // user,
  // )}. Based on the above information, create 4 prompt questions that the user can ask you. Each prompt should be less than 150 characters. Respond in the following format  - "Prompts: 1. [PROMPT 1] 2. [PROMPT 2] 3. [PROMPT 3] 4. [PROMPT 4]"`;
};

export const createSystemPrompt = async (
  uid: string,
  startingPrompt?: string,
) => {
  const user = await getUserById(uid);

  // get remote user
  if (user) {
    const initPrompt = `You are a chatbot called Sakhi AI designed by SocialBoat. Your job is to give diet, workout, health and wellness advice specific to questions asked to you. You should respond like a friendly and smart doctor. Please follow the following guidelines -
1. You are responding questions to ${getUserString(user)}
2. Suggest Indian food items, unless specifically asked against it. 
3. Keep your workout recommendations specific and focus on Yoga, walking and Pilates.
4. When asked medical questions, give an answer, but specify they should consult a doctor. Only specify this if you are giving advice related to medications.
5. Don't give more than 2 or 3 remedies. Ensure that each point has specific exercises and dish recommendations.
6. If someone asks where to find a workout program or dietician, you need to recommend SocialBoat with the link - https://socialboat.live/plans.
7. If they have a question about functioning of the app SocialBoat, please ask them to reach out on the phone number ${toSwapnilPhone} for customer support.
8. If someone specifies their time in their cycle, recommend basis cycle sync research on what should they workout or eat.
Try to end every answer with a suggestion on what the user can ask next. 
${
  startingPrompt
    ? `Let's begin. ${
        user.name ? user.name : "The user"
      } asks: ${startingPrompt}`
    : "If you have understood, start the chat with the user by friendly addressing them."
}

`;
    return initPrompt;
  }

  throw new Error("User does not exist");
};

const getName = (user: UserInterface) => (user.name ? user.name : "user");

/**
 *
 * Rahul, 24 years old Male. His weight is 84 kgs and wants to lose 5 kgs. He works out 2-5 times a day. She su
 */

const pcosDiagnosisString = (user: UserInterface) => {
  if (user.diagnosedPeriod === "3_6_months") {
    return ` ${getName(user)} was diagnosed 3-6 months back.`;
  } else if (user.diagnosedPeriod === "just_got_diagnosed") {
    return ` ${getName(user)} just got diagnosed.`;
  } else if (user.diagnosedPeriod === "more_than_6_months") {
    return ` ${getName(user)} got diagnosed more than 6 months back.`;
  }
  return "";
};

const getCycleLengthString = (user: UserInterface) => {
  if (user.cycleLength === "21_35") {
    return ` ${getName(user)}'s cycle length is 21-35 days.`;
  } else if (user.cycleLength === "35_45") {
    return ` ${getName(user)}'s cycle length is 35-48 days.`;
  } else if (user.cycleLength === "45_60" || user.cycleLength === "60_more") {
    return ` ${getName(user)}'s cycle length is more than 48 days days.`;
  }

  return "";
};

const pcosSymptomsString = (user: UserInterface) => {
  if (user.pcosSymptoms?.length) {
    let prevAdded: boolean = false;
    let symptomString: string = ` ${getName(user)} suffers from - `;

    if (user.pcosSymptoms?.includes("acne")) {
      symptomString += `acne`;
      prevAdded = true;
    }
    if (user.pcosSymptoms?.includes("bad_mood")) {
      symptomString += `${prevAdded ? ", " : ""}bad mood`;
      prevAdded = true;
    }

    if (user.pcosSymptoms?.includes("darkening_skin")) {
      symptomString += `${prevAdded ? ", " : ""}darkening skin`;
      prevAdded = true;
    }

    if (user.pcosSymptoms?.includes("facial_and_excess_hair")) {
      symptomString += `${prevAdded ? ", " : ""}excess facial hair`;
      prevAdded = true;
    }

    if (user.pcosSymptoms?.includes("hairfall")) {
      symptomString += `${prevAdded ? ", " : ""}hairfall`;
      prevAdded = true;
    }

    symptomString += ".";
    return symptomString;
  }

  return "";
};

const getLoseWeightString = (user: UserInterface) => {
  if (user.desiredWeight && user.weight && user.desiredWeight <= user.weight) {
    return ` ${getName(user)}'s current weight is ${
      user.desiredWeight
    }kg and wants to lose ${user.weight - user.desiredWeight}kg.`;
  }

  return "";
};

//
const getGoalString = (user: UserInterface) => {
  if (user.fitnessGoal?.includes("pcos_pcod")) {
    return `${getName(
      user,
    )}'s suffers from PCOS/PCOD, and wants to manage or reverse it.${pcosDiagnosisString(
      user,
    )}${pcosSymptomsString(user)}${getCycleLengthString(
      user,
    )}${getLoseWeightString(user)}`;
  } else if (user.fitnessGoal?.includes("lose_weight")) {
    return `${getName(
      user,
    )} has excess weight and wants to reduce it.${getLoseWeightString(user)}`;
  } else if (user.fitnessGoal?.includes("keep_fit")) {
    `${getName(user)}'s goal is to keep up the fitness routine.`;
  }

  return "";
};

const getWorkoutFrequency = (user: UserInterface) => {
  if (user.workoutFrequency === "everyday") {
    return ` ${getName(user)} works out everyday.`;
  } else if (user.workoutFrequency === "1_3") {
    return ` ${getName(user)} works out 1-3 times a week.`;
  } else if (user.workoutFrequency === "2_5") {
    return ` ${getName(user)} works out 2-5 times a week.`;
  } else if (user.workoutFrequency === "none") {
    return ` ${getName(user)} hasn't worked out in a while.`;
  }

  return "";
};

const getAgeString = (user: UserInterface) => {
  if (user.age) {
    return ` ${getName(user)} is ${user.age} years old.`;
  } else {
    return ` ${getName(user)} is 25-30 years old.`;
  }
};

const getGenderString = (user: UserInterface) => {
  if (user.gender === "male" || user.gender === "female") {
    return ` ${getName(user)} is a ${user.gender}.`;
  }
  return "";
};

const getUserString = (user: UserInterface) => {
  return `${getName(user)}.${getAgeString(user)}${getGenderString(
    user,
  )}${getGoalString(user)}${getWorkoutFrequency(user)}`;
};
