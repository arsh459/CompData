import Button from "@components/button";
import { useCallback, useState } from "react";
import { sessionTypes, SessionV2 } from "@models/Event/Event";
import SessionCard from "./SessionCard";
import SessionAdder from "./SessionAdder";
import { createNewSessionV2, updateProgram } from "@models/Event/createUtils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";

interface Props {
  sessions?: SessionV2[];
  heading: string;
  helperText: string;
  leftButtonText: string;
  buttonText: string;
  onButtonPress: () => void;
  setProgram: any;
  eventId: string;
}

const SessionHolder: React.FC<Props> = ({
  heading,
  helperText,
  sessions,
  eventId,
  buttonText,
  leftButtonText,
  setProgram,
  onButtonPress,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(0);
  const [formState, setFormState] = useState<
    "sessionType" | "name" | "isLive" | "media"
  >("sessionType");

  const onNext = () => {
    if (formState === "sessionType") {
      setFormState("name");
    } else if (formState === "name") {
      setFormState("media");
    } else if (formState === "media") {
      setFormState("isLive");
    } else {
      onSave();
    }
  };

  const onSaveAndNext = async () => {
    if (sessions) {
      await updateProgram(eventId, sessions);
    }
    onButtonPress();
  };

  const onBack = () => {
    if (formState === "name") {
      setFormState("sessionType");
    } else if (formState === "media") {
      setFormState("name");
    } else if (formState === "isLive") {
      setFormState("media");
    } else {
    }
  };

  const closeModal = async () => {
    setIsOpen(false);
    setTimeout(() => setFormState("sessionType"), 2500);
  };

  const onSave = async () => {
    if (sessions) {
      await updateProgram(eventId, sessions);
    }

    setIsOpen(false);
    setTimeout(() => setFormState("sessionType"), 2500);
    // }
  };

  function openModal() {
    const newSession = createNewSessionV2(
      sessions && sessions.length > 0 ? sessions.length + 1 : 1
    );
    setSelectedSessionId(sessions ? sessions.length : 0);
    setProgram((prev: SessionV2[]) => {
      return [...prev, newSession];
    });
    setIsOpen(true);
  }

  const onSessionClick = (index: number) => {
    setSelectedSessionId(index);
    setIsOpen(true);
  };

  const onSessionDelete = (sessionToDeleteId: string) => {
    setProgram((prev: SessionV2[]) => {
      return prev.filter((item) => item.id !== sessionToDeleteId);
    });
  };

  const onSessionChange = useCallback(
    (
      keyToChange: "name" | "description" | "youtubeLink" | undefined,
      value: string,
      newMedia?: CloudinaryMedia,
      isLive?: boolean,
      isFree?: boolean,
      deleteMedia?: boolean,
      newSessionType?: sessionTypes
    ) => {
      setProgram((prev: SessionV2[]) => {
        const newSession: SessionV2 = {
          ...prev[selectedSessionId],
          ...(keyToChange ? { [keyToChange]: value } : {}),
          ...(newMedia ? { media: newMedia } : {}),
          ...(typeof isLive === "boolean" ? { live: isLive } : {}),
          ...(typeof isFree === "boolean" ? { free: isFree } : {}),
          ...(newSessionType ? { sessionType: newSessionType } : {}),
        };

        if (deleteMedia) {
          delete newSession.media;
        }

        return [
          ...prev.slice(0, selectedSessionId),
          newSession,
          ...prev.slice(selectedSessionId + 1, prev.length),
        ];
      });
    },
    [selectedSessionId, setProgram]
  );

  return (
    <div className="">
      <SessionAdder
        isOpen={isOpen}
        closeModal={closeModal}
        // onSave={onSave}
        selectedSession={sessions?.[selectedSessionId]}
        onSessionChange={onSessionChange}
        formState={formState}
        onNext={onNext}
        onBack={onBack}
      />

      <div>
        <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        <p className="text-sm text-gray-600 font-light pt-1 hidden sm:block">
          {helperText}
        </p>
      </div>
      <div className="h-48 bg-gray-300 rounded-md shadow-inner overflow-x-auto flex flex-wrap">
        {sessions?.map((item, index) => {
          return (
            <div key={item.id} className="p-2">
              <SessionCard
                session={item}
                onClick={() => onSessionClick(index)}
                onClose={() => onSessionDelete(item.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="flex pt-4">
        <div className="pr-2">
          <Button
            appearance="control"
            onClick={openModal}
            // onClick={() => onChange((prev: ListItem[]) => [...prev])}
          >
            <div className="pl-2 pr-2">
              <p className="capitalize text-gray-700 font-medium">
                {leftButtonText}
              </p>
            </div>
          </Button>
        </div>
        <Button
          appearance="contained"
          onClick={onSaveAndNext}
          //   onClick={() => onButtonPress("schedule", "", dateTimeList)}
        >
          <div className="pl-2 pr-2">
            <p className="capitalize">{buttonText}</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SessionHolder;
