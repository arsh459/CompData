import { questionResponse } from "@models/User/questionResponseInterface ";
import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";

export const questionAPICallRequest = async (uid: string) => {
  const response = await axios({
    url: `${BACKEND_URL}/getPeriodQuestion`,
    method: "POST",
    params: {
      uid,
    },
    data: {
      uid,
    },
  });

  const { questions } = response.data as { questions: questionResponse[] };

  for (const q of questions) {
    console.log("q", q.question);
    console.log("viewStyle", q.viewStyle);
    console.log(
      "buttons",
      q.buttons.map((i) => `${i.text} ${i.action} ${i.nextId}`)
    );
  }

  return questions;
};
