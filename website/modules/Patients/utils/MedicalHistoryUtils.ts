import { db } from "@config/firebase";
import { AppointmentInterface } from "@models/Appintment";
import {
  DailyIssuesEnum,
  FamilyHistoryEnum,
  UserInterface,
} from "@models/User/User";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
import { format } from "date-fns";
import { deleteField, doc, updateDoc } from "firebase/firestore";

export const getMedicalHistroyEditObject = (
  user?: UserInterface,
  appointment?: AppointmentInterface
): EditObject => {
  return {
    heading: "Medical History",
    fieldsArr: [
      // {
      //   id: "diagnosis-detail",
      //   name: "Diagnosis Detail",
      //   type: "text",
      //   value: appointment?.prescriptionData?.diagnosis,
      //   onSave: async (val?: string) =>
      //     await onSaveDiagnosis(appointment?.id, val),
      // },
      {
        id: "diagnosis-date",
        name: "Approx PCOS dianosed date",
        type: "date",
        value: user?.authSignupTime,
        onSave: async (val?: number) =>
          await onSaveDiagnosisDate(user?.uid, val),
      },
      {
        id: "health-issues",
        name: "Health Issues",
        type: "options",
        value: getSelectedArr(user?.dietForm?.dailyIssues),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("dailyIssues", user?.uid, val, other),
        options: Object.keys(DailyIssuesEnum).map((each) => each),
        other: user?.dietForm?.dailyIssuesText,
        showOther: true,
      },
      {
        id: "family-disease",
        name: "Family disease",
        type: "options",
        value: getSelectedArr(user?.dietForm?.familyHistory),
        onSave: async (val?: string[], other?: string) =>
          await onSaveDietFormOptions("familyHistory", user?.uid, val, other),
        options: Object.keys(FamilyHistoryEnum).map((each) => each),
        other: user?.dietForm?.familyHistoryText,
        showOther: true,
      },
      {
        id: "recent-pragnancy",
        name: "Recent Pragnancy",
        type: "dropdown",
        value: user?.doctorForm?.pregnantHistory ? "Yes" : undefined,
        onSave: async (val?: string) =>
          await onSaveDoctorFormBoolean("pregnantHistory", user?.uid, val),
        options: ["Yes", "No"],
        dependencyId: "recent-pragnancy-date",
        dependencyDependVal: "Yes",
      },
      {
        id: "recent-pragnancy-date",
        name: "Recent Pragnancy Date",
        type: "date",
        value: user?.doctorForm?.pregnancyDate
          ? new Date(user.doctorForm.pregnancyDate).getTime()
          : undefined,
        onSave: async (val?: number) =>
          await onSaveRecentPragnancyDate(user?.uid, val),
        hideIfDepedent: user?.doctorForm?.pregnantHistory ? false : true,
      },
      {
        id: "surgical-history",
        name: "Surgical History",
        type: "dropdown",
        value: user?.doctorForm?.surgicalHistory ? "Yes" : undefined,
        onSave: async (val?: string) =>
          await onSaveDoctorFormBoolean("surgicalHistory", user?.uid, val),
        options: ["Yes", "No"],
        dependencyId: "surgical-history-brief",
        dependencyDependVal: "Yes",
      },
      {
        id: "surgical-history-brief",
        name: "Surgical History Brief",
        type: "text",
        value: user?.doctorForm?.surgeryBrief,
        onSave: async (val?: string) =>
          await onSaveSurgicalHistoryBrief(user?.uid, val),
        hideIfDepedent: user?.doctorForm?.surgicalHistory ? false : true,
      },
      {
        id: "weight",
        name: "Weight",
        type: "quntity",
        value: user?.weight,
        onSave: async (val?: number) =>
          await onSaveUserNumber("weight", user?.uid, val),
        text: "Kg",
        minVal: 0,
        maxVal: 200,
        step: 1,
      },
      {
        id: "height",
        name: "Height",
        type: "quntity",
        value: user?.height,
        onSave: async (val?: number) =>
          await onSaveUserNumber("height", user?.uid, val),
        text: "Inchs",
        minVal: 0,
        maxVal: 120,
        step: 1,
      },
    ],
  };
};

export const onSaveUserNumber = async (
  target: "weight" | "height" | "sleepQuality",
  id?: string,
  val?: number
) => {
  if (id && val) {
    await updateDoc(doc(db, "users", id), {
      [target]: val,
    });
  }
};

// const onSaveDiagnosis = async (id?: string, val?: string) => {
//   if (id && val) {
//     await updateDoc(doc(db, "appointments", id), {
//       [`prescriptionData.diagnosis`]: val,
//     });
//   }
// };

const onSaveDiagnosisDate = async (id?: string, val?: number) => {
  if (id && val) {
    await updateDoc(doc(db, "users", id), {
      authSignupTime: val,
    });
  }
};

export const getSelectedArr = (obj?: Partial<Record<string, boolean>>) => {
  if (obj) {
    const trueKeys = Object.keys(obj).filter((key) => obj[key] === true);
    return trueKeys;
  }

  return undefined;
};

export const onSaveDietFormOptions = async (
  target:
    | "familyHistory"
    | "medication"
    | "addiction"
    | "dailyIssues"
    | "cuisinePreference"
    | "dietPreference"
    | "allergies",
  id?: string,
  val?: string[],
  other?: string
) => {
  if (id) {
    const remoteObj: { [key: string]: boolean } = {};

    val?.forEach((each) => {
      remoteObj[each] = true;
    });

    await updateDoc(doc(db, "users", id), {
      [`dietForm.${target}`]: Object.keys(remoteObj).length
        ? remoteObj
        : deleteField(),
      [`dietForm.${target}Text`]: other || deleteField(),
    });
  }
};

export const onSaveDoctorFormBoolean = async (
  target: "pregnantHistory" | "surgicalHistory" | "sexuallyActive",
  id?: string,
  val?: string
) => {
  if (id) {
    await updateDoc(doc(db, "users", id), {
      [`doctorForm.${target}`]: val === "Yes" ? true : deleteField(),
    });
  }
};

const onSaveRecentPragnancyDate = async (id?: string, val?: number) => {
  if (id) {
    await updateDoc(doc(db, "users", id), {
      [`doctorForm.pregnancyDate`]: val
        ? format(val, "yyyy-MM-dd")
        : deleteField(),
    });
  }
};

const onSaveSurgicalHistoryBrief = async (id?: string, val?: string) => {
  if (id && val) {
    await updateDoc(doc(db, "users", id), {
      [`doctorForm.surgeryBrief`]: val,
    });
  }
};
