import { getQueryParamsForProfile } from "@hooks/drawer/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface profileQuery {
    nav?: profileNavTypes;
}

export type profileNavTypes =
    | "activities"
    | "events"
    | "prizes"
    | "teams"
    | "wins";

export type profileQueryKeys = "nav";

export const useProfileParams = () => {
    const router = useRouter();
    const q = router.query as profileQuery;

    const [nav, setNav] = useState<profileNavTypes>("activities");

    useEffect(() => {
        if (router.isReady) {
            setNav(q.nav ? q.nav : "activities");
        }
    }, [router, q]);

    const onNavChange = (newNav: profileNavTypes) => {
        q.nav = newNav;
        router.push(getQueryParamsForProfile(q), undefined, { shallow: true });
    };

    const onGoBack = () => router.back();

    return {
        nav,
        onNavChange,
        onGoBack,
    };
};
