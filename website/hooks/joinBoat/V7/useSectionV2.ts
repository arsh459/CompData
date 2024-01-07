import { weEventTrack } from "@analytics/webengage/user/userLog";
import { db } from "@config/firebase";
import { getQueryParamsForJoinBoatV7 } from "@hooks/drawer/utils";
import {
  accurateGoal,
  dailyHealthIssues,
  howBusy,
  pastUsedMethod,
  UserInterface,
} from "@models/User/User";
import {
  getEstimatedDesiredWeight,
  // getIntialWeight,
  getWeightForHeight,
} from "@templates/joinBoatTemplate/V5/Components/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser } from "./interface";
import { useLeadForm } from "./useLeadForm";
import { createCalendlySession } from "@models/CalendlySession";

export type sectionTypes =
  | "loading"
  | "name"
  | "email"
  | "age"
  | "weight"
  | "height"
  | "accurateGoal"
  | "healthIssue"
  | "pastUsedMethod"
  | "paidplan"
  | "bookslot"
  | "consultationtime"
  | "howbusy"
  | "download"
  | "auth";

export interface boatParamQueryV7 {
  section?: sectionTypes;
  coach?: string; // to attribute to coach
  teamId?: string; // to add a user to team
  origin?: string; // origin which user comming from
}

export type boatParamQueryKeysV7 = "section";

export const useStartSectionV2 = (
  localUser?: LocalUser,
  user?: UserInterface
) => {
  const router = useRouter();
  const q = router.query as boatParamQueryV7;
  const [section, setSection] = useState<sectionTypes>("loading");

  useLeadForm(user?.uid);

  useEffect(() => {
    if (router.isReady && !q.section) {
      q.section = "name";
      router.replace(getQueryParamsForJoinBoatV7(q), undefined, {
        shallow: true,
      });
      // setInitCheck(true);
    } else if (router.isReady && q.section) {
      setSection(q.section);
      // setInitCheck(true);
    }
  }, [q, router]);

  const gotoSection = (sec: sectionTypes, replace?: boolean) => {
    // if (sec === "download" && q.origin === "myProgram") {
    //   router.push("myProgram");
    //   return;
    // }
    q.section = sec;
    if (replace) {
      router.replace(getQueryParamsForJoinBoatV7(q), undefined, {
        shallow: true,
      });
    } else {
      router.push(getQueryParamsForJoinBoatV7(q), undefined, { shallow: true });
    }
  };

  const onNameSave = async (name?: string) => {
    if (user?.uid && name) {
      weEventTrack("fScanNameLeadgen_clickNext", {});
      await updateDoc(doc(db, "users", user.uid), {
        name: name,
      });

      gotoSection("email");
    }
  };
  const onEmailSave = async (email?: string) => {
    if (user?.uid && email) {
      weEventTrack("fScanEmailLeadgen_clickNext", {});
      await updateDoc(doc(db, "users", user.uid), {
        email: email,
      });

      gotoSection("age");
    }
  };
  const onAccurateGoalSave = async (accurateFitnessGoal?: accurateGoal) => {
    if (user?.uid && accurateFitnessGoal) {
      await updateDoc(doc(db, "users", user.uid), {
        accurateGoal: accurateFitnessGoal,
      });
    }
    gotoSection("healthIssue");
    weEventTrack("fScanGoalLeadgen_clickNext", {});
  };
  const onHealthIssueSave = async (dailyHealthIssues?: dailyHealthIssues) => {
    if (user?.uid && dailyHealthIssues) {
      await updateDoc(doc(db, "users", user.uid), {
        dailyHealthIssues,
      });
    }
    gotoSection("pastUsedMethod");
    weEventTrack("fScanHealthLeadgen_clickNext", {});
  };
  const onPastUsedMethodSave = async (pastUsedMethod?: pastUsedMethod) => {
    if (user?.uid && pastUsedMethod) {
      await updateDoc(doc(db, "users", user.uid), {
        pastUsedMethod,
      });
    }
    gotoSection("howbusy");
    weEventTrack("fScanPastUsedLeadgen_clickNext", {});
  };

  const onHowBusySave = async (howBusy?: howBusy) => {
    // console.log("onHowBusySave", { howbusy });

    if (user?.uid && howBusy) {
      await updateDoc(doc(db, "users", user.uid), {
        howBusy,
      });
    }
    // gotoSection("paidplan");
    gotoSection("bookslot");
    weEventTrack("fScanBusyLeadgen_clickNext", {});
  };

  const onBookConsultationSave = async () => {
    // if (user?.uid && pastUsedMethod) {
    //   await updateDoc(doc(db, "users", user.uid), {
    //     pastUsedMethod,
    //   });
    weEventTrack("fScanPaidPlansLeadgen_clickNext", {});
    weEventTrack("fScanConsultRequestLeadgen_clickNext", {});

    // }
    if (user?.uid) {
      await updateDoc(doc(db, "users", user.uid), {
        ["leadFormFlags.completed"]: true,
      });

      const id = await createCalendlySession(user.uid, user.name);

      router.push(
        `/calendly?id=${id}&height=800&navBack=2${
          user.isOkWithPaidPlan ? "" : "&calendlyURL=socialboathealth"
        }`
      );
    }

    // gotoSection("consultationtime");
  };
  const onPaidStatusSave = async (value?: boolean) => {
    if (user?.uid) {
      await updateDoc(doc(db, "users", user.uid), {
        isOkWithPaidPlan: value ? true : false,
      });
    }

    weEventTrack("fScanPaidPlansLeadgen_clickNext", {});
    gotoSection("bookslot");
  };

  // age update
  const onAgeSave = async (newVal?: number) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanAgeLeadgen_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        age: newVal,
      });
    }
    gotoSection("weight");
  };

  // height update
  const onHeightSave = async (height?: number) => {
    if (user?.uid && height) {
      weEventTrack("fScanHeightLeadgen_clickNext", {});

      const weight = getWeightForHeight(
        height,
        user.gender ? user.gender : "female",
        user.fitnessGoal
      );

      await updateDoc(doc(db, "users", user.uid), {
        height,
        weight,
      });
    }
    gotoSection("accurateGoal");
  };

  // weight update
  const onWeightSave = async (newWeight?: number) => {
    if (user?.uid && newWeight) {
      weEventTrack("fScanCurrentWeightLeadgen_clickNext", {});
      // set Desired weight
      const newDesiredWeight = getEstimatedDesiredWeight(
        newWeight,
        user.height,
        user.gender
      );
      const cycleLength = user.periodTrackerObj?.inputCycleLength || 28;

      await updateDoc(doc(db, "users", user.uid), {
        weight: newWeight,
        desiredWeight: newDesiredWeight,
        [`periodTrackerObj.inputCycleLength`]: cycleLength,
      });

      // const goal = user.fitnessGoal;
      gotoSection("height");
    }
  };

  const onAuthSuccess = async (phoneNumber?: string) => {
    weEventTrack(`fScanAuthLeadgen_onAuthSccess`, {});

    // if phone number -> updatePhone number
    if (user?.uid && phoneNumber) {
      await updateDoc(doc(db, "users", user.uid), {
        phone: phoneNumber,
      });
    }

    // navigate to next screen
    gotoSection("name");
  };

  return {
    section,
    gotoSection,
    onNameSave,

    onAgeSave,
    onHeightSave,
    onWeightSave,

    onAuthSuccess,
    onAccurateGoalSave,

    onEmailSave,
    onHealthIssueSave,
    onBookConsultationSave,
    onPastUsedMethodSave,
    onHowBusySave,
    onPaidStatusSave,
  };
};
