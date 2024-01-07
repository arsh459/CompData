import { useEffect, useState } from "react";
import {
  ContentInterface,
  gptPrompts,
  gptTaskType,
  numericPromptKeys,
  ContentType,
  tool_choice,
  response_format,
} from "../Config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { uuidv4 } from "@firebase/util";
import { gptModels, roleTypes } from "@models/ChatBot/interface";
import { sbFunctions } from "../Tools";

export const useGPTPrompt = (id: string) => {
  const [gptPrompt, setGPTPrompt] = useState<gptPrompts>();
  useEffect(() => {
    const getAllPrompts = async () => {
      const remodoc = await getDoc(doc(db, "gptPrompts", id));

      if (remodoc.data()) {
        setGPTPrompt(remodoc.data() as gptPrompts);
      } else {
        setGPTPrompt({
          id: uuidv4(),
          temperature: 1,
          top_p: 1,
          max_tokens: 1000,
          presence_penalty: 0,
          frequency_penalty: 0,
          model: "gpt-3.5-turbo",
          prompt: [],
          type: "customNutritionTask",
          isImageArray: [],
        });
      }
    };

    getAllPrompts();
  }, [id]);
  const updateNumericFields = (newVal: string, key: numericPromptKeys) => {
    if (typeof parseInt(newVal) === "number")
      setGPTPrompt((prev) => {
        if (prev) {
          return {
            ...prev,
            [key]: parseFloat(newVal),
          };
        }
      });
  };
  const changeModel = (model: gptModels) => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          model,
        };
      }
    });
  };

  const updatedTool_Choice = (tool_choice: tool_choice) => {
    if (!tool_choice) {
      setGPTPrompt((prev) => {
        if (prev) {
          const { tool_choice, ...rest } = prev;
          return {
            ...rest,
          };
        }
      });
    } else {
      setGPTPrompt((prev) => {
        if (prev) {
          return {
            ...prev,
            tool_choice: tool_choice,
          };
        }
      });
    }
  };
  const updateResponseFormat = (response_format: response_format) => {
    // console.log(response_format);
    if (!response_format) {
      setGPTPrompt((prev) => {
        if (prev) {
          const { response_format, ...rest } = prev;
          return {
            ...rest,
          };
        }
      });
    } else {
      setGPTPrompt((prev) => {
        if (prev) {
          return {
            ...prev,
            response_format: response_format,
          };
        }
      });
    }
  };
  const addFunction = (functionAdd: sbFunctions) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let toolArray: sbFunctions[] = prev.tools ? prev.tools : [];
        if (toolArray.includes(functionAdd)) {
          return prev;
        }
        return {
          ...prev,
          tools: [...(prev.tools ? prev.tools : []), functionAdd],
        };
      }
    });
  };

  const removeFunction = (index: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let updatedToolsArray = [
          ...(prev.tools ? prev.tools.slice(0, index) : []),
          ...(prev.tools ? prev.tools.slice(index + 1, prev.tools.length) : []),
        ];
        if (!updatedToolsArray || updatedToolsArray.length === 0) {
          let { tools, ...rest } = prev;
          return { ...rest };
        }
        return {
          ...prev,
          tools: updatedToolsArray,
        };
      }
    });
  };

  const changeGPTTask = (type: gptTaskType) => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          type,
        };
      }
    });
  };

  const addPrompt = () => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          prompt: [
            ...prev.prompt,
            {
              role: "assistant",
              content: "",
            },
          ],
          isImageArray: prev.isImageArray
            ? [...prev.isImageArray, false]
            : [...Array(prev.prompt.length).fill(false), false],
        };
      }
    });
  };
  const removePrompt = (index: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            ...prev.prompt.slice(index + 1),
          ],
          isImageArray: prev.isImageArray
            ? [
                ...prev.isImageArray.slice(0, index),
                ...prev.prompt.slice(index + 1),
              ]
            : [...Array(prev.prompt.length - 1).fill(false)],
        };
      }
    });
  };
  const updatePromptText = (text: string, index: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              ...prev.prompt[index],
              content: text,
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const updatePromptType = (type: roleTypes, index: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              ...prev.prompt[index],
              role: type,
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const onChangeImageCheck = (imageCheck: boolean, changeIndex: number) => {
    const messageArr = gptPrompt?.prompt;
    const isImageArray = gptPrompt?.isImageArray;
    let imageArr: boolean[] = [];
    if (messageArr && !isImageArray) {
      messageArr.forEach((item, index) => {
        if (index === changeIndex) {
          imageArr[changeIndex] = imageCheck;
        } else {
          imageArr[index] = typeof item.content !== "string";
        }
      });
      setGPTPrompt((prev) => {
        if (prev) {
          return {
            ...prev,
            prompt: [
              ...prev.prompt.slice(0, changeIndex),
              imageCheck
                ? {
                    role: prev.prompt[changeIndex].role
                      ? prev.prompt[changeIndex].role
                      : "system",
                    content: [{ type: "text", text: "" }],
                  }
                : { role: "system", content: "" },
              ...prev.prompt.slice(changeIndex + 1),
            ],
            isImageArray: imageArr,
          };
        }
      });
    } else if (isImageArray) {
      setGPTPrompt((prev) => {
        if (prev) {
          return {
            ...prev,
            prompt: [
              ...prev.prompt.slice(0, changeIndex),
              imageCheck
                ? { role: "system", content: [{ type: "text", text: "" }] }
                : { role: "system", content: "" },
              ...prev.prompt.slice(changeIndex + 1),
            ],
            isImageArray: [
              ...isImageArray.slice(0, changeIndex),
              imageCheck,
              ...isImageArray.slice(changeIndex + 1),
            ],
          };
        }
      });
    }
  };
  const onChangeContentType = (
    newType: ContentType,
    index: number,
    contentIndex: number
  ) => {
    console.log(newType);
    setGPTPrompt((prev) => {
      if (prev) {
        let content = prev?.prompt[index].content as ContentInterface[];
        let obj: ContentInterface;
        if (newType === "text") {
          obj = {
            type: "text",
            text: "",
          };
        } else {
          obj = {
            type: "image_url",
            image_url: {
              url: "",
            },
          };
        }
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              role: prev.prompt[index].role,
              content: [
                ...content.slice(0, contentIndex),
                obj,
                ...content.slice(contentIndex + 1),
              ],
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const onChangeContentText = (
    newText: string,
    index: number,
    contentIndex: number
  ) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let content = prev?.prompt[index].content as ContentInterface[];
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              role: prev.prompt[index].role,
              content: [
                ...content.slice(0, contentIndex),
                { type: "text", text: newText },
                ...content.slice(contentIndex + 1),
              ],
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const onChangeContentImageUrl = (
    newText: string,
    index: number,
    contentIndex: number
  ) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let content = prev?.prompt[index].content as ContentInterface[];
        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              role: prev.prompt[index].role,
              content: [
                ...content.slice(0, contentIndex),
                {
                  type: "image_url",
                  image_url: {
                    url: newText,
                  },
                },
                ...content.slice(contentIndex + 1),
              ],
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const isContentArray = (content: any): content is ContentInterface[] => {
    return Array.isArray(content);
  };
  const onAddingThread = (index: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let changeContent = prev.prompt[index].content as ContentInterface[];

        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              role: prev.prompt[index].role
                ? prev.prompt[index].role
                : "system",
              content: [...changeContent, { type: "text", text: "" }],
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };
  const onRemovingThread = (index: number, contentIndex: number) => {
    setGPTPrompt((prev) => {
      if (prev) {
        let changeContent = prev.prompt[index].content as ContentInterface[];

        return {
          ...prev,
          prompt: [
            ...prev.prompt.slice(0, index),
            {
              role: prev.prompt[index].role,
              content: [
                ...changeContent.slice(0, contentIndex),
                ...changeContent.slice(contentIndex + 1),
              ],
            },
            ...prev.prompt.slice(index + 1),
          ],
        };
      }
    });
  };

  return {
    gptPrompt,
    updateNumericFields,
    changeModel,
    changeGPTTask,
    addPrompt,
    removePrompt,
    updatePromptText,
    updatePromptType,
    onChangeImageCheck,
    onChangeContentType,
    onChangeContentText,
    onChangeContentImageUrl,
    onAddingThread,
    isContentArray,
    onRemovingThread,
    addFunction,
    removeFunction,
    updatedTool_Choice,
    updateResponseFormat,
  };
};
