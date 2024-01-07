import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import Loading from "@components/loading/Loading";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQueryParamsForWorkout } from "@hooks/drawer/utils";
import { useSeriesWorkout } from "@hooks/workouts/useSeriesWorkout";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { getNextWorkoutRoute } from "./utils";
import WorkoutEditor from "./WorkoutEditor";
// import { useWorkoutSeries } from "@hooks/workouts/useWorkoutSeries";
import { useCurrentSeries } from "@hooks/workouts/useCurrentSeries";
import WhatsAppButton from "@templates/listing/WhatsappButton/WhatsAppButton";

interface Props {}

export interface workoutEditorQuery {
  section?: workoutEditorKeys;
  id?: string;
  seriesId?: string;
  day?: string;
  communityKey?: string;
}

export type workoutEditorQueryKeys = "section" | "id" | "seriesId";

export type workoutEditorKeys =
  | "name"
  | "description"
  | "media"
  | "isFree"
  | "day"
  | "calories"
  | "equipmentNeeded"
  | "videoKey";

const WorkoutEditorHolder: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as workoutEditorQuery;

  const [currentSection, setForm] = useState<workoutEditorKeys>("name");
  const [workoutId, setWorkoutId] = useState<string>("");
  const [seriesId, setSeriesId] = useState<string>("");
  const [initDay, setInitDay] = useState<number>(0);
  const [communityKey, setCommunityKey] = useState<string>("");

  useEffect(() => {
    if (router.isReady && !q.section && !q.id && !q.seriesId) {
      q.section = "name";

      router.push(getQueryParamsForWorkout(q), undefined, {
        shallow: true,
      });
    } else {
      setForm(q.section ? q.section : "name");
      setWorkoutId(q.id ? q.id : "");
      setSeriesId(q.seriesId ? q.seriesId : "");
      setInitDay(q.day ? Number.parseInt(q.day) : 0);
      setCommunityKey(q.communityKey ? q.communityKey : "");
    }
  }, [router, q]);

  const { user, hideRecapcha, authStatus } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const { workout } = useSeriesWorkout(seriesId, workoutId);
  const { currentSeries } = useCurrentSeries(seriesId);

  const onBack = () => {
    router.back();
  };

  // console.log("seriesId", seriesId);

  const onNext = (
    cur: workoutEditorKeys,
    value: string | CloudinaryMedia | undefined | boolean | number
  ) => {
    if (value || typeof value === "boolean" || typeof value === "number") {
      const { nextRoute } = getNextWorkoutRoute(cur);
      q.section = nextRoute;
      router.push(getQueryParamsForWorkout(q), undefined, {
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
        <WorkoutEditor
          selectedWorkout={workout}
          selectedFormValue={currentSection}
          seriesId={seriesId}
          seriesKey={currentSeries?.seriesKey}
          onBack={onBack}
          onNavOut={onNavOut}
          initDay={initDay}
          uid={user.uid}
          onNext={onNext}
        />
      ) : null}

      <div className="absolute bottom-8 right-4">
        <WhatsAppButton />
      </div>

      <div></div>
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </div>
  );
};

export default WorkoutEditorHolder;
