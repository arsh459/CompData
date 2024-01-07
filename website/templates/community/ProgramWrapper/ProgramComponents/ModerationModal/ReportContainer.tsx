import { useState } from "react";
import clsx from "clsx";
import { raiseTicket } from "@models/Activities/reportUtils";
import Loading from "@components/loading/Loading";

interface Props {
  actId: string;
  authorId: string;
  ticketOwnerId: string;
  onGoToTicket: () => void;
  authorName: string;
  authorPhone: string;
}

const ReportContainer: React.FC<Props> = ({
  authorId,
  actId,
  ticketOwnerId,
  onGoToTicket,
  authorName,
  authorPhone,
}) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    if (
      inputVal.length < 100 ||
      e.nativeEvent.inputType === "deleteContentForward" ||
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setInputVal(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await raiseTicket(
        authorId,
        authorName,
        authorPhone,
        actId,
        ticketOwnerId,
        inputVal
      );

      window.open(
        `https://api.whatsapp.com/send?phone=919958730020&text=${encodeURI(
          inputVal
        )}`,
        "_blank"
      );

      onGoToTicket();

      setInputVal("");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#D9D9D9] rounded-lg my-6 relative">
        <textarea
          className="w-full h-40 px-4 py-2 iphoneX:text-xl text-[#203C51] bg-transparent resize-none focus:outline-none placeholder:text-[#203C51]/30"
          placeholder="Type the problem with the post"
          value={inputVal}
          onChange={(e) => handleChange(e)}
        />
        <p className="text-sm iphoneX:text-base text-[#203C51]/30 bg-[#D9D9D9] rounded-lg px-4 py-2 absolute right-0 bottom-0 z-10">
          {inputVal.length}/100
        </p>
      </div>
      {loading ? (
        <Loading fill="#ff735c" width={40} height={40} />
      ) : (
        <button
          className={clsx(
            "text-lg iphoneX:text-2xl border border-[#FD6F6F] px-10 py-2 rounded-xl",
            inputVal.length > 0
              ? "bg-[#FD6F6F] text-white"
              : "bg-[#D9D9D9] text-[#FD6F6F]"
          )}
          disabled={inputVal.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </>
  );
};

export default ReportContainer;
