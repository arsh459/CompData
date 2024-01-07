import Button from "@components/button";
import { db } from "@config/firebase";
import { ConfigTargets } from "@hooks/configs/useUserConfigTargets";
import { useDailyNutriTargets } from "@modules/UserDaily/hooks/useDailyNutriTargets";
import { format } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
// import { format } from "date-fns";

interface Props {
  uid?: string;
  localConfig?: ConfigTargets;
}

const NutritionTargetListTemplate: React.FC<Props> = ({ uid }) => {
  const { nutritionTargets } = useDailyNutriTargets(uid);

  const onDeleteTarget = async (id: string) => {
    if (uid) {
      await deleteDoc(doc(doc(db, "users", uid), "nutritionTarget", id));
    }
  };

  return (
    <div className="py-8 px-2 ">
      <div className="flex pb-4">
        <Link href={`/admin/patients/${uid}/config/add`}>
          <Button appearance="contained">Add New Nutrition Target</Button>
        </Link>
      </div>
      <p className="px-4 text-lg">Current Nutrition Targets</p>

      <div className="flex  gap-4 overflow-x-scroll w-4/5 pb-8">
        {nutritionTargets?.map((item) => {
          return (
            <div
              key={item.id}
              className="border flex-1 p-4 m-2 cursor-pointer rounded-3xl"
            >
              <Link href={`/admin/patients/${uid}/config/${item.id}`}>
                {/* <p>id:{item.id}</p> */}
                <p className="font-medium">Period</p>
                <div className="flex items-center pb-4">
                  <p className="">
                    {item?.start
                      ? format(new Date(item?.start), "yyyy-MM-dd")
                      : "-"}
                  </p>
                  <p className="px-2">-</p>
                  <p>
                    {item?.end
                      ? format(new Date(item?.end), "yyyy-MM-dd")
                      : "-"}
                  </p>
                </div>

                <p className="text-sm">kcal: {item?.kcal}g</p>
                <p className="text-sm">protein: {item?.protein}g</p>
                <p className="text-sm">carbs: {item?.carbs}g</p>
                <p className="text-sm">Fiber: {item?.fiber}g</p>
                <p className="text-sm">fats: {item?.fats}g</p>
              </Link>
              <div className="pt-4">
                <p
                  onClick={() => onDeleteTarget(item.id)}
                  className="text-red-500 underline text-sm cursor-pointer"
                >
                  DELETE
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionTargetListTemplate;
