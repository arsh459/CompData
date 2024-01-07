// import MoreText from "@components/MoreText/MoreText";
import { getChallengeStartString } from "./utils";

interface Props {
  name?: string;
  // eventName?: string;
  eventDescription?: string;
  // dayNumber?: number;
  challengeStarts?: number;
  challengeLength?: number;
}

const Hello: React.FC<Props> = ({
  // signedIn,
  name,
  // eventName,
  // eventDescription,
  // dayNumber,
  challengeStarts,
  challengeLength,
}) => {
  const { stringOne, stringTwo } = getChallengeStartString(
    challengeStarts,
    challengeLength
  );

  return (
    <div>
      <div>
        <p className="text-gray-700 text-2xl font-semibold">
          Hi {`${name ? `${name},` : "there,"}`}
        </p>

        {challengeStarts ? (
          <div className="flex">
            <p className="text-gray-500 text-base">{stringOne}</p>
            <p className="text-orange-500 text-base font-semibold pl-1">
              {stringTwo}
            </p>
            {/* <p className="text-gray-700 text-base pt-0">
          {dayToday
            ? `Today is day ${dayToday} of ${eventName}.`
            : `Warmup for the challenge. Introduce yourself, Speak to the coach & finish your profile`}
        </p> */}
          </div>
        ) : null}

        {/* {eventDescription ? (
          <MoreText text={eventDescription} numChars={240} />
        ) : null} */}
        {/* <p className="text-gray-500 text-base prose whitespace-pre-wrap">
          {eventDescription}
        </p> */}
      </div>
    </div>
  );
};

export default Hello;
