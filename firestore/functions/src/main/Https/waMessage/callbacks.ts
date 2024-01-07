import {
  getUserByPhone,
  getUserGoalStringV2,
} from "../../../models/User/Methods";

export const slotGeneratorVars = async (phone?: string): Promise<string[]> => {
  if (phone) {
    const users = await getUserByPhone(phone);

    if (users.length) {
      const user = users[0];

      return [
        user.name ? user.name.trim() : "",
        user.weight ? `${user.weight} Kg` : "",
        user.desiredWeight ? `${user.desiredWeight} Kg` : "",
        getUserGoalStringV2(user.fitnessGoal),
      ];
    }
  }

  return [];
};

export const nameGeneratorVar = async (phone?: string): Promise<string[]> => {
  if (phone) {
    const users = await getUserByPhone(phone);

    if (users.length) {
      const user = users[0];

      return [user.name ? user.name.trim() : "there"];
    }
  }

  return [];
};

export const emptyArray = async (): Promise<string[]> => {
  return [];
};
