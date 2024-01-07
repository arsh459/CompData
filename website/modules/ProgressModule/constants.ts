import { energyTypes, moodTypes } from "@models/User/User";

export const msInDay = 24 * 60 * 60 * 1000;

export const dataAddMood: { mood: number; moodType: moodTypes }[] = [
  {
    mood: 1,
    moodType: "Sad",
  },
  {
    mood: 2,
    moodType: "Bit Low",
  },
  {
    mood: 3,
    moodType: "Meh",
  },
  {
    mood: 4,
    moodType: "Good",
  },
  {
    mood: 5,
    moodType: "Great",
  },
];

export const dataAddEnergy: { energy: number; energyType: energyTypes }[] = [
  {
    energy: 1,
    energyType: "low",
  },
  {
    energy: 2,
    energyType: "moderate",
  },
  {
    energy: 3,
    energyType: "very high",
  },
];
