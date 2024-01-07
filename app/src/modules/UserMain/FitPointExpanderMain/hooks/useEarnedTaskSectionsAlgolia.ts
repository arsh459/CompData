import {
  Activity,
  AlgoliaActivity,
  // fetchTypeSource,
} from "@models/Activity/Activity";
import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
// import { AlgoliaSearchResponse } from "@models/Algolia/Algolia";
// import { actIndex } from "./algolia";
import { format } from "date-fns";
import crashlytics from "@react-native-firebase/crashlytics";

export interface pastActivityInterface {
  id: string;
  taskType: "steps" | "workout" | "nutrition";
  attemptedDate: string;
  name: string;
  fitPoints: number;
  unix: number;
  authorUID: string;
  taskId: string;
}

const mergeSection = (
  previous: SectionTask[],
  newDocs: pastActivityInterface[]
) => {
  let lastDt: string = "";
  if (previous.length) {
    lastDt = previous[previous.length - 1].title;
  }

  const mergedDocs = previous;
  for (const newDoc of newDocs) {
    if (newDoc.attemptedDate === lastDt) {
      mergedDocs[mergedDocs.length - 1].data.push(newDoc);
    } else {
      mergedDocs.push({
        data: [newDoc],
        title: newDoc.attemptedDate,
      });
      lastDt = newDoc.attemptedDate;
      //   mergedDocs.push(newDoc);
    }
  }

  return mergedDocs;
};

const queryProcess = async (
  //   remoteActs: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  remoteActs: (AlgoliaActivity | Activity)[]
) => {
  const earnedObjs: pastActivityInterface[] = [];

  //   let lDoc: FirebaseFirestoreTypes.DocumentData | undefined;
  for (const remoteAct of remoteActs) {
    // const act = remoteAct.data() as Activity;

    if (remoteAct.createdOn) {
      //   const remoteTask = await firestore()
      //     .collection("tasks")
      //     .doc(remoteAct.taskId)
      //     .get();

      //   if (remoteTask.data()) {
      // const tk = remoteTask.data() as Task;

      const earnedFP = Math.round(
        (remoteAct.calories ? remoteAct.calories : 0) / 300
      );

      const newEarnedObj: pastActivityInterface = {
        name: remoteAct.activityName, // tk.name ? tk.name : "",
        //   media:  tk.thumbnails,
        fitPoints: earnedFP,
        unix: remoteAct.createdOn,
        taskId: remoteAct.taskId ? remoteAct.taskId : "",
        //   taskId: tk.id,
        //   progress: remoteAct.calories
        //   totalFP: tk.fitPoints ? tk.fitPoints : 0,
        authorUID: remoteAct.authorUID,
        id: remoteAct.id ? remoteAct.id : remoteAct.postId,
        taskType:
          remoteAct.source === "nutrition"
            ? "nutrition"
            : remoteAct.stepsActive
            ? "steps"
            : "workout",
        attemptedDate: format(new Date(remoteAct.createdOn), "do MMM yy"),
      };

      earnedObjs.push(newEarnedObj);
    }
    // }

    // lDoc = remoteAct;
  }

  return {
    // lDoc,

    earnedObjs,
  };
};

export interface SectionTask {
  title: string;
  data: pastActivityInterface[];
}

const getFireQuery = (uid: string, val?: "task" | "steps" | "nutrition") => {
  let q: FirebaseFirestoreTypes.Query;
  if (val === "task") {
    q = firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("canFetch", "==", true)
      .where("stepsActive", "==", false)
      .orderBy("createdOn", "desc")
      .limit(10);
  } else if (val === "nutrition") {
    q = firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("canFetch", "==", true)
      .where("source", "==", "nutrition")
      .orderBy("createdOn", "desc")
      .limit(10);
  } else if (val === "steps") {
    q = firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("canFetch", "==", true)
      .where("stepsActive", "==", true)
      .orderBy("createdOn", "desc")
      .limit(10);
  } else {
    q = firestore()
      .collection("users")
      .doc(uid)
      .collection("activities")
      .where("canFetch", "==", true)
      .orderBy("createdOn", "desc")
      .limit(10);
  }

  return q;
};

export const useEarnedTasksSectionsAlgolia = (
  uid?: string,
  val?: "task" | "steps" | "nutrition"
) => {
  // const { state } = useAuthContext();
  //   const [earnedTasks, setEarnedTasks] = useState<EarnedTaskInterface[]>([]);
  const [lastDoc, setLastDoc] = useState<
    FirebaseFirestoreTypes.DocumentData | undefined
  >();
  const [init, setInit] = useState<boolean>(false);
  // const [page, updatePage] = useState<number>(0);

  const [sections, setSections] = useState<SectionTask[]>([]);

  useEffect(() => {
    const initialise = async () => {
      if (!init && uid) {
        try {
          //   let remoteActs;

          const qu = getFireQuery(uid, val);
          // console.log("qu", qu);
          const fireResp = await qu.get();

          const remoteActs: Activity[] = [];
          let lastDoc = fireResp.docs.length
            ? fireResp.docs[fireResp.docs.length - 1]
            : undefined;
          for (const doc of fireResp.docs) {
            remoteActs.push(doc.data() as Activity);
          }

          // const response = (await actIndex.search("", {
          //   hitsPerPage: 8,
          //   filters: `authorUID:${state.uid} AND calories > 0 ${
          //     val === "task"
          //       ? "AND source:task AND NOT stepsActive:true"
          //       : val === "nutrition"
          //       ? "AND source:nutrition"
          //       : val === "steps"
          //       ? "AND stepsActive:true"
          //       : ""
          //   }`,
          //   page: page,
          // })) as AlgoliaSearchResponse;

          const { earnedObjs } = await queryProcess(remoteActs);
          setLastDoc(lastDoc);

          setSections((p) => mergeSection(p, earnedObjs));
          //   setEarnedTasks((p) => [...p, ...earnedObjs]);
        } catch (error: any) {
          setInit(true);
          crashlytics().recordError(error);
          console.log(error);
        }
        setTimeout(() => {
          setInit(true);
        }, 500);
      }
    };

    initialise();
  }, [uid, init]);

  const onNext = async () => {
    if (uid && lastDoc) {
      const qu = getFireQuery(uid, val);
      const fireResp = await qu.startAfter(lastDoc).get();

      const remoteActs: Activity[] = [];
      let newLastDoc = fireResp.docs.length
        ? fireResp.docs[fireResp.docs.length - 1]
        : undefined;
      for (const doc of fireResp.docs) {
        remoteActs.push(doc.data() as Activity);
      }

      // const response = (await actIndex.search("", {
      //   hitsPerPage: 8,
      //   filters: `authorUID:${state.uid} AND calories > 0`,
      //   page: page + 1,
      // })) as AlgoliaSearchResponse;

      if (remoteActs) {
        const { earnedObjs } = await queryProcess(remoteActs);

        // setLastDoc(response.hits.length === 5 ? lDoc : undefined);
        // updatePage((p) => p + 1);

        setSections((p) => mergeSection(p, earnedObjs));
        setLastDoc(newLastDoc);
        // setEarnedTasks((p) => [...p, ...earnedObjs]);
      }
    }
  };

  //   for (const earnedTask of earnedTasks || []) {
  //     let sectionTitle = earnedTask.attemptedDate;

  //     sectionTitle =
  //       !sectionTitle && earnedTask.unix
  //         ? format(new Date(earnedTask.unix), "do MMMM yyyy")
  //         : "Undefined";

  //     let section = sections.find((s) => s.title === sectionTitle);

  //     if (!section) {
  //       section = { title: sectionTitle, data: [] };
  //       sections.push(section);
  //     }

  //     section.data.push(earnedTask);
  //   }

  return {
    onNext,
    sections,
    init,
  };
};
