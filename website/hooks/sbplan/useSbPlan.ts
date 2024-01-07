import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  planBenefits,
  planOfferings,
  PlanTypes,
  SbPlans,
  sbplansDuration,
} from "@models/SbPlans/interface";
import { createNewSbPlan } from "@models/SbPlans/createUtils";
import { currency } from "@templates/PaymentTemplate/SelectPlan";
import { db } from "@config/firebase";
import { gameAccessTypes } from "@models/AppSubscription/AppSubscription";

export const useSbPlan = (uid: string, id?: string) => {
  const [sbplans, setSbPlans] = useState<SbPlans>();
  useEffect(() => {
    const getSbPlanDetail = async () => {
      console.log({ id });
      if (id && uid) {
        const document = await getDoc(doc(db, "sbplans", id));
        const data = document.data();
        if (data) {
          const sd = data as SbPlans;
          setSbPlans(sd);
        } else {
          setSbPlans(createNewSbPlan());
        }
      }
    };
    getSbPlanDetail();
  }, [uid, id]);

  const onUpdateName = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          name: newVal,
        };
      }
    });
  };
  const onUpdateBaseText = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          baseText: newVal,
        };
      }
    });
  };

  const onUpdatePlanType = (newType: PlanTypes) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          planType: newType,
        };
      }
    });
  };
  const onUpdateCurrency = (newVal: currency) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          currency: newVal,
        };
      }
    });
  };
  const onUpdateDurationString = (newVal: sbplansDuration) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          duration: newVal,
        };
      }
    });
  };
  const onUpdateAppSubId = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          appSubId: newVal,
        };
      }
    });
  };
  const onUpdateAppGameAccess = (newVal: gameAccessTypes) => {
    setSbPlans((prev) => {
      if (prev && newVal) {
        return {
          ...prev,
          gameAcess: [newVal],
        };
      }
    });
  };
  const onUpdateRazorPayId = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          razorpayId: newVal,
        };
      }
    });
  };
  const onUpdateDescription = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          description: newVal,
        };
      }
    });
  };
  const onUpdateGameId = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          gameId: newVal,
        };
      }
    });
  };
  const onUpdateCost = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          cost: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdateBaseCost = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          baseCost: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdateUsdCost = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          usdCost: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdateUsdBaseCost = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          usdBaseCost: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdatePriority = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          priority: parseInt(newVal),
        };
      }
    });
  };
  const onUpdateFreeTrialDuration = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          freeTrialDuration: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdateMoneyBackDuration = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          moneyBackDuration: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdateDurationInDays = (newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          durationInDays: parseFloat(newVal),
        };
      }
    });
  };
  const onUpdatePinned = (newVal: boolean) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          pinned: newVal,
        };
      }
    });
  };
  const onUpdateMostPopular = (newVal: boolean) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          mostPopular: newVal,
        };
      }
    });
  };

  const addToDescList = (steps: string, index?: number) => {
    setSbPlans((prev) => {
      if (prev) {
        const values = prev.descList ? [...prev.descList] : [];

        if (index === undefined) {
          values.push(steps);
        } else {
          values[index] = steps;
        }

        return { ...prev, descList: values };
      }
    });
  };
  const removeFromDescList = (step: string) => {
    const values =
      sbplans?.descList && sbplans.descList.filter((each) => each !== step);

    setSbPlans((prev) => {
      if (prev && values) {
        return { ...prev, descList: values };
      }
    });
  };
  const onToggleRecommend = (newVal: boolean) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          recommended: newVal,
        };
      }
    });
  };
  const onTogglePinned = (newVal: boolean) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          pinned: newVal,
        };
      }
    });
  };
  const onUpdateOfferings = (key: keyof planOfferings, newVal: string) => {
    setSbPlans((prev) => {
      if (prev) {
        return {
          ...prev,
          offerings: { ...prev.offerings, [key]: parseInt(newVal) },
        };
      }
    });
  };
  const onUpdateBenefits = (key: keyof planBenefits, newVal: boolean) => {
    console.log({ key, newVal });

    setSbPlans((prev) => {
      if (prev) {
        return { ...prev, benefits: { ...prev.benefits, [key]: newVal } };
      }
    });
  };

  return {
    sbplans,
    setSbPlans,
    addToDescList,
    removeFromDescList,
    onUpdateAppSubId,
    onUpdatePinned,
    onUpdateUsdBaseCost,
    onUpdateBaseCost,
    onUpdateDurationInDays,
    onUpdateGameId,

    onUpdateDescription,
    onUpdateName,
    onUpdateMoneyBackDuration,
    onUpdateFreeTrialDuration,
    onUpdateDurationString,
    onUpdateUsdCost,
    onUpdateCurrency,
    onUpdateCost,

    onUpdatePriority,
    onUpdateRazorPayId,
    onUpdateAppGameAccess,
    onTogglePinned,
    onToggleRecommend,
    onUpdateBenefits,
    onUpdateOfferings,
    onUpdateBaseText,
    onUpdateMostPopular,
    onUpdatePlanType,
  };
};
