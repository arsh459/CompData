export const AchivementPathHeader = () => {
  return (
    <div className="py-4 mb-8">
      <h2 className="text-white text-2xl" style={{ fontFamily: "Nunito-Bold" }}>
        How will we achieve this?
      </h2>
      <h3
        className="text-white/70 text-base"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Your health coach will customise this plan with you.
      </h3>
    </div>
  );
};

export const ItemSeparatorComponent = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        style={{
          height: 70,
          borderColor: "#F3E8FF",
          borderWidth: 1,
          borderStyle: "dotted",
        }}
      />
    </div>
  );
};
