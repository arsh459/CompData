import React from "react";

//local

import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import { GetStaticPaths, GetStaticProps } from "next";
import DayDashboard from "@templates/AdminDashboard/SlotDashboard/DayDashboard";
import { dayTypes } from "@models/slots/Slot";

interface Props {
  day: dayTypes;
}

const SlotDayPage: React.FC<Props> = ({ day }) => {
  //   console.log("leaders", leaders);

  const { user, authStatus } = useAuth();
  // console.log("user", user?.uid, authStatus);

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/slots/${day}`}
      canonical={`https://${homeDomain}/admin/slots/${day}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && (user.judge || user.role === "admin") ? (
        <DayDashboard day={day} />
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default SlotDayPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { day: "Monday" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const day = params ? params.day : "";

  if (day) {
    return {
      props: {
        day: day,
      },
    };
  }

  return {
    redirect: {
      destination: "/admin/slots",
      permanent: false,
      // statusCode: 301
    },
  };
};
