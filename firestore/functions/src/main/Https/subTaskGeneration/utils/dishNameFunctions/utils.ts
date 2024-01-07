// import { console } from "fp-ts";
// import { undefined } from "io-ts";
// import { undefined } from "io-ts";
import { AISuggest } from "../../../../../models/Task/Task";
import {
  DishNameModel,
  dishNameValidation,
} from "../../../../../models/Validators/SubTaskAIGeneration/dishNameValidator";
import {
  recipeValidatorSchema,
  SubTaskModelAI,
} from "../../../../../models/Validators/SubTaskAIGeneration/validator";
import { fetchGptResponse } from "../fetchGptResponse";
import { fetchPrompt } from "../prompts";

export const validateDishName = async (name: string) => {
  try {
    const prompt = await fetchPrompt("dishNameValidation");

    if (!prompt) {
      return undefined;
    }
    console.log("PROMPT FETCHED");

    const response = await fetchGptResponse(
      [...prompt.prompt, { role: "user", content: name }],
      prompt.model,
      prompt.temperature,
      prompt.top_p,
      prompt.max_tokens,
      prompt.presence_penalty,
      prompt.frequency_penalty,
      "dishNameValidation",
      "",
    );
    // console.log(response);

    if (!response) {
      console.log("NO RESPONSE");
      return undefined;
    }

    if (response && response.choices.length === 0) {
      console.log("ZERO CHOICES");
      return undefined;
    }

    // parse fixes
    const parsedContent = JSON.parse(
      response.choices[0].message.content
        ? response.choices[0].message.content
        : "",
    ) as DishNameModel;

    if (!parsedContent) {
      return undefined;
    }

    // console.log(parsedContent);
    await dishNameValidation.validate(parsedContent);

    if (parsedContent.validity === "invalid") {
      console.log("DISH NAME INVALID");
      return undefined;
    }
    return parsedContent;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const generateSubTaskGpt = async (name: string) => {
  try {
    const prompt = await fetchPrompt("subTaskGeneration");

    if (!prompt) {
      return undefined;
    }

    console.log("starting Sub Task Generation for", name);
    const response = await fetchGptResponse(
      [...prompt.prompt, { role: "user", content: name }],
      prompt.model,
      prompt.temperature,
      prompt.top_p,
      prompt.max_tokens,
      prompt.presence_penalty,
      prompt.frequency_penalty,
      "subTaskGeneration",
      "",
    );

    if (!response) {
      return undefined;
    }

    if (response.choices.length === 0) {
      console.log("NO CHOICES SENT");
      return undefined;
    }

    const parsedContent = parseSubTaskResponse(
      response.choices[0].message.content
        ? response.choices[0].message.content
        : "",
    );

    if (!parsedContent) {
      console.log("NO PARSED CONTENT");
      return undefined;
    }

    try {
      await recipeValidatorSchema.validate(parsedContent, {
        abortEarly: false,
      });
    } catch (error) {
      console.log("ERROR", error);
      console.log("YUP validation failed");
      return undefined;
    }

    return parsedContent;
  } catch (error) {
    return undefined;
  }
};

const parseSubTaskResponse = (content: string) => {
  try {
    const parsedContent = JSON.parse(content) as SubTaskModelAI;

    return parsedContent;
  } catch (error) {
    console.log("PARSING ERROR");
    return undefined;
  }
};

export const subTaskTransformer = (
  generatedSubTask: SubTaskModelAI,
  formattedName: string,
) => {
  let obj: AISuggest;

  obj = {
    assumption: generatedSubTask.step_1_Results,
    gptServingType: generatedSubTask["standard of dish"].unit,
    gptServingValue: generatedSubTask["standard of dish"].standard_quantity,
    gramEquivalent: generatedSubTask["standard of dish"].gram_equivalent,
    gptSubTaskName: formattedName,
    ingridientDetails: generatedSubTask.Ingredient_Details,
    cookingInstructions: generatedSubTask.Recipe_Details,
    cooking_time: generatedSubTask.cooking_time,
    ingrdientQuantities: generatedSubTask.Ingredient_Quantities_For_Recipe,
  };

  console.log("FINAL RESPONSE READY", formattedName);
  if (!obj) {
    return undefined;
  }

  return obj;
};
