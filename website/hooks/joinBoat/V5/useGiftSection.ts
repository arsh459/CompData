import { getQueryParamsForGift } from "@hooks/drawer/utils";
import { createGift, saveGift } from "@models/Gift/createUtils";
import { Gift } from "@models/Gift/Gift";
// import { addUserToTeam, getTeam } from "@models/User/createUtils";
import {
  updateUserBriefFields,
  updateUserEmail,
  updateUserPhoneValue,
} from "@models/User/updateUtils";
import { UserInterface } from "@models/User/User";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type gSectionTypes =
  | "explainer"
  | "loading"
  | "plans"
  | "details"
  | "name"
  | "message"
  | "phone";

export interface giftQuery {
  section?: gSectionTypes;
  device?: "ios" | "android";
}

export type giftQueryKeys = "section" | "device";

export const useGiftSection = (user?: UserInterface) => {
  const router = useRouter();
  const [sec, setSec] = useState<gSectionTypes>("explainer");
  const q = router.query as giftQuery;
  const [localGift, setLocalGift] = useState<Gift>();
  //   const { teamName, setTeamName, onTeamCreate, dbTeamId } = useTeamCreate(user);
  //   const [organization, setOrganization] = useState<orgTypes>(socialboat);
  useEffect(() => {
    if (router.isReady && q.section) {
      setSec(q.section);
    } else if (router.isReady && !q.section) {
      setSec("explainer");
    }
  }, [q, router]);

  const gotoSection = (sec: gSectionTypes) => {
    q.section = sec;
    router.push(getQueryParamsForGift(q), undefined, { shallow: true });
  };

  const selectPlans = async () => {
    q.section = "plans";
    router.push(getQueryParamsForGift(q), undefined, { shallow: true });
  };

  const onNameSave = async (name?: string) => {
    if (user?.uid) {
      await updateUserBriefFields(user?.uid, name);
    }

    if (!user?.phone) {
      q.section = "phone";
    } else {
      q.section = "details";
    }

    router.push(getQueryParamsForGift(q), undefined, { shallow: true });
  };

  // Phone number Update
  const onUserPhoneUpdate = async (phone?: string) => {
    if (user && phone) {
      await updateUserPhoneValue(user.uid, phone);
      q.section = "details";
      router.push(getQueryParamsForGift(q), undefined, { shallow: true });
    }
  };

  // Team creation flow dtails update
  const onGiftCreate = async (email: string) => {
    if (user?.uid) {
      await updateUserEmail(user.uid, email);

      const giftObj = createGift(
        user.name ? user.name : "no name",
        user.uid,
        email
      );

      setLocalGift(giftObj);
      await saveGift(giftObj);
      q.section = "plans";
      router.push(getQueryParamsForGift(q), undefined, { shallow: true });
    }
  };

  const onGiftUpdate = (key: "toName" | "message", value: string) => {
    setLocalGift((p) => {
      if (p)
        return {
          ...p,
          [key]: value,
        };
    });
  };

  return {
    section: sec,
    selectPlans,
    gotoSection,
    onNameSave,
    onGiftCreate,
    onUserPhoneUpdate,
    localGift,
    onGiftUpdate,
  };
};
