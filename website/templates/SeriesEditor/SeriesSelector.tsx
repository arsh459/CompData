import { useAuth } from "@hooks/auth/useAuth";
import { useWorkoutSeries } from "@hooks/workouts/useWorkoutSeries";
import { useEffect, useState } from "react";
import Loading from "@components/loading/Loading";
import AuthForm from "@templates/editEvent/ProfileEditor/AuthForm";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import SeriesHolder from "./SeriesHolder";
import { useRouter } from "next/router";
import { WorkoutSeries } from "@models/Workouts/Series";
import SeriesEditor from "./SeriesEditor";
import { getNextSeriesRoute } from "./utils";
import { getQueryParamsForOnboard } from "@hooks/drawer/utils";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { deleteSeries } from "@models/Workouts/createUtils";

interface Props {}

export interface editorQuery {
  section?: seriesEditorKeys;
  mode?: "edit" | "new" | "unknown";
  seriesId?: string;
  communityKey?: string;
  // day?: number;
  //   eventId?: string;
  // leaderKey?: string;
  //   action?: "copyEvent";
}

export type seriesEditorKeys =
  | "selector"
  | "name"
  | "description"
  | "seriesKey"
  | "seriesThumbnail"
  | "equipmentNeeded"
  | "workoutGoal"
  | "intensity"
  | "goodFor"
  | "home"
  | "cost";

const SeriesSelector: React.FC<Props> = ({}) => {
  const router = useRouter();
  const q = router.query as editorQuery;
  //   const q = router.query as editorQuery;

  const [selectedFormValue, setForm] = useState<seriesEditorKeys>("name");
  const [mode, setMode] = useState<"edit" | "new" | "unknown">("unknown");
  const [seriesId, setSeriesId] = useState<string>("");
  const [communityKey, setCommunityKey] = useState<string>("");
  // const [initDay, setInitDay] = useState<number>(0);

  useEffect(() => {
    if (router.isReady && !q.mode && !q.section && !q.seriesId) {
      q.section = "selector";
      q.mode = "unknown";
      router.push(getQueryParamsForOnboard(q), undefined, {
        shallow: true,
      });
    } else {
      setMode(q.mode ? q.mode : "unknown");
      setForm(q.section ? q.section : "selector");
      setSeriesId(q.seriesId ? q.seriesId : "");
      setCommunityKey(q.communityKey ? q.communityKey : "");
      // setInitDay(q.day ? q.day : 0);
    }
  }, [router, q]);

  const [loading, setLoading] = useState<boolean>(false);
  const { user, hideRecapcha, authStatus } = useAuth();

  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  const { series, selectedSeries } = useWorkoutSeries(user?.uid, seriesId);

  // console.log("seriesId", seriesId, series, selectedSeries);

  const onEditSeries = (newSeries?: WorkoutSeries) => {
    // setForm("name");
    // setSelectedSeries(newSeries);

    q.section = "name";
    q.mode = newSeries ? "edit" : "new";
    q.seriesId = newSeries?.id ? newSeries.id : "";
    router.push(getQueryParamsForOnboard(q), undefined, {
      shallow: true,
    });
  };

  const navToSelector = () => {
    q.section = "selector";
    router.push(getQueryParamsForOnboard(q), undefined, {
      shallow: true,
    });
  };

  const onDeleteSeries = async (newSeries: WorkoutSeries) => {
    await deleteSeries(newSeries.id);
    // setForm("selector");
    // setMode("unknown");

    // q.section = "selector";
    // q.mode = "unknown";
    // router.push(getQueryParamsForOnboard(q), undefined, {
    //   shallow: true,
    // });
  };

  const onBack = () => {
    router.back();
  };

  const onNext = (
    cur: seriesEditorKeys,
    value: string | CloudinaryMedia | undefined | number
  ) => {
    if (value || typeof value === "number") {
      const { nextRoute } = getNextSeriesRoute(cur);

      if (communityKey && nextRoute === "home") {
        setLoading(true);
        router.push(`/${communityKey}`);
      } else {
        q.section = nextRoute;
        router.push(getQueryParamsForOnboard(q), undefined, {
          shallow: true,
        });
      }
    }
  };

  // console.log("mode", mode);
  return (
    <div className="w-full h-full">
      {loading || authStatus === "PENDING" ? (
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
      ) : selectedFormValue === "selector" ? (
        <div className="p-4 py-8">
          <SeriesHolder
            series={series}
            onEdit={onEditSeries}
            onDelete={onDeleteSeries}
          />
        </div>
      ) : mode !== "unknown" && user ? (
        <div className="flex justify-center items-center h-full w-full">
          <SeriesEditor
            selectedFormValue={selectedFormValue}
            navToSelector={navToSelector}
            onEditSeries={onEditSeries}
            selectedSeries={selectedSeries}
            uid={user.uid}
            onBack={onBack}
            onNext={onNext}
            mode={mode}
          />
        </div>
      ) : null}

      <div></div>

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </div>
  );
};

export default SeriesSelector;
