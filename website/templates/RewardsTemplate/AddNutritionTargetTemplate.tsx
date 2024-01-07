// import Script from "next/script";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@components/loading/Loading";
import {
  NutriTargetsNumericKey,
  useNutriTarget,
} from "@hooks/configs/useNutriTarget";
import { saveNewNutritionTarget } from "@models/Configs/createUtils";
import HandleDate from "@modules/UserConfig/HandleDate";

interface Props {
  uid: string;
  nutriTargetId: string;
}

const fieldsNumeric: NutriTargetsNumericKey[] = [
  // "end",
  // "start",
  "carbs",
  "fats",
  "fiber",
  "protein",
  "kcal",
];

const AddNutritionTargetTemplate: React.FC<Props> = ({
  nutriTargetId,
  uid,
}) => {
  //   const { id } = useTestimonialParams();

  const { onNumberFieldsUpdate, nutriTarget, onUpdateDate } = useNutriTarget(
    uid,
    nutriTargetId
  );

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSave = async () => {
    if (loading === false) {
      setLoading(true);

      if (nutriTarget) {
        try {
          // console.log("testim", stories);
          await saveNewNutritionTarget(uid, nutriTarget);
          router.push(`/admin/patients/${uid}/config/`);
          // setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      }
    }
  };

  return (
    <div className="p-4 pt-8">
      <div>
        <p className="text-gray-700 text-4xl font-semibold">
          Add/Update NutriTargets
        </p>
      </div>
      <>
        {loading ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="py-8 mb-9">
            <div className="pb-4">
              <p>Start Date</p>
              <HandleDate
                // initialValue={
                //   nutriTarget?.start ? new Date(nutriTarget?.start) : undefined
                // }
                initialValue={
                  nutriTarget?.start ? new Date(nutriTarget?.start) : undefined
                }
                // setSelectDate={(val: Date) => onUpdateDate('start', val)}
                setSelectDate={(newVal: Date) => {
                  onUpdateDate("start", newVal);
                }}
              />
            </div>
            <div className="pb-4">
              <p>End Date</p>
              <HandleDate
                initialValue={
                  nutriTarget?.end ? new Date(nutriTarget?.end) : undefined
                }
                setSelectDate={(newVal: Date) => {
                  onUpdateDate("end", newVal);
                }}
              />
            </div>
            {fieldsNumeric.map((item) => {
              return (
                <div className="py-4" key={item}>
                  <TextField
                    style={{ width: "100%" }}
                    placeholder={`${item}'s value `}
                    label={item}
                    variant="outlined"
                    onChange={(val) =>
                      onNumberFieldsUpdate(parseFloat(val.target.value), item)
                    }
                    value={(nutriTarget && nutriTarget[item]) || 0}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </>

      <div className="fixed bottom-0 left-0 right-0  z-50">
        <BottomNavComV2 cta={"Save Details"} onClick={onSave} />
      </div>
    </div>
  );
};

export default AddNutritionTargetTemplate;
