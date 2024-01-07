import Loading from "@components/loading/Loading";
import DefaultLayout from "@layouts/DefaultLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ReportPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(
      `https://www.canva.com/design/DAFvLBcDKm8/XTDQzbb3nkP0Pe166VIRuw/view`
    );
  }, [router]);

  return (
    <DefaultLayout
      title={"SocialBoat: How India lives with PCOS"}
      description={
        "A survey of 1190 women in India suffering from PCOS help us understand what is it to live with PCOS and what they are doing to fight it."
      }
      link={`https://socialboat.live/pcos-survey-2023`}
      canonical={`https://socialboat.live/pcos-survey-2023`}
      noIndex={false}
      width={663}
      height={530}
      img={
        "https://ik.imagekit.io/socialboat/preview%20(1)_xqIzBQGtO9.png?updatedAt=1695392722458"
      }
    >
      <div className="fixed inset-0 z-0 bg-[#232136] flex justify-center items-center">
        <Loading fill="#ff735c" width={48} height={48} />
      </div>
    </DefaultLayout>
  );
};

export default ReportPage;
