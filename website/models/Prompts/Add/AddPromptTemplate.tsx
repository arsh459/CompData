import Loading from "@components/loading/Loading";
import NumericFields from "@components/Prompts/add/NumericFields";
import {
  gptModelsArray,
  gptTaskType,
  gptTaskTypeArray,
  GPTVisionMessage,
  response_format,
  response_format_Array,
  tool_choice,
  tool_choice_Array,
} from "@models/AppConfiguration/Config";
import { useGPTPrompt } from "@models/AppConfiguration/hooks/useGPTPrompt";
import { GPTMessage, gptModels } from "@models/ChatBot/interface";
import { MenuItem, TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useState } from "react";
import { saveNewPrompt, validateGptPrompt } from "@components/Prompts/utils";
import PromptItem from "./components/PromptItem";
import { functionList } from "@models/AppConfiguration/Tools";

interface Props {
  promptId: string;
}

const AddPromptTemplate: React.FC<Props> = ({ promptId }) => {
  const router = useRouter();
  const {
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
  } = useGPTPrompt(promptId);

  const [loading, setLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<string | null>(null);

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);
      try {
        if (gptPrompt && validateGptPrompt(gptPrompt)) {
          setWarning(null);
          await saveNewPrompt(gptPrompt);
          setLoading(false);
          setWarning("saved Data");
          router.back();
        } else {
          setWarning("Problem in prompts");
          setLoading(false);
        }
      } catch (error) {
        setWarning("Some issue in saving");
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Add Prompt
        </p>
      </div>
      <hr />

      <p className="text-red-600">{warning ? warning : null}</p>
      <p className="text-base font-medium py-4 pb-1">
        ID: {gptPrompt ? gptPrompt.id : promptId}
      </p>

      {!gptPrompt || loading ? (
        <div className="pt-4">
          <div className="flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : (
        <>
          <div className="pt-4 ">
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Type of gpt task"}
                label={"Type of gpt task"}
                variant="outlined"
                onChange={(e) => changeGPTTask(e.target.value as gptTaskType)}
                value={gptPrompt.type}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {gptTaskTypeArray.map((each) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>

              <NumericFields
                gptPrompt={gptPrompt}
                updateNumericFields={updateNumericFields}
              />

              <div className="pt-8">
                <TextField
                  select
                  style={{ width: "100%" }}
                  placeholder={"Gpt Model"}
                  label={"Gpt Model"}
                  variant="outlined"
                  onChange={(e) => changeModel(e.target.value as gptModels)}
                  value={gptPrompt.model}
                  className="uppercase"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {gptModelsArray.map((each) => (
                    <MenuItem key={each} value={each} className="uppercase">
                      {each}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>

          <div className="">
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Tool Choice"}
                label={"Tool Choice"}
                variant="outlined"
                onChange={(e) => {
                  updatedTool_Choice(e.target.value as tool_choice);
                }}
                value={gptPrompt.tool_choice}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem key={""}>Remove</MenuItem>
                {tool_choice_Array.map((each: tool_choice) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Required Output Type"}
                label={"Required Output Type"}
                variant="outlined"
                onChange={(e) => {
                  updateResponseFormat(e.target.value as response_format);
                }}
                value={gptPrompt.response_format}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem key={""}>Remove</MenuItem>
                {response_format_Array.map((each: response_format) => (
                  <MenuItem key={each} value={each}>
                    {each}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="pt-8">
              <TextField
                select
                style={{ width: "100%" }}
                placeholder={"Add Tool"}
                label={"Type of Tool"}
                variant="outlined"
                value={"Add Tool"}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {functionList
                  .filter((item) => {
                    return !(gptPrompt.tools && gptPrompt.tools.includes(item));
                  })
                  .map((each, index) => (
                    <MenuItem key={each} value={each}>
                      <div className="w-full flex justify-between items-center">
                        <div>{each}</div>
                        <div
                          className="px-4 py-2 bg-green-500 rounded-xl cursor-pointer"
                          onClick={() => {
                            addFunction(each);
                          }}
                        >
                          Add Tool
                        </div>
                      </div>
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            {gptPrompt.tools && gptPrompt.tools.length > 0 && (
              <div className="mt-8 border border-gray-400 rounded-xl pt-3">
                {gptPrompt.tools.map((item, index) => {
                  return (
                    <div
                      key={`${item}-${index}`}
                      className="w-full px-4 flex justify-between pb-3"
                    >
                      <div className="text-xl font-medium py-2">{item}</div>
                      <div
                        className="px-4 py-2 bg-red-500 rounded-xl text-white cursor-pointer flex items-center justify-center"
                        onClick={() => {
                          removeFunction(index);
                        }}
                      >
                        Remove Tool
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pb-24 mx-auto pt-4">
            {gptPrompt.prompt.map(
              (message: GPTMessage | GPTVisionMessage, index: number) => {
                return (
                  <PromptItem
                    key={`prompt-${index}-${message.role}`}
                    message={message}
                    index={index}
                    removePrompt={removePrompt}
                    updatePromptType={updatePromptType}
                    gptPrompt={gptPrompt}
                    onChangeImageCheck={onChangeImageCheck}
                    updatePromptText={updatePromptText}
                    isContentArray={isContentArray}
                    onRemovingThread={onRemovingThread}
                    onChangeContentType={onChangeContentType}
                    onChangeContentText={onChangeContentText}
                    onChangeContentImageUrl={onChangeContentImageUrl}
                    onAddingThread={onAddingThread}
                  />
                );
              }
            )}
            <div
              className="px-4 py-2 mt-8 mx-auto rounded-lg w-[40%]"
              style={{ backgroundColor: "#80ff80" }}
              onClick={addPrompt}
            >
              <p className="text-black   text-center">Add New Prompt +</p>
            </div>
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Save Activity"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddPromptTemplate;
