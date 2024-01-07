import React from "react";
// import { nameOfPerson, course, toStartIn, instructorName } from "./constants";

interface Props {}
const InstaProfile: React.FC<Props> = ({}) => {
  return (
    <div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/holidaying-prod.appspot.com/o/tmpFolder%2FIMG_BC1538324AE7-1.jpeg?alt=media&token=382375fa-549e-40d8-b882-bf48f5b42ce0"
        className="object-cover w-full"
        alt="img"
      />
    </div>
  );
};

export default InstaProfile;
