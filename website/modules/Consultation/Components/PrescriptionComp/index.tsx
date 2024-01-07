import { CSSProperties } from "react";
import TextInputField from "../TextInputField";
import {
  Prescription,
  dietSuggestions,
  lifestyleSuggestions,
} from "@models/Appintment";
import DietaryGols from "./DietaryGols";
import LifeStyleGoles from "./LifeStyleGoles";
import NextFollowUp from "./NextFollowUp";

const multilineInputStyle: CSSProperties = {
  height: "120px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

interface Props {
  color: string;
  nextFollowupDate?: string;
  prescriptionData?: Prescription;
  nextFollowupDateNote?: string;
  setNextFollowupDate: (val: string) => void;
  setFollowupNote: (val: string) => void;
  setPrescriptionData: (val: Prescription) => void;
}

const PrescriptionComp: React.FC<Props> = ({
  color,
  nextFollowupDate,
  prescriptionData,
  nextFollowupDateNote,
  setNextFollowupDate,
  setFollowupNote,
  setPrescriptionData,
}) => {
  const setDietData = (diet: dietSuggestions) => {
    setPrescriptionData({ ...prescriptionData, diet });
  };
  const setLifeStyleData = (lifestyle: lifestyleSuggestions) => {
    setPrescriptionData({ ...prescriptionData, lifestyle });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <TextInputField
          label="Provisional Diagnosis"
          maxRows={4}
          placeholder="Type here"
          multiline={true}
          InputProps={{ style: multilineInputStyle }}
          value={prescriptionData?.diagnosis || ""}
          onChange={(e) =>
            setPrescriptionData({
              ...prescriptionData,
              diagnosis: e.target.value,
            })
          }
        />
        <TextInputField
          label="Tests to be done"
          maxRows={4}
          placeholder="Type here"
          multiline={true}
          InputProps={{ style: multilineInputStyle }}
          value={prescriptionData?.tests || ""}
          onChange={(e) =>
            setPrescriptionData({
              ...prescriptionData,
              tests: e.target.value,
            })
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <TextInputField
          label="Medications"
          placeholder="Type here"
          multiline={true}
          maxRows={4}
          InputProps={{ style: multilineInputStyle }}
          value={prescriptionData?.medications || ""}
          onChange={(e) =>
            setPrescriptionData({
              ...prescriptionData,
              medications: e.target.value,
            })
          }
        />
        <TextInputField
          label="Supplementations"
          placeholder="Type here"
          multiline={true}
          maxRows={4}
          InputProps={{ style: multilineInputStyle }}
          value={prescriptionData?.supplements || ""}
          onChange={(e) =>
            setPrescriptionData({
              ...prescriptionData,
              supplements: e.target.value,
            })
          }
        />
      </div>

      <TextInputField
        label="Misc advice"
        placeholder="Any other info wish to add"
        multiline={true}
        maxRows={4}
        InputProps={{ style: multilineInputStyle }}
        value={prescriptionData?.miscData || ""}
        onChange={(e) =>
          setPrescriptionData({
            ...prescriptionData,
            miscData: e.target.value,
          })
        }
      />

      <TextInputField
        label="Menstruation info"
        placeholder="Information like LMP, symptoms you want to keep"
        multiline={true}
        maxRows={4}
        InputProps={{ style: multilineInputStyle }}
        value={prescriptionData?.menstrualData || ""}
        onChange={(e) =>
          setPrescriptionData({
            ...prescriptionData,
            menstrualData: e.target.value,
          })
        }
      />

      <LifeStyleGoles
        lifeStyleData={prescriptionData?.lifestyle}
        setLifeStyleData={setLifeStyleData}
      />
      <DietaryGols
        color={color}
        dietData={prescriptionData?.diet}
        setDietData={setDietData}
      />

      <NextFollowUp
        nextFollowupDate={nextFollowupDate}
        setNextFollowupDate={setNextFollowupDate}
      />
      <TextInputField
        label="Followup note"
        multiline={true}
        placeholder="Example - PCOS panel on period date & revert"
        value={nextFollowupDateNote || ""}
        onChange={(e) => setFollowupNote(e.target.value)}
      />
      <div className="h-20" />
    </div>
  );
};

export default PrescriptionComp;
