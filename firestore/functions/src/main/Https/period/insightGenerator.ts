import { PeriodDateObj, UserInterface } from "../../../models/User/User";
import {
  areSymptomsLogged,
  getCyclePhaseToUse,
  // isCycleDeviating,
} from "./insightchecks";

export const insightGenerator = (
  cycleDate: PeriodDateObj,
  currentCycleLength: number,
  currentPeriodLength: number,
  user: UserInterface,
) => {
  // if future date

  const sympState = areSymptomsLogged(cycleDate);
  // if logged symptoms are present
  if (sympState.status) {
    console.log("hi");
  }

  // isCycleDeviating(user, cycleDate, currentCycleLength, currentPeriodLength);

  getCyclePhaseToUse(cycleDate);

  /**
   *
   * ////////
   * check <- loggedSymptoms
   *
   * if cycleDate === today
   * checkFor -> missedPeriod, longerThanUsualPeriod, earlyPeriod
   *
   *
   * checkFor -> Period, Ovulation, PMS, ovulation_approaching, post_period, post_ovulation
   * ////////
   *
   * ////////
   * // getInitialSymptoms <- taken during onboarding
   *
   * // getGoals <- Predict your periods, Learn how to regularise your cycle, Help you conceinve, Birth Control Planning
   *
   * // Current cycle length (optional)
   * // Current Period length (optional)
   *
   * ////////
   *
   * generateSuggestions()
   * generateInsight()
   *
   *
   * Insight types:
   *
   *
   *
   *
   *
   * PCOS
   * - Length of period
   * - Flow of the period on days
   * - Severity of symptoms - Mood, Sleep, Acne and severity, document hair thinning, fatigue, pelvic pain.
   * - Cervical mucus for fertility window
   *
   *
   *
   *
   *
   *
   *
   *
   */

  // if symptom exists, suggest remedies

  // if period day 1, 2 - NO ENERGY, HIGH SYMPTOMS
  // suggest diet remedies for possible symptoms - Cramps, fatigue
  // suggest pain relief remedies

  // if period day 3-5 - LOW ENERGY, LINGERING SYMPTOMS
  // suggest workouts one can go back to.
  // suggest diet one can go back to

  // early follicular - BETTER ENERGY, LOW PREGNANCY CHANCES
  // suggest workouts one can go back to.
  // Changes in cervical mucus
  // Improvement in skin acne

  // late follicular - PEAK ENERGY, HIGH CHANCES OF PREGNANCY
  //
  // high chances of getting pregnant

  // ovulation - PEAK ENERGY, HIGH CHANCES OF PREGNANCY
  //

  // early luteal

  // late luteal

  // if ESTIMATED_PERIOD

  //

  // if current unix is more than now
  //   if (periodDate.unix > now) {
  //     if (periodDate.type === "PERIOD") {
  //     } else if (periodDate.type === "ESTIMATED_PERIOD") {
  //     } else if (periodDate.type === "FOLLICULAR") {
  //     } else if (periodDate.type === "OVULATION") {
  //       // you are most fertile today
  //     } else if (periodDate.type === "LUTEAL") {
  //     }
  //   } else {
  //   }

  return "hi";
};

/**
 * CyclePredictor <- (periodDates, loggedSymptoms)
 *
 * relevant information to display
 * - Chances of getting pregnant
 * - Remedies of any symptoms you might be feeling
 * - Remedies of symptoms you are feeling
 * - When to expect the next period
 * - if the periodLength is too small
 * - if the periodLength is longer than expected
 *
 *
 * - Symptoms that are relevant
 * -- Flow -> Heavy or light
 * -- Cramps - MENSTRUATION, OVULATION (Only for some individuals)
 * -- Fatigue - PMS & MS
 * -- Cravings - LUTEAL
 * -- Bad mood or emotional
 * -- Missed period
 * -- Breast tenderness
 * -- Acne - Likely in LUTEAL phase
 * -- Diarrhoea -
 * -- Bloating
 * -- Nausea
 * -- Discharge
 *
 *
 */

/**
 * PCOS management
 *
 *
 *
 * Trying to conceive
 * - Chances to get pregnant
 *
 *
 *
 * Pregnancy Prevention
 * - Chances to get pregnant
 *
 *
 *
 * Period prediction
 * - When is period likely to start
 * - When is period likely to end
 * - Remedies for Painful periods
 *
 *
 *
 * Fitness & diet
 * - Workout remedies for period symptoms
 * - Diet Remedies for period symptoms
 * - Workout for performance in cycle
 *
 *
 *
 *
 *
 * Understanding their cycle
 *
 *
 *
 */
