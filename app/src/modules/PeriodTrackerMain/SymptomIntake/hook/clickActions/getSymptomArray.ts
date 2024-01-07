import { periodPrompts } from "@models/User/User";
import { questionResponse } from "@models/User/questionResponseInterface ";
import { symptomId } from "@models/User/symptoms";

export const getCurrentQuestion = (
  questions: questionResponse[],
  id: periodPrompts
) => {
  const indexQuestion = questions.filter((item) => item.id === id);
  if (indexQuestion.length) {
    return indexQuestion[0];
  }

  return undefined;
};

export const getQuestionSymptoms = (question: questionResponse) => {
  const symps: symptomId[] = [];
  if (question.options) {
    for (const option of question.options) {
      if (option.symptomId) {
        symps.push(option.symptomId);
      }
    }
  }

  return symps;
};
