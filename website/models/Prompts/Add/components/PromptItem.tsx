import {
  ContentInterface,
  gptPrompts,
  GPTVisionMessage,
  ContentType,
  ContentTypeArr,
} from "@models/AppConfiguration/Config";
import {
  GPTMessage,
  roleTypes,
  roleTypesArray,
} from "@models/ChatBot/interface";
import { MenuItem, TextField, Checkbox } from "@mui/material";

interface Props {
  message: GPTMessage | GPTVisionMessage;
  index: number;
  removePrompt: (index: number) => void;
  updatePromptType: (type: roleTypes, index: number) => void;
  gptPrompt: gptPrompts;
  onChangeImageCheck: (imageCheck: boolean, changeIndex: number) => void;
  updatePromptText: (text: string, index: number) => void;
  isContentArray: (content: any) => content is ContentInterface[];
  onRemovingThread: (index: number, contentIndex: number) => void;
  onChangeContentType: (
    newType: ContentType,
    index: number,
    contentIndex: number
  ) => void;
  onChangeContentText: (
    newText: string,
    index: number,
    contentIndex: number
  ) => void;
  onChangeContentImageUrl: (
    newText: string,
    index: number,
    contentIndex: number
  ) => void;
  onAddingThread: (index: number) => void;
}
const PromptItem: React.FC<Props> = ({
  message,
  index,
  removePrompt,
  updatePromptType,
  gptPrompt,
  onChangeImageCheck,
  updatePromptText,
  isContentArray,
  onRemovingThread,
  onChangeContentType,
  onChangeContentText,
  onChangeContentImageUrl,
  onAddingThread,
}) => {
  return (
    <div
      key={`prompt-${message.role}-${index}`}
      className="border border-black p-3 pb-8 mt-8"
    >
      <div className="flex justify-between items-center px-10">
        <p className="text-[#000] font-bold">{index + 1}.</p>
        <div
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#ff4d4d" }}
        >
          <p
            className="text-white"
            onClick={() => {
              removePrompt(index);
            }}
          >
            Remove
          </p>
        </div>
      </div>
      <div className="pt-8">
        <TextField
          select
          style={{ width: "100%" }}
          placeholder={"Role of message"}
          label={"Role of message"}
          variant="outlined"
          onChange={(e) => {
            {
              updatePromptType(e.target.value as roleTypes, index);
            }
          }}
          value={message.role}
          className="uppercase"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {roleTypesArray.map((roleType, index) => {
            return (
              <MenuItem key={roleType} value={roleType} className="uppercase">
                {roleType}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
      <div className="pt-8 flex items-center">
        <Checkbox
          color="primary"
          checked={
            gptPrompt && gptPrompt.isImageArray
              ? gptPrompt.isImageArray[index]
              : false
          }
          onChange={(e) => {
            onChangeImageCheck(
              gptPrompt && gptPrompt.isImageArray
                ? !gptPrompt.isImageArray[index]
                : !false,
              index
            );
          }}
        />
        <p className="text-gray-700">Is this Prompt an image</p>
      </div>
      {gptPrompt.isImageArray && gptPrompt.isImageArray[index] ? (
        <div>
          {isContentArray(gptPrompt.prompt[index].content) &&
            (gptPrompt.prompt[index].content as ContentInterface[]).map(
              (item: ContentInterface, ind: number) => {
                return (
                  <div className="p-4 border border-black rounded-xl mb-4 bg-[#999]">
                    <div
                      className="text-right text-red-500 font-bold text-lg cursor-pointer"
                      onClick={() => {
                        onRemovingThread(index, ind);
                      }}
                    >
                      <p>Remove</p>
                    </div>
                    <div className="pt-8">
                      <TextField
                        select
                        style={{ width: "100%" }}
                        placeholder={"Type of content"}
                        label={"Type of content"}
                        variant="outlined"
                        onChange={(e) => {
                          onChangeContentType(
                            e.target.value as ContentType,
                            index,
                            ind
                          );
                        }}
                        value={item.type}
                        // className="uppercase"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {ContentTypeArr.map((contentTypeValue) => {
                          return (
                            <MenuItem
                              key={contentTypeValue}
                              value={contentTypeValue}
                            >
                              {contentTypeValue}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </div>
                    <div className="pt-8">
                      <TextField
                        style={{ width: "100%" }}
                        placeholder={
                          item.type === "text" ? "text content" : "image_url"
                        }
                        label={
                          item.type === "text" ? "text content" : "image_url"
                        }
                        variant="outlined"
                        onChange={(e) => {
                          item.type === "text"
                            ? onChangeContentText(e.target.value, index, ind)
                            : onChangeContentImageUrl(
                                e.target.value,
                                index,
                                ind
                              );
                        }}
                        value={
                          item.type === "text" ? item.text : item.image_url.url
                        }
                        className="uppercase"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      ></TextField>
                    </div>
                    {item.type === "image_url" && (
                      <div className="pt-8 w-full aspect-1">
                        <img
                          src={item.image_url.url}
                          width={100}
                          height={100}
                        />
                      </div>
                    )}
                  </div>
                );
              }
            )}
          <div
            className="px-4 py-2 mt-8 mx-auto rounded-lg w-[40%] cursor-pointer"
            style={{ backgroundColor: "#80ff80" }}
            onClick={() => {
              onAddingThread(index);
            }}
          >
            <p className="text-black  text-center">Add New Thread+</p>
          </div>
        </div>
      ) : (
        <div className="pt-8 ">
          <TextField
            style={{ width: "100%" }}
            placeholder={"Content of message"}
            label="Content of message"
            multiline
            variant="outlined"
            minRows={4}
            onChange={(e) => updatePromptText(e.target.value, index)}
            value={message.content}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PromptItem;
