import NutritionSettingMain from "@modules/NutritionSettingMain";
import Header from "@modules/Header";

const NutritionSettingScreen = () => {
  return (
    <>
      <Header
        back={true}
        tone={"dark"}
        headerColor="#232136"
        title="My Medical Record"
        centerTitle={true}
      />

      <NutritionSettingMain />
    </>
  );
};

export default NutritionSettingScreen;
