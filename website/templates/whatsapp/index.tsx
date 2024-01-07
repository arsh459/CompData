import WhatsappHeader from "@templates/whatsapp/Header/WhatsappHeader";
import WhatsappMessage from "@templates/whatsapp/WhatsappMessage/index";
import { getCloudinaryURLWithParams } from "@utils/cloudinary";
import InviteMessage from "./WhatsappMessage/InviteMessage";
import SignupMessage from "./WhatsappMessage/signupMessage";
import WorkoutMessage from "./WhatsappMessage/workoutMessage";

const bgImg =
  "https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/club%2Fwb.png?alt=media&token=9664c85b-a829-465f-8eb6-d649ac1130a1";

export interface WhatsappProps {
  nameOfPerson: string;
  course: string;
  toStartIn: string;
  instructorName: string;
  msgType: "reminder" | "welcome" | "workout" | "invite";
  courseCost?: number;
  joinLink?: string;
  currency?: "₹";
  img?: string;
  pointers?: Pointer[];
}

export interface Pointer {
  text: string;
}

const WhatsappTemplate: React.FC<WhatsappProps> = ({
  nameOfPerson,
  course,
  toStartIn,
  instructorName,
  msgType,
  courseCost,
  joinLink,
  currency,
  img,
  pointers,
}) => {
  return (
    <div className="relative rounded-xl">
      <div className="z-10 absolute top-0 left-0 right-0">
        <div className="">
          <WhatsappHeader userImg={msgType === "invite"} />
        </div>
        <div className="p-2">
          {msgType === "reminder" ? (
            <WhatsappMessage
              nameOfPerson={nameOfPerson}
              course={course}
              toStartIn={toStartIn}
              instructorName={instructorName}
            />
          ) : msgType === "welcome" ? (
            <SignupMessage
              nameOfPerson={nameOfPerson}
              courseName={course}
              courseCost={courseCost}
              joinLink={joinLink}
              currency={currency}
            />
          ) : msgType === "workout" ? (
            <WorkoutMessage
              nameOfPerson={nameOfPerson}
              courseName={course}
              courseCost={courseCost}
              joinLink={joinLink}
              currency={currency}
              img={img}
              pointers={pointers}
            />
          ) : msgType === "invite" ? (
            <InviteMessage
              nameOfPerson={nameOfPerson}
              courseName={course}
              courseCost={courseCost}
              joinLink={joinLink}
              currency={currency}
              img={img}
              pointers={pointers}
            />
          ) : null}
        </div>
      </div>
      <div className="z-0 absolute top-0">
        <img
          src={getCloudinaryURLWithParams(bgImg, 400, 474, "c_fill")}
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default WhatsappTemplate;
