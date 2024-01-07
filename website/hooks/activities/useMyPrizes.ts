import { useEffect, useState } from "react";
import { db } from "config/firebase";
import {
    collection,
    where,
    onSnapshot,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { Prize } from "@models/Prizes/Prize";

export const useMyPrizes = (uid?: string) => {
    const [prizes, setPrizes] = useState<Prize[]>([]);
    const [numToFetch, setToFetch] = useState<number>(6);
    const [nextExists, setNextMembersExist] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (uid) {
            const ref = collection(db, "prizes");
            const q = query(
                ref,
                where("awardedToUID", "==", uid),
                orderBy("priority", "asc"),
                orderBy("rank", "asc"),
                limit(numToFetch)
            );

            const unsubscribe = onSnapshot(q, (docs) => {
                const remotePrizes: Prize[] = [];
                for (const rem of docs.docs) {
                    remotePrizes.push(rem.data() as Prize);
                }

                setNextMembersExist(remotePrizes.length === numToFetch);
                setPrizes(remotePrizes);
                setLoading(false);
            });

            return () => {
                if (unsubscribe) {
                    setPrizes([]);
                    setLoading(true);
                    unsubscribe();
                }
            };
        }
    }, [uid, numToFetch]);

    const onNext = () => {
        // console.log("here");
        setToFetch((prev) => prev + 10);
    };

    return {
        prizes,
        nextExists,
        onNext,
        loading,
    };
};
