import {
  getAllUsersWithEmail,
  //  getAllUsersWithFP
} from "../../../../models/User/Methods";

export const fpDumpMain = async (): Promise<{
  status: boolean;
  reason: string;
}> => {
  const users = await getAllUsersWithEmail();

  let i: number = 0;
  for (const user of users) {
    console.log(
      `${i} | ${user.uid} | ${user.gender} | ${user.phone} | ${user.email} | ${user.name} | ${user.fpCredit} | ${user.fpDebit} | ${user.userLevelV2}`,
    );

    i++;
  }

  return {
    status: true,
    reason: "",
  };
};
