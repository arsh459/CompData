import ListFeatures from "./ListFeatures";
import { exerciseLogo, nutriLogo } from "@constants/imageKitURL";

const FeaturesList = () => {
  return (
    <>
      <ListFeatures
        startColor="#318CF7"
        endColor="#1E4CF6"
        imgUrl={exerciseLogo}
        text={`Follow your curated workout plan added to your 'MY WORKOUT' section.`}
      />
      <ListFeatures
        startColor="#F1BA30"
        endColor="#FF6E1D"
        imgUrl={nutriLogo}
        text="You will have to be in caloric Deficit. You can get on a free consultation call on the ‘My Nutrition’ plan section."
      />
    </>
  );
};

export default FeaturesList;
