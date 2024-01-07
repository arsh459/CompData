import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
    doc,
    onSnapshot,
    collection,
    query,
    orderBy,
    startAt,
    endAt,
} from "firebase/firestore";
import { Activity } from "@models/Activities/Activity";

export interface monthlyGraphData {
    points: number;
    dayMili: number;
}

export const useActivitesCurrentMonth = (uid?: string) => {
    const [data, setData] = useState<monthlyGraphData[]>([]);

    useEffect(() => {
        if (uid) {
            try {
                const toDate = new Date();
                toDate.setDate(toDate.getDate() - 1);
                const fromDate = new Date();
                fromDate.setHours(0, 0, 0, 0);
                fromDate.setDate(fromDate.getDate() - 30);
                const q = query(
                    collection(doc(db, "users", uid), "activities"),
                    orderBy("createdOn"),
                    startAt(fromDate.getTime()),
                    endAt(toDate.getTime())
                );
                const unsubscribe = onSnapshot(q, (docs) => {
                    const remoteMonthData: monthlyGraphData[] = [];
                    const monthData: { [day: string]: number } = {};

                    let prevDay = "";
                    let prevPoints = 0;

                    for (const doc of docs.docs) {
                        // type case doc.data as Activity
                        const act = doc.data() as Activity;

                        // use activity here
                        if (act.createdOn) {
                            const day = new Date(
                                act.createdOn
                            ).toLocaleDateString("default", {
                                day: "numeric",
                            });

                            let points = 0;
                            if (act.fitPointsV2) {
                                points = act.fitPointsV2;
                            } else if (act.calories) {
                                // 300 calories = 1 fp
                                points = Math.floor(act.calories / 300);
                            }

                            // Handling multiple activities in a day
                            if (prevDay === day) {
                                prevPoints += points;
                            } else {
                                if (prevDay !== "") {
                                    monthData[prevDay] = prevPoints;
                                }
                                prevDay = day;
                                prevPoints = points;
                            }
                        }
                    }
                    if (prevDay !== "") {
                        monthData[prevDay] = prevPoints;
                    }

                    for (
                        let dateObj = fromDate;
                        dateObj < toDate;
                        dateObj.setDate(dateObj.getDate() + 1)
                    ) {
                        const day = dateObj.toLocaleDateString("default", {
                            day: "numeric",
                        });
                        const points = day in monthData ? monthData[day] : 0;
                        const dayMili = dateObj.getTime();
                        remoteMonthData.push({ points, dayMili });
                    }

                    setData(remoteMonthData);
                });

                return () => {
                    unsubscribe();
                    setData([]);
                };
            } catch (error) {
                console.log("error", error);
            }
        }
    }, [uid]);

    // console.log(data);

    return { data };
};
