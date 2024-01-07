import { MyPurchase } from "../../../models/MyPurchase/MyPurchase";
import { UserInterface } from "../../../models/User/User";

export const getPurchaseParams = (
  user: UserInterface,
  purchase: MyPurchase,
): string[] => {
  return [
    user.name ? `${user.name.trim()}` : "there",
    purchase.name ? `${purchase.name.trim()}` : "SocialBoat shop product",
    purchase.value ? `${purchase.value} FP` : `your FPs`,
  ];
};
