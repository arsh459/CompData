import { getUserByPhone } from "../../../../models/User/Methods";

export const handleSakhiMain = async (phone: string, message: string) => {
  // get user by phone
  const user = await getUserByPhone(phone);

  // if user is not onboarded, use onboarding bot
  if (user.length && user[0].onboarded) {
    console.log("found", user[0].name, user[0].phone);

    // main bot
  } else {
    // onboarding bot
  }
};
