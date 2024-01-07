import Loading from "@components/loading/Loading";
import { useRouter } from "next/router";
import BackIcon from "public/icons/BackIcon";
import { useEffect, useState } from "react";
import { useGptResponse } from "./hooks/useGptResponse";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { format } from "date-fns";
import {
  ContentInterface,
  gptPrompts,
  gptTaskType,
} from "@models/AppConfiguration/Config";
import { db } from "@config/firebase";
import Link from "next/link";
import { query, collection, where, getDocs } from "firebase/firestore";

interface Props {
  responseId: string;
}
const AddResponseTemplate: React.FC<Props> = ({ responseId }) => {
  const router = useRouter();
  const { gptResponse } = useGptResponse(responseId);
  const [promptId, setPromptId] = useState<string>();
  const onSave = async () => {
    router.back();
  };
  function isContentParsable(content: string) {
    try {
      const isParsable = JSON.parse(content);
      if (isParsable) {
        return true;
      }
    } catch (e) {
      return false;
    }
  }
  function printContent(content: string) {
    try {
      const isParsable = JSON.parse(content);
      if (isParsable) {
        console.log("content", isParsable);
      }
    } catch (e) {
      console.log("error", e);
      return false;
    }
  }

  useEffect(() => {
    async function fetchPrompt(type: gptTaskType) {
      try {
        const remodoc = await getDocs(
          query(collection(db, "gptPrompts"), where("type", "==", type))
        );
        if (remodoc && remodoc.docs && remodoc.docs.length > 0) {
          let data = remodoc.docs[0].data() as gptPrompts;
          setPromptId(data.id);
        } else {
          setPromptId(undefined);
        }
      } catch (e) {
        setPromptId(undefined);
        console.log("error", "Prompt not Available");
      }
    }
    if (gptResponse?.type) {
      fetchPrompt(gptResponse.type as gptTaskType);
    }
  }, [gptResponse]);

  let errorMessage = undefined;
  let errorData = "";
  try {
    if (gptResponse && gptResponse.errorMessage) {
      errorMessage = JSON.parse(gptResponse.errorMessage);
      if (errorMessage && errorMessage.config && errorMessage.config.data)
        errorData = JSON.stringify(JSON.parse(errorMessage.config.data));
    }
  } catch (err) {
    console.log("error in parsing error message", err);
  }

  return (
    <div className="p-4 pt-8">
      <div className="pb-3">
        <p className="text-gray-700 text-4xl font-semibold flex items-center">
          <span onClick={() => router.back()}>
            <BackIcon style={{ height: "30", width: "30", fill: "gray" }} />{" "}
          </span>
          &nbsp; Response Details
        </p>
      </div>
      <hr />
      <p className="text-base font-medium py-4 pb-1">
        ID: {gptResponse ? gptResponse.id : responseId}
      </p>
      {gptResponse && gptResponse.errorMessage && (
        <>
          <p className="text-base font-medium py-4 pb-1 text-red-600">
            Error Code:{" "}
            {errorMessage && errorMessage.code ? errorMessage.code : ""}
          </p>
          <p className="text-base font-medium py-4 pb-8 text-red-600">
            Error Message:{" "}
            {errorMessage && errorMessage.message ? errorMessage.message : ""}
          </p>
          <div className="">
            <TextField
              style={{ width: "100%" }}
              placeholder={"Error Data"}
              label={"Error Data Directly Paste in Postman for testing"}
              variant="outlined"
              value={errorData}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
            />
          </div>
        </>
      )}

      {!gptResponse ? (
        <div className="pt-4">
          <div className="flex justify-center items-center">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        </div>
      ) : (
        <>
          <div className="pt-4">
            <div className="border border-black p-4 rounded-lg">
              <div className="">
                {promptId ? (
                  <Link href={`/admin/prompts/${promptId}`} target={"_blank"}>
                    <div className="">
                      <p>
                        Prompt Used:{" "}
                        <span className="text-blue-400">
                          {gptResponse.type}
                        </span>
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div className="">
                    <p>
                      Prompt Used:{" "}
                      <span className="text-red-400">{gptResponse.type}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Gpt Model"}
                  label={"Gpt Model"}
                  variant="outlined"
                  value={gptResponse.model}
                  className="uppercase"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"uid"}
                  label={"User id"}
                  variant="outlined"
                  value={gptResponse.uid}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="pt-8">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"Created on"}
                  label={"Created on"}
                  variant="outlined"
                  value={`${format(
                    gptResponse.createdOn,
                    "hh:mm a, yyyy-MM-dd "
                  )}`}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
            </div>
            <div className="border border-black p-4 rounded-lg mt-8">
              <p className="text-lg font-popSB">Message Sent</p>
              <div className="pt-8">
                {typeof gptResponse.initMessage.content === "string" && (
                  <>
                    <TextField
                      style={{ width: "100%" }}
                      placeholder={"Initial Message sent"}
                      label={"Initial Message sent"}
                      variant="outlined"
                      value={gptResponse.initMessage.role}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      multiline
                      disabled
                    />
                    <TextField
                      style={{ width: "100%" }}
                      placeholder={"Initial Message sent"}
                      label={"Initial Message sent"}
                      variant="outlined"
                      value={gptResponse.initMessage.content}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      multiline
                      disabled
                    />
                  </>
                )}
                {typeof gptResponse.initMessage.content === "object" &&
                  Array.isArray(gptResponse.initMessage.content) && (
                    <>
                      {(
                        gptResponse.initMessage.content as ContentInterface[]
                      ).map((contentItem) => {
                        return (
                          <div className="">
                            <div className="pb-8">
                              <TextField
                                style={{ width: "100%" }}
                                placeholder={
                                  contentItem.type === "text" ? "Text" : "Image"
                                }
                                label={
                                  contentItem.type === "text" ? "Text" : "Image"
                                }
                                variant="outlined"
                                value={
                                  contentItem.type === "text"
                                    ? contentItem.text
                                    : contentItem.image_url.url
                                }
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                disabled
                              />
                            </div>
                            <div className="w-full overflow-hidden">
                              {contentItem.type === "image_url" &&
                                contentItem.image_url.url && (
                                  <img src={contentItem.image_url.url} />
                                )}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
              </div>
            </div>

            {gptResponse.errorMessage ? null : (
              <div className="border border-black p-4 rounded-lg mt-8">
                <p className="text-lg font-popSB pb-4">Message Received</p>
                <div className="pb-8">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"GPT Response Role"}
                    label={"GPT Response Role"}
                    variant="outlined"
                    value={gptResponse.choices[0].message.role}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </div>
                <div className="pb-8">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"Is Content Parsable"}
                    label={"Is Content Parsable"}
                    variant="outlined"
                    value={
                      isContentParsable(gptResponse.choices[0].message.content)
                        ? "Parsable"
                        : "Not Parsable"
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </div>
                <div className="pb-4">
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={"GPT Response content"}
                    label={"GPT Response content"}
                    variant="outlined"
                    value={gptResponse.choices[0].message.content}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    disabled
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="w-fit px-6 py-3 border border-black rounded-lg bg-green-500 cursor-pointer"
                    onClick={() => {
                      printContent(gptResponse.choices[0].message.content);
                    }}
                  >
                    Console Response
                  </button>
                </div>
              </div>
            )}

            <div className="border border-black p-4 rounded-lg mt-8">
              <p className="text-lg font-popSB pb-4">Parameter Details</p>
              <div className="pb-4">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"frequency_penalty"}
                  label={"frequency_penalty"}
                  variant="outlined"
                  value={gptResponse.details.frequency_penalty}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="pb-4">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"max_tokens"}
                  label={"max_tokens"}
                  variant="outlined"
                  value={gptResponse.details.max_tokens}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="pb-4">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"presence_penalty"}
                  label={"presence_penalty"}
                  variant="outlined"
                  value={gptResponse.details.presence_penalty}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="pb-4">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"temperature"}
                  label={"temperature"}
                  variant="outlined"
                  value={gptResponse.details.temperature}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
              <div className="">
                <TextField
                  style={{ width: "100%" }}
                  placeholder={"top_p"}
                  label={"top_p"}
                  variant="outlined"
                  value={gptResponse.details.top_p}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="pb-24 mx-auto pt-4"></div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavComV2 cta={"Go Back"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddResponseTemplate;
