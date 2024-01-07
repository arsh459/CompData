export const listinMenuItems = [
  "Goal",
  "Who is it for?",
  "Instructor",
  "Testimonials",
  "FAQ",
];

export const getAnchorLink = (el: string) => {
  if (el === "Goal" || el === "Prizes") {
    return "#goal";
  } else if (el === "Program") {
    return "#program";
  } else if (el === "Join") {
    return "#brief";
  } else if (el === "Who is it for?") {
    return "#whoIsItFor";
  } else if (el === "Instructor") {
    return "#instructor";
  } else if (el === "Testimonials") {
    return "#testimonials";
  } else if (el === "Participate") {
    return "#participate";
  } else if (el === "How it works") {
    return "#howItWorks";
  } else {
    return "#faq";
  }
};
