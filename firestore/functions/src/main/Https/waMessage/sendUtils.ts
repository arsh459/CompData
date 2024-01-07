import { sendHSMV2 } from "../../../models/Conversations/sendHSMV2";
import { UserInterface } from "../../../models/User/User";
import { sleep } from "../../FirestoreTriggers/onLiveWorkoutUpdate/handleLiveUpdate";

export const blockedUsers: string[] = [
  "+919336013821",
  "+919789266613",
  "+919172325082",
  "+919982026669",
  "+917499621574",
  "+916287618828",
  "+918390274311",
  "+919466393619",
  "+212620670347",
  "+919599773860",
  "+918828356209",
  "+60165401607",
  "+917620963339",
  "+91911120050",
  "+918448585004",
  "+919711602097",
];

export const sendToPhoneList = async (
  phones: string[],
  templateId: string,
  test: boolean,
  startIndx: number,
  image: string,
  numEnd: number,
  varGenerator?: (phone?: string) => Promise<string[]>,
) => {
  const sortedNumbers = phones.sort((a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
  });

  console.log("SENDING TO", sortedNumbers.length);

  let i: number = 0;
  const sentMap: { [phone: string]: boolean } = {};

  for (const phone of sortedNumbers) {
    i++;

    if (i > startIndx && i <= numEnd) {
      if (blockedUsers.includes(phone)) {
        console.log("Skipping from Blocked LIST", phone, i);
      } else if (sentMap[phone]) {
        console.log("Skipping Sent User", phone, i);
      } else {
        console.log(i, " | ", phone);

        if (test) {
          let paramsTest = ["there"];
          if (varGenerator) {
            paramsTest = await varGenerator(phone);
          }

          console.log("paramsTest", paramsTest);

          await sendHSMV2(
            "+919538404044",
            templateId,
            paramsTest,
            undefined,
            image ? [image] : undefined,
          );
          console.log("SENT TO SWAPNIL");

          await sendHSMV2(
            "+919811800046",
            templateId,
            paramsTest,
            undefined,
            image ? [image] : undefined,
          );
          console.log("SENT TO RAHUL");

          throw new Error("Testing");
        } else {
          let params = ["there"];
          if (varGenerator) {
            params = await varGenerator(phone);
          }

          const isError = await sendHSMV2(
            phone,
            templateId,
            params,
            undefined,
            image ? [image] : undefined,
          );
          await sleep(300);

          if (isError === "ERROR") {
            throw new Error("ERROR encountered");
          }
        }
      }
    }
  }
};

export const sendWAToUserList = async (
  users: UserInterface[],
  templateId: string,
  test: boolean,
  startIndx: number,
  image: string,
) => {
  const sortedUsers = users.sort((a, b) => {
    var textA = a.name ? a.name.toUpperCase() : "z";
    var textB = b.name ? b.name.toUpperCase() : "z";

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  console.log("TOTAL to send", sortedUsers.length);

  let i: number = 0;
  const sentMap: { [phone: string]: boolean } = {};

  for (const user of sortedUsers) {
    i++;
    // console.log(i, i > startIndx);

    if (i > startIndx) {
      if (user.phone && user.name) {
        if (blockedUsers.includes(user.phone)) {
          console.log("Skipping from Blocked LIST", user.name, i);
        } else if (user.unsubscribe) {
          console.log("unsubscribed user", user.phone);
        } else if (sentMap[user.phone]) {
          console.log("Skipping Sent User", user.name, i);
        } else {
          console.log(
            i,
            " | ",
            user.name,
            " | ",
            user.gender,
            " | ",
            user.uid,
            " | ",
            user.phone,
            " | ",
            user.fpCredit ? user.fpCredit : 0,
          );

          sentMap[user.phone] = true;

          if (test) {
            await sendHSMV2(
              "+919538404044",
              templateId,
              [user.name ? user.name : "there"],
              // [],
              undefined,
              [
                image, // "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/Stress+Reduction+(1).png",
              ],
            );
            console.log("SENT TO SWAPNIL");
            await sendHSMV2(
              "+919811800046",

              templateId,
              // [],
              [user.name ? user.name : "there"],
              undefined,
              [
                image, // "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/Stress+Reduction+(1).png",
              ],
            );
            console.log("SENT TO RAHUL");

            throw new Error("Testing");
          } else {
            const isError = await sendHSMV2(
              user.phone,

              templateId,
              // [],
              [user.name ? user.name : "there"],
              undefined,
              [
                image, // "https://sbusermedia.s3.ap-south-1.amazonaws.com/notifications/Stress+Reduction+(1).png",
              ],
            );

            if (isError === "ERROR") {
              throw new Error("ERROR encountered");
            }
          }

          // throw new Error("Hi");

          // console.log("resp", resp);

          await sleep(1000);
          //
        }
      }
    }
  }
};
