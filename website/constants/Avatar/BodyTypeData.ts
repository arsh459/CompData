import {
  BodyTypeObj,
  BodyTypesId,
  easyEvolutionType,
  EvolutionBodyType,
  evolutionType,
  hardEvolutionType,
  mediumEvolutionType,
} from "./utils";

const baseURL =
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto";

export const BodyTypeData: { [key in BodyTypesId]: BodyTypeObj } = {
  apple_shaped: {
    id: "apple_shaped",
    name: "Apple-shaped Body",
    description:
      "If you carry excess weight in the abdomen, you have an apple shaped body",
    image: {
      male: `${baseURL}/Apple_shaped_male_2mAMN1DHJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648859161`,
      female: `${baseURL}/Apple_shaped_female_dXbzz-9iK5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648830558`,
    },
    evolution: [
      easyEvolutionType("hourglass_shaped"),
      mediumEvolutionType("mesomorph"),
    ],
  },
  pear_shaped: {
    id: "pear_shaped",
    name: "Pear-shaped Body",
    description:
      "Carry excess weight in the hips and thighs. Most of the extra body weight is in the lower body",
    image: {
      male: `${baseURL}/Pear_shaped_male_USxMGPK57.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648853710`,
      female: `${baseURL}/Pear_shaped_female_prxdV1POY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648830863`,
    },
    evolution: [
      easyEvolutionType("hourglass_shaped"),
      mediumEvolutionType("mesomorph"),
    ],
  },
  rectangle_shaped: {
    id: "rectangle_shaped",
    name: "Rectangle-shaped Body",
    description:
      "A body type with little distinction between waist and hips. Indicative of fat around hips",
    image: {
      male: `${baseURL}/Rectangle_shaped_male_ucqgUDzZP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648863405`,
      female: `${baseURL}/Rectangle_shaped_female_makRodaYn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648861127`,
    },
    evolution: [
      easyEvolutionType("hourglass_shaped"),
      mediumEvolutionType("mesomorph"),
      hardEvolutionType("fit"),
    ],
  },
  endomorph: {
    id: "endomorph",
    name: "Endomorph Body Type",
    description: "Naturally curvy with a tendency to gain weight easily",
    image: {
      male: `${baseURL}/Endomorph_male_FKuogakic.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648865411`,
      female: `${baseURL}/Endomorph_female_e_j3u_9Je.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648861545`,
    },
    evolution: [
      easyEvolutionType("hourglass_shaped"),
      mediumEvolutionType("mesomorph"),
      hardEvolutionType("fit"),
    ],
    workoutNote:
      "High-intensity interval training (HIIT) and strength training to build muscle and reduce body fat, combined with a calorie deficit of 500-1000 calories per day",
  },
  overweight: {
    id: "overweight",
    name: "Overweight",
    description:
      "BMI between 25 and 29.9. Your body shape is regular shaped but you are overweight for your height",
    image: {
      male: `${baseURL}/Overweight_male_qB_JNulf7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648830331`,
      female: `${baseURL}/Overweight_female_TZH_P2cSA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648854550`,
    },
    evolution: [
      easyEvolutionType("endomorph"),
      mediumEvolutionType("hourglass_shaped"),
      hardEvolutionType("fit"),
    ],
  },
  underweight: {
    id: "underweight",
    name: "Underweight",
    description: "BMI below 18.5. You feel skinny and low on energy at times",
    image: {
      male: `${baseURL}/Underweight_male_kq7d1voR-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648864836`,
      female: `${baseURL}/Underweight_female_pXGw9B7s8.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648860557`,
    },
    evolution: [easyEvolutionType("mesomorph"), mediumEvolutionType("fit")],
  },
  fit: {
    id: "fit",
    name: "Fit Body Type",
    description:
      "BMI between 18.5 and 24.9. You are currently physically active and feel fairly fit. You play sports/workout regular",
    image: {
      male: `${baseURL}/Superfit_Man_3jVzdB1Oo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672727628456`,
      female: `${baseURL}/Superfit_Woman_DlgQeRNNF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672727628316`,
    },
    evolution: [],
    workoutNote:
      "Cardio and strength training to build muscle and reduce body fat, combined with a calorie deficit of 1000-1500 calories per day",
  },
  hourglass_shaped: {
    id: "hourglass_shaped",
    name: "Hourglass-shaped Body",
    description: "Balanced weight distribution and a fairly fit physique",
    image: {
      male: `${baseURL}/Hourglass_male_3vVZy7vdqQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648865424`,
      female: `${baseURL}/Hourglass_female_KCbWieApy.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672648861836`,
    },
    evolution: [],
    workoutNote:
      "High-intensity interval training (HIIT) and strength training to build muscle and reduce body fat, combined with a calorie deficit of 500-1000 calories per day",
  },
  mesomorph: {
    id: "mesomorph",
    name: "Mesomorph Body Type",
    description:
      "You have always been naturally muscular and have strong bones. You have gymmed/played sports throughout your life",
    image: {
      male: `${baseURL}/Mesomorph_Man_5xn7obSAT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672727621402`,
      female: `${baseURL}/Mesomorph_Woman_NmmXllQf_B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672727628538`,
    },
    evolution: [easyEvolutionType("fit")],
    workoutNote:
      "Strength training to build muscle mass, combined with a calorie surplus of 500-1000 calories per day",
  },
};

export const CurrentBodyTypeArr: BodyTypesId[] = [
  "apple_shaped",
  "pear_shaped",
  "rectangle_shaped",
  "endomorph",
  "overweight",
  "underweight",
  "mesomorph",
];

export const getEvolutionBodyType = (
  id: BodyTypesId,
  evolutionObj: evolutionType
): EvolutionBodyType => {
  return {
    ...BodyTypeData[id],
    ...evolutionObj,
  };
};
