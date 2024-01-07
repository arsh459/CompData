import { LoggedSymptom, periodDateType } from "@models/User/User";

interface insightResponse {
  insight: string;
  insightPrompt: string;
}

export const createMissedPeriodInsight = (): insightResponse => {
  return {
    insight: `Missed your period? This might be the reason`,
    insightPrompt:
      "I missed my period. Tell me the reasons and some next steps I should take. Share specific steps.",
  };
};

export const createLongerPeriodInsight = (): insightResponse => {
  return {
    insight: `Talk to Sakhi to understand why your period is longer than usual`,
    insightPrompt: `My period is longer than usual. Can you help me exlain why it might be so. Also share some remedies`,
  };
};

export const createEarlyPeriodInsight = (): insightResponse => {
  return {
    insight: `Got an early period? This might be the reason`,
    insightPrompt:
      "I got an early period. Tell me the rasons and some next steps I should take",
  };
};

export const createShorterPeriodInsight = (): insightResponse => {
  return {
    insight: `Talk to Sakhi to understand why your period is shorter than usual`,
    insightPrompt:
      "My period is shorter than usual. Can you help me exlain why it might be so. Also share some remedies",
  };
};

// export const createLongerCycleInsight = () => {
//   return "The current cycle appears to be longer than usual. Learn more.";
// };

// export const createShorterCycleInsight = () => {
//   return "The current cycle appears to be shorter than usual. Learn more.";
// };

export const createSymptomInsight = (
  symptoms: LoggedSymptom[],
  phase: periodDateType
): insightResponse => {
  const symptomString = symptoms.map((item) => item.text).join(", ");
  return {
    insight: `Ask Sakhi how it can help you with ${symptomString}`,
    insightPrompt: `Hi Sakhi! In my ${phase} phase. Having ${symptomString}. Suggest some specific workout and diet recommendations to manage it. Recommend in regards to my menstrual cycle`,
  };
};

const handlePeriodInsight = (phaseDay: number): insightResponse => {
  if (phaseDay <= 1) {
    return {
      insight: "Read a short guide on how to manage discomfort",
      insightPrompt: `Give me a short guide on how to manage discomfort in the first few days of the period. Share specific recommendations`,
    };
  } else {
    return {
      insight: "Time to get back in an active routine!",
      insightPrompt: `Give me a short guide on how to ease in to a workout routine after my period. SHare specific examples`,
    };
  }
};

const handleFollicularInsight = (phaseDay: number): insightResponse => {
  const phaseNumber = (phaseDay - 1) % 4;

  if (phaseNumber === 0) {
    return {
      insight: "Estrogen is on the rise. Learn what that means",
      insightPrompt:
        "How does rising estrogen affect my workout performance in my follicular phase. Share specific recommendations I can follow",
    };
  } else if (phaseNumber === 1) {
    return {
      insight: "Important to add whole grains today. Learn more",
      insightPrompt:
        "Why should I add whole grains in my follicular phase? Answer specific to the follicular phase",
    };
  } else if (phaseNumber === 2) {
    return {
      insight: "Hope you're getting good sleep. Learn why it is important",
      insightPrompt:
        "Why is getting good sleep in follicular phase important? Answer specific to the follicular phase",
    };
  } else {
    return {
      insight: "You will get the most of your workouts today. Learn why",
      insightPrompt:
        "Why do you get the most of your workouts in follicular phase?",
    };
  }
};

const handleLutealInsight = (phaseDay: number): insightResponse => {
  const phaseNumber = (phaseDay - 1) % 3;
  if (phaseNumber === 0) {
    return {
      insight: "Progesterone is on the rise. Learn what that means",
      insightPrompt:
        "How does rising Progesterone affect my skin, hair and energy in the luteal phase",
    };
  } else if (phaseNumber === 1) {
    return {
      insight: "Important to have complex carbs. Learn more",
      insightPrompt:
        "Why should I consume complex carbs in my luteal phase? Answer specific to the luteal phase",
    };
  } else {
    return {
      insight: "Have any PMS symptoms? This guide will help",
      insightPrompt:
        "Have some PMS symptoms. Help me with a short workout and diet guide to manage them",
    };
  }
};

export const getPhaseInsightString = (
  type: periodDateType,
  phaseDay: number
): insightResponse => {
  if (type === "OVULATION") {
    return {
      insight: "Your estrogen is at peak today. Learn more",
      insightPrompt: "Estrogen at peak today. What does this entail",
    };
  } else if (type === "FOLLICULAR") {
    return handleFollicularInsight(phaseDay);
  } else if (type === "LUTEAL") {
    return handleLutealInsight(phaseDay);
  } else if (type === "PERIOD" || type === "ESTIMATED_PERIOD") {
    return handlePeriodInsight(phaseDay);
  }

  return { insight: "", insightPrompt: "" };
};
