import { sessionTypes } from "@models/Event/Event";

interface sessionButtonType {
  text: string;
  key: sessionTypes;
  icon: string;
  selectedIcon: string;
}

export const imageButton = {
  text: "media",
  key: "",
  icon: "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-image-interface-kiranshastry-lineal-kiranshastry.png",
  selectedIcon:
    "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-image-interface-kiranshastry-lineal-kiranshastry.png",
};

export const postButtons: sessionButtonType[] = [
  // {
  //   text: "Live",
  //   key: "live",
  //   selectedIcon:
  //     "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-live-radio-vitaliy-gorbachev-flat-vitaly-gorbachev.png",
  //   icon: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-live-radio-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
  // },
  // {
  //   text: "Task",
  //   key: "activity",
  //   selectedIcon:
  //     "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-arm-muscle-health-vitaliy-gorbachev-blue-vitaly-gorbachev.png",
  //   icon: "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-arm-muscle-health-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
  // },
  {
    text: "Write a Post",
    key: "post",
    selectedIcon: "https://img.icons8.com/ios-filled/192/000000/edit--v1.png",
    icon: "https://img.icons8.com/material-outlined/192/000000/edit--v1.png",
  },
];
