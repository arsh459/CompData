import React from "react";

const LockOverlay = () => {
  return (
    <div
      className="absolute inset-0 z-10 rounded-full flex items-center border-2 border-[#404040] justify-center"
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #D7D7D7 0%, #6D6D6D 100%)`,
      }}
    >
      <img
        src="https://ik.imagekit.io/socialboat/Vector_hE3JHtdri.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1656421704882"
        alt=""
      />
    </div>
  );
};

export default LockOverlay;
