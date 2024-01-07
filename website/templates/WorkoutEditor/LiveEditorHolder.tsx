import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import Loading from "@components/loading/Loading";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getQueryParamsForLive,
  //   getQueryParamsForWorkout,
} from "@hooks/drawer/utils";
// import { useSeriesWorkout } from "@hooks/workouts/useSeriesWorkout";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getNextLiveRoute } from "./utils";
// import WorkoutEditor from "./WorkoutEditor";
// import { useWorkoutSeries } from "@hooks/workouts/useWorkoutSeries";
import { useCurrentSeries } from "@hooks/workouts/useCurrentSeries";
// import NutritionEditor from "./NutritionEditor";
// import { useSeriesNutrition } from "@hooks/workouts/useSeriesNutrition";
import { useSeriesLive } from "@hooks/workouts/useSeriesLive";
import LiveEditor from "./LiveEditor";
import WhatsAppButton from "@templates/listing/WhatsappButton/WhatsAppButton";

interface Props {}

export interface liveEditorQuery {
  section?: liveEditorKeys;
  id?: string;
  seriesId?: string;
  day?: string;
  communityKey?: string;
}

export type workoutEditorQueryKeys = "section" | "id" | "seriesId";

export type liveEditorKeys =
  | "name"
  | "description"
  | "media"
  | "isFree"
  // | "day"
  | "link"
  | "calories"
  // | "days"
  | "duration"
  | "slots"
  | "days"
  | "liveKey";

const LiveEditorHolder: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as liveEditorQuery;

  const [currentSection, setForm] = useState<liveEditorKeys>("name");
  const [liveId, setLiveId] = useState<string>("");
  const [seriesId, setSeriesId] = useState<string>("");
  // const [initDay, setInitDay] = useState<number>(0);
  const [communityKey, setCommunityKey] = useState<string>("");

  useEffect(() => {
    if (router.isReady && !q.section && !q.id && !q.seriesId) {
      q.section = "name";

      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    } else {
      setForm(q.section ? q.section : "name");
      setLiveId(q.id ? q.id : "");
      setSeriesId(q.seriesId ? q.seriesId : "");
      // setInitDay(q.day ? Number.parseInt(q.day) : 0);
      setCommunityKey(q.communityKey ? q.communityKey : "");
    }
  }, [router, q]);

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const { live } = useSeriesLive(seriesId, liveId);
  const { currentSeries } = useCurrentSeries(seriesId);

  const onBack = () => {
    router.back();
  };

  const onNext = (
    cur: liveEditorKeys,
    value:
      | string
      // | CloudinaryMedia
      | undefined
      | boolean
      | number
      | string[]
      | number[],
    media?: CloudinaryMedia
  ) => {
    if (cur === "days" && typeof value === "object" && value.length > 0) {
      const { nextRoute } = getNextLiveRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    } else if (cur === "slots" && typeof value === "object") {
      const { nextRoute } = getNextLiveRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    } else if (
      (cur === "calories" ||
        cur === "liveKey" ||
        cur === "duration" ||
        cur === "description" ||
        cur === "link" ||
        cur === "name") &&
      value
    ) {
      const { nextRoute } = getNextLiveRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    } else if (cur === "isFree") {
      const { nextRoute } = getNextLiveRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    } else if (cur === "media" && media) {
      const { nextRoute } = getNextLiveRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForLive(q), undefined, {
        shallow: true,
      });
    }
  };

  const onNavOut = () => {
    if (communityKey) {
      router.push(`/${communityKey}`);
    } else {
      router.push(`/createSeries?seriesId=${seriesId}&section=home&mode=edit`);
    }
  };

  return (
    <div className="w-full h-full relative">
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : authStatus === "FAILED" ? (
        <div className="flex justify-center items-center h-full w-full">
          <AuthForm
            user={user}
            //   brandName="Soc"
            recaptcha={recaptcha}
          />
        </div>
      ) : seriesId && user ? (
        <LiveEditor
          selectedLive={live}
          uid={user.uid}
          selectedFormValue={currentSection}
          seriesId={seriesId}
          seriesKey={currentSeries?.seriesKey}
          onBack={onBack}
          // initDay={initDay}
          onNavOut={onNavOut}
          onNext={onNext}
        />
      ) : null}

      <div></div>
      <div className="absolute bottom-8 right-4">
        <WhatsAppButton />
      </div>

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </div>
  );
};

export default LiveEditorHolder;
