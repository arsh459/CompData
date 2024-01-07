import { makeCustomRecipeCall } from "@hooks/chatbot/insights/api";
import { Task } from "@models/Tasks/Task";
import {
  createNewCustomizedRecipe,
  // getImageFromGpt,
} from "@models/Tasks/createUtils";
import { cookingTime } from "@providers/customRecipe/useCustomRecipe";

function getGPTContent(selectedIngredientsArray: string[], time: cookingTime) {
  return `
      Available ingredients:${selectedIngredientsArray.join(",")}
      Available time: ${time}`;
}

// async function getImageResponse(query: string, apiKey: string) {
//   let image = await getImageFromGpt(query, apiKey);
//   return image;
// }

async function getGPTResponse(
  task: Task,
  apiKey: string,
  selectedIngredientsArray: string[],
  time: cookingTime,
  user: string
) {
  if (apiKey) {
    let response = await makeCustomRecipeCall(
      [
        {
          role: "user",
          content: getGPTContent(selectedIngredientsArray, time),
        },
      ],
      "gpt-3.5-turbo",
      apiKey
    );

    if (response?.choices[0]) {
      let data = response.choices[0].message.content;
      // let parsedData = JSON.parse(data);
      // let query = parsedData.recipeNameArray[0];
      // let reelThumbnail = await getImageRespons(query, apiKey);
      // if (reelThumbnail) {

      // let reelThumbnail = await getImageResponse(query, apiKey);
      const result = await createNewCustomizedRecipe(
        task.id,
        JSON.parse(data),
        user,
        time
        // reelThumbnail
      );
      if (result) {
        return { result: result, message: "Success" };
      }
      // }
    }
  }

  return { message: "Please try Again" };
}

export { getGPTResponse };
