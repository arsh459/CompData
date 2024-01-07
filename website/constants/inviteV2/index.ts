import { kirstenSteps, stepType } from "./steps";
import { kirstenTitle } from "./titles";
import { kirstenWhatYouGet, whatYouGetType } from "./whatYouGet";

export type dataTypes = {
  name: string;
  title: React.ReactNode;
  subtitle: string;
  teamId: string;
  youtubeId: string;
  challengeDesc: string;
  steps: stepType[];
  whatYouGet: whatYouGetType[];
  noPayment: boolean;
  noSlot: boolean;
};

const kirsten: dataTypes = {
  name: "kirsten",
  teamId: "cce3cade-9df7-4acb-8bc7-bf28b500d68e",
  noPayment: true,
  noSlot: true,
  title: kirstenTitle,
  subtitle:
    "Join the Next Level Fitness Challenge .Improve your heart health and athletic performance with this 7 day challenge",
  youtubeId: "hiBT231ayP0",
  challengeDesc:
    "This challenge offers a full body workout, builds muscle power and strength, improves athletic performance, increases bone density, benefits heart health, and burns fat. Join us and push yourself to reach new goals. You can use a jump rope, air rope or a ropeless jump rope.",
  steps: kirstenSteps,
  whatYouGet: kirstenWhatYouGet,
};

export const inviteV2Coachs: { [key: string]: dataTypes } = {
  kirsten,
};
