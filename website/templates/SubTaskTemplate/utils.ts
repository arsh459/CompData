// import { gptPrompts, gptTaskType } from "@models/AppConfiguration/Config";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@config/firebase";
import axios from "axios";
import { AISuggest } from "@models/Tasks/Task";

interface ErrorInterface {
  status: false;
  error: string;
}
interface MessageInterface {
  status: true;
  message: { data: AISuggest };
}

export const generateSubTask = async (
  name: string
): Promise<ErrorInterface | MessageInterface> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/subTaskAIGeneration`,
      {
        name: name,
      }
    );
    return response.data as ErrorInterface | MessageInterface;
  } catch (error) {
    return { status: false, error: "Some Problem in firebase Server" };
  }
};
