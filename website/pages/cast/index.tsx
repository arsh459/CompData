import Loading from "@components/loading/Loading";
import { useNewCast } from "@hooks/cast/useNewCast";
import { useEffect, useState } from "react";
import QRCode from "@modules/Cast/QRCode";
import Stream from "@modules/Cast/Stream";
import Welcome from "@modules/Cast/Welcome";
import { useRTConnection } from "@hooks/cast/useRTConnection";
import DefaultLayout from "@layouts/DefaultLayout";
import { seoData } from "@constants/seoData";
import { rectWomenImg } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import UserAuthTemplate from "@templates/UserAuthTemplate";
import { usePaidStatus } from "@hooks/paidStatus/usePaidStatus";
import AccessModal from "@modules/AccessModal/AccessModal";
import CourseHeader from "@templates/WomenTemplate/components/V2/CourseHeader";

const Cast = () => {
  const { cast, loading } = useNewCast();
  const { authStatus, signOut, uid, user } = useAuth();
  // console.log("cast", cast);
  useRTConnection(cast?.id);
  const { status } = usePaidStatus(uid);
  const [height, setheight] = useState<number>(0);

  // console.log("rtState", rtState);

  useEffect(() => {
    setheight(window.innerHeight);
  }, []);

  // console.log("cast", cast);

  // return <Stream cast={cast} screenHeight={height} />;

  return (
    <DefaultLayout
      title={seoData.castPage.title}
      description={seoData.castPage.description}
      link={seoData.castPage.link}
      canonical={seoData.castPage.link}
      img={seoData.castPage.img}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {status === "INACTIVE" && authStatus === "SUCCESS" ? (
        <AccessModal signOut={signOut} />
      ) : authStatus === "FAILED" ? (
        <UserAuthTemplate deviceType="android" setDeviceType={() => {}} />
      ) : (
        <>
          <div className="w-screen h-screen bg-[#100F1A] relative">
            {loading || !user ? (
              <div className="w-full h-full flex justify-center items-center">
                <Loading fill="#ff735c" width={50} height={50} />
              </div>
            ) : cast ? (
              <>
                {cast.state === "scanned" &&
                cast.appStatus === "LIVE" &&
                cast.webStatus === "LIVE" ? (
                  <Welcome
                    castId={cast.id}
                    userId={cast.userUID}
                    size={Math.min(height / 3, 500)}
                  />
                ) : cast.state === "welcomed" &&
                  cast.appStatus === "LIVE" &&
                  cast.appStatus === "LIVE" ? (
                  <Stream cast={cast} screenHeight={height} />
                ) : cast.state === "created" && user ? (
                  <>
                    <CourseHeader userObj={user} onSignOut={signOut} />
                    <QRCode castId={cast.id} size={Math.min(height / 3, 500)} />
                  </>
                ) : cast.state === "scanned" &&
                  cast.appStatus === "SETTING_UP" ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <p
                      className="text-white text-center text-3xl"
                      style={{ fontFamily: "BaiJamjuree-Bold" }}
                    >
                      Please give required
                      <br />
                      permissions on the app
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <p
                      className="text-white text-center text-3xl"
                      style={{ fontFamily: "BaiJamjuree-Bold" }}
                    >
                      There is a problum
                      <br />
                      Re open the app
                    </p>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default Cast;
