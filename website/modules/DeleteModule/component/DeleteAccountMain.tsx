import { useState } from "react";
import DeleteHeader from "./DeleteHeader";
import { useAuth } from "@hooks/auth/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import axios from "axios";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";

const DeleteAccountMain = () => {
  const [wantDelete, setWantDelete] = useState<boolean>(false);
  const [feedbacktext, setFeedBackText] = useState<string>("");
  const [showDeleteMsg, setShowDeleteMsg] = useState<boolean>(false);
  const { coachRef } = useCoachAtt();

  const { uid, signOut } = useAuth();

  const saveUserReasonForDelete = async () => {
    try {
      await updateDoc(doc(db, "users", uid), {
        reasonForDeletion: feedbacktext,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await axios({
        url: "https://asia-south1-holidaying-prod.cloudfunctions.net/deleteUser",
        method: "POST",
        data: {
          uid: uid,
        },
      });
    } catch (error: any) {
      //   crashlytics().recordError(error);
      console.log("error", error);
    }
  };

  const deleteHandler = async () => {
    await Promise.all([saveUserReasonForDelete(), onDelete()]);
    setShowDeleteMsg(true);
    setTimeout(() => {
      signOut();
    }, 3000);
  };
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #16004F 0%, #300F86 85.84%, #33006A 100%)",
      }}
      className="w-full min-h-screen flex flex-col items-center"
    >
      <LandingHeaderV2
        route={`/start?origin=$women${coachRef ? `&${coachRef}` : ""}`}
        btnText="Start Journey"
        coachRef={coachRef}
      />
      {showDeleteMsg ? (
        <div className=" flex flex-col justify-center text-center items-center md:w-2/3 w-full h-full px-4 mt-20 gap-4 ">
          <h1 className=" md:text-2xl text-lg w-[15ch] text-white font-pJSR font-bold">
            Your Account has been permanently deleted.
          </h1>
        </div>
      ) : (
        <div className=" flex flex-col justify-center items-center md:w-2/3 w-full h-full px-4 mt-20 gap-4 ">
          <DeleteHeader />
          {/* yes no section header */}
          <div className=" w-full flex md:flex-row flex-col justify-between md:items-center items-start">
            <h1 className=" text-white font-pJSR">
              Do you want to delete your SocialBoat account?
            </h1>
            <div className="flex gap-2 w-full md:w-fit md:mt-0 mt-4">
              <button
                onClick={() => setWantDelete(true)}
                className={`${
                  !wantDelete
                    ? " text-white bg-white/10"
                    : "text-black bg-white"
                }  text-center font-pJSR text-base rounded-xl py-2 px-6 w-full md:w-fit`}
              >
                <h1>Yes</h1>
              </button>
              <button
                onClick={() => setWantDelete(false)}
                className={`${
                  wantDelete ? " text-white bg-white/10" : "text-black bg-white"
                }  text-center font-pJSR text-base rounded-xl py-2 px-6 w-full md:w-fit`}
              >
                No
              </button>
            </div>
          </div>
          {/* Text Area */}
          <div className=" w-full h-full flex flex-col justify-start gap-2 flex-1">
            <h1 className=" text-white font-pJSR">
              Would be glad if you can share some thoughts on why?
            </h1>
            <textarea
              onChange={(e) => setFeedBackText(e.target.value)}
              value={feedbacktext}
              placeholder="type the feedback here"
              className=" text-white outline-transparent bg-white/10 w-full h-40 rounded-xl font-pJSR p-2"
            />
            <h1 className=" text-sm font-pJSR text-[#FEB547]">
              Disclaimer: All your data will be permanently deleted. This would
              mean all your FPs and badges will be lost. It might take 24 hours
              for changes to happen
            </h1>
          </div>
          <button
            onClick={deleteHandler}
            disabled={!wantDelete}
            className=" disabled:bg-[#FF5858]/20 disabled:cursor-not-allowed disabled:text-white/20 bg-[#FF5858] w-1/3 py-2 rounded-lg mt-8 text-white text-sm font-pJSR text-center "
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountMain;
