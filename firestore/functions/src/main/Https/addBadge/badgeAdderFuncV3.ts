import { UserInterface } from "../../../models/User/User";
import {
  ARJA_BEGINEER,
  KOHLI,
  MARY_KOM,
  PANDYA,
  PV_SINDHU,
  SOCIALBOAT_BEGINNER,
  ARJA_UID,
  GREESHA_PCOS,
  GREESHA_UID,
  BOOTCAMP_YOGA,
  BOOTCAMP_DIET,
  BOOTCAMP_ARJA,
} from "../taskGenerator/constants";

export const badgeAlot = (
  user: UserInterface,
  creatorId?: string,
): { badgeId: string; workoutCoach: string; dietBadgeId?: string } => {
  console.log("creatorId", creatorId);

  /////// bootcamp changes
  if (user.adSource === "bootcamp") {
    return {
      badgeId: BOOTCAMP_YOGA,
      workoutCoach: GREESHA_UID,
      dietBadgeId: BOOTCAMP_DIET,
    };
  }

  if (user.adSource === "aarja") {
    return {
      badgeId: BOOTCAMP_ARJA,
      workoutCoach: ARJA_UID,
      dietBadgeId: BOOTCAMP_DIET,
    };
  }

  // if (user.adSource === "") {
  //   return { badgeId: "", workoutCoach: "" };
  // }

  if (creatorId === GREESHA_UID) {
    return { badgeId: GREESHA_PCOS, workoutCoach: GREESHA_UID };
  }

  if (creatorId === ARJA_UID) {
    return getArjaOnlyRec(user);
  }

  if (user.workoutStyle === "Yoga") {
    return { badgeId: GREESHA_PCOS, workoutCoach: GREESHA_UID };
  }

  if (user.workoutStyle === "HIIT") {
    return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
  }

  return getSocialboatRec(user);
};

const getArjaOnlyRec = (
  user: UserInterface,
): { badgeId: string; workoutCoach: string } => {
  const ageFlag = getAgeFlag(user);
  const difficulty = getDifficulty(user);
  const userGoal = getUserGoal(user);

  console.log("age", ageFlag);
  console.log("difficulty", difficulty);
  console.log("userGoal", userGoal);

  if (ageFlag === "40+") {
    if (difficulty === "advanced") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      }
    } else if (difficulty === "medium") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      }
    } else {
      if (userGoal === "pcos_pcod") {
        return { badgeId: SOCIALBOAT_BEGINNER, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: SOCIALBOAT_BEGINNER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: SOCIALBOAT_BEGINNER, workoutCoach: ARJA_UID };
      }
    }
  } else if (ageFlag === "30_40") {
    if (difficulty === "advanced") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      }
    } else if (difficulty === "medium") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      }
    } else {
      if (userGoal === "pcos_pcod") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      }
    }
  } else {
    if (difficulty === "advanced") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      }
    } else if (difficulty === "medium") {
      if (userGoal === "pcos_pcod") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      }
    } else {
      if (userGoal === "pcos_pcod") {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      } else if (userGoal === "lose_weight") {
        return { badgeId: ARJA_BEGINEER, workoutCoach: ARJA_UID };
      } else {
        return { badgeId: PV_SINDHU, workoutCoach: ARJA_UID };
      }
    }
  }
};

const getDifficulty = (user: UserInterface) => {
  if (user.workoutFrequency === "everyday") {
    return "advanced";
  } else if (
    user.workoutFrequency === "2_5" ||
    user.workoutFrequency === "1_3"
  ) {
    return "medium";
  } else if (user.workoutFrequency === "none") {
    return "basic";
  }

  return "basic";
};

const getAgeFlag = (user: UserInterface) => {
  if (user.age && user.age >= 40) {
    return "40+";
  } else if (user.age && user.age >= 30 && user.age < 40) {
    return "30_40";
  } else if (user.age && user.age < 30) {
    return "<30";
  }

  return "<30";
};

const getUserGoal = (user: UserInterface) => {
  if (user.fitnessGoal?.includes("pcos_pcod")) {
    return "pcos_pcod";
  } else if (user.fitnessGoal?.includes("keep_fit")) {
    return "gain_muscle";
  } else if (user.fitnessGoal?.includes("lose_weight")) {
    return "lose_weight";
  } else {
    return "lose_weight";
  }
};

const getGender = (user: UserInterface) => {
  if (user.gender === "male") {
    return "male";
  }

  return "female";
};

const getSocialboatRec = (
  user: UserInterface,
): { badgeId: string; workoutCoach: string } => {
  const ageFlag = getAgeFlag(user);
  const difficulty = getDifficulty(user);
  const userGoal = getUserGoal(user);
  const gender = getGender(user);

  console.log("age", ageFlag);
  console.log("difficulty", difficulty);
  console.log("userGoal", userGoal);
  console.log("gender", gender);

  if (gender === "female") {
    if (ageFlag === "40+") {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      }
    } else if (ageFlag === "30_40") {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: MARY_KOM, workoutCoach: "" };
        } else {
          return { badgeId: MARY_KOM, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      }
    } else {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        }
      }
    }
  } else {
    if (ageFlag === "40+") {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PANDYA, workoutCoach: "" };
        } else {
          return { badgeId: PANDYA, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: MARY_KOM, workoutCoach: "" };
        } else {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        }
      }
    } else if (ageFlag === "30_40") {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: KOHLI, workoutCoach: "" };
        } else {
          return { badgeId: KOHLI, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PANDYA, workoutCoach: "" };
        } else {
          return { badgeId: PANDYA, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        }
      }
    } else {
      if (difficulty === "advanced") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: KOHLI, workoutCoach: "" };
        } else {
          return { badgeId: KOHLI, workoutCoach: "" };
        }
      } else if (difficulty === "medium") {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PANDYA, workoutCoach: "" };
        } else {
          return { badgeId: PANDYA, workoutCoach: "" };
        }
      } else {
        if (userGoal === "pcos_pcod") {
          return { badgeId: GREESHA_PCOS, workoutCoach: "" };
        } else if (userGoal === "lose_weight") {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        } else {
          return { badgeId: PV_SINDHU, workoutCoach: "" };
        }
      }
    }
  }
};
