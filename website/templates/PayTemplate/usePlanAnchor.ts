import { useDeviceStoreDateInit } from "@analytics/webengage/fb/hooks/useDeviceStoreInit";
import { createFBRequest } from "@analytics/webengage/fb/main";
import { useDeviceStore } from "@analytics/webengage/fb/store";
import { weEventTrack } from "@analytics/webengage/user/userLog";
import {
  fiveThousandUpSB,
  fortyFiveHundredSB,
  fortyFiveHundredSBAnnual,
  // foundThousandSB,
  fourThousandUpSB,
  oneThousandUpSB,
  // onlyYoga,
  sevenThousandUpSBPro,
  seventyEightSBPlus,
  sixThousandUpSB,
  sixThousandUpSBPlus,
  threeMonthPlan,
  twoThousandUpSB,
} from "@constants/socialboatOrg/sbPlansConstants";
import { subscriptionRequestV3 } from "@hooks/joinBoat/payUtils";
import { SbPlans } from "@models/SbPlans/interface";
import { UserInterface } from "@models/User/User";
import { currency } from "@templates/OurPlans/Plan";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

interface couponInterface {
  code: string;
  discount: number;
  minAmount: number;
  minUSDAmount: number;
}

const specialplans: { [id: string]: SbPlans } = {
  nineMonthUpgrade: fourThousandUpSB,
  fortyFiveHundred: fortyFiveHundredSB,
  fortyFiveHundredSBAnnual: fortyFiveHundredSBAnnual,
  fiveThousandUp: fiveThousandUpSB,
  // onlyYoga: onlyYoga,
  // fourThousandUpSB: foundThousandSB,
  seventyEightPlus: seventyEightSBPlus,
  sixThousandUpPlus: sixThousandUpSBPlus,
  threeMonth: threeMonthPlan,
  sixThousandUp: sixThousandUpSB,
  twoThousandUp: twoThousandUpSB,
  sevenThousandUp: sevenThousandUpSBPro,
  oneThousandUp: oneThousandUpSB,
};

const coupons: { [key: string]: couponInterface } = {
  // LIVE20: {
  //   code: "LIVE20",
  //   discount: 0.2,
  //   minAmount: 9000,
  //   minUSDAmount: 108,
  // },
  // live20: {
  //   code: "live20",
  //   discount: 0.2,
  //   minAmount: 9000,
  //   minUSDAmount: 108,
  // },
  // live10: {
  //   code: "live10",
  //   discount: 0.1,
  //   minAmount: 5000,
  //   minUSDAmount: 60,
  // },
  // NAVRATRA: {
  //   code: "NAVRATRA",
  //   discount: 0.2,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },

  // navratra: {
  //   code: "navratra",
  //   discount: 0.2,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },

  nisha10: {
    code: "nisha10",
    discount: 0.1,
    minAmount: 5000,
    minUSDAmount: 60,
  },
  NISHA10: {
    code: "NISHA10",
    discount: 0.1,
    minAmount: 5000,
    minUSDAmount: 60,
  },
  nisha20: {
    code: "nisha20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  NISHA20: {
    code: "NISHA20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  chetna20: {
    code: "chetna20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  CHETNA20: {
    code: "CHETNA20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  soumya20: {
    code: "soumya20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  SOUMYA20: {
    code: "SOUMYA20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  pcos20: {
    code: "pcos20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  PCOS20: {
    code: "PCOS20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  // pcos25: {
  //   code: "pcos25",
  //   discount: 0.25,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },
  // PCOS25: {
  //   code: "PCOS25",
  //   discount: 0.25,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },

  jelly20: {
    code: "jelly20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  JELLY20: {
    code: "JELLY20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  vanshika20: {
    code: "vanshika20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  VANSHIKA20: {
    code: "VANSHIKA20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  jelly25: {
    code: "jelly25",
    discount: 0.25,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  JELLY25: {
    code: "JELLY25",
    discount: 0.25,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  sb30: {
    code: "sb30",
    discount: 0.3,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  SB30: {
    code: "SB30",
    discount: 0.3,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  saurav20: {
    code: "saurav20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  SAURAV20: {
    code: "SAURAV20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  muskan20: {
    code: "muskan20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  MUSKAN20: {
    code: "MUSKAN20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  harita20: {
    code: "harita20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  HARITA20: {
    code: "HARITA20",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  flash25: {
    code: "flash25",
    discount: 0.25,
    minAmount: 4500,
    minUSDAmount: 55,
  },
  FLASH25: {
    code: "FLASH25",
    discount: 0.2,
    minAmount: 4500,
    minUSDAmount: 55,
  },

  // PAYDAY1000: {
  //   code: "PAYDAY1000",
  //   discount: 0.111,
  //   minAmount: 8000,
  //   minUSDAmount: 98,
  // },
  // payday1000: {
  //   code: "payday1000",
  //   discount: 0.111,
  //   minAmount: 8000,
  //   minUSDAmount: 98,
  // },
  // FREEDOM: {
  //   code: "FREEDOM",
  //   discount: 0.25,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },
  // freedom: {
  //   code: "FREEDOM",
  //   discount: 0.25,
  //   minAmount: 4500,
  //   minUSDAmount: 55,
  // },
};

export type priceType = {
  [key in currency]: { price: number; dicountedPrice: number };
};

const getSelectedPlan = (
  plans: SbPlans[],
  durationInDays: number,
  id?: string,

  splUID?: string
): SbPlans => {
  if (id) {
    const filtered = plans.filter((item) => item.id === id);
    if (filtered.length) {
      return filtered[0];
    }
  }

  if (splUID && specialplans[splUID]) {
    return specialplans[splUID];
  }

  if (durationInDays) {
    const selctedPlan = plans.filter(
      (each) => each.durationInDays === durationInDays
    );
    if (selctedPlan.length) {
      return selctedPlan[0];
    }
  }

  return plans[0];
};

const getDiscountPrice = (selectedPlan: SbPlans, discountPercent: number) => {
  return {
    INR: {
      price: parseFloat(selectedPlan.cost.toFixed(2)),
      dicountedPrice: parseFloat(
        (selectedPlan.cost * (1 - discountPercent)).toFixed(2)
      ),
    },
    USD: {
      price: parseFloat(selectedPlan.usdCost.toFixed(2)),
      dicountedPrice: parseFloat(
        (selectedPlan.usdCost * (1 - discountPercent)).toFixed(2)
      ),
    },
  };
};

export type CouponStatusType =
  | "none"
  | "invalid"
  | "valid"
  | "increasePlanValue";

export const usePlanAnchor = (
  user: UserInterface,
  durationInDays: number,
  currency: currency,
  onSuccess: () => void,
  plans: SbPlans[],
  splUID?: string,
  id?: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const [selectedPlan, setSelectedPlan] = useState<SbPlans>(
    getSelectedPlan(plans, durationInDays, id, splUID)
  );

  // console.log("id", selectedPlan.appSubId);

  const [coupon, setCoupon] = useState<couponInterface>();
  const [couponStatus, setCouponStatus] = useState<CouponStatusType>("none");

  const handleApplyCode = (value: number, code: string) => {
    const couponObj = coupons[code];

    if (!couponObj) {
      setCouponStatus("invalid");
      return;
    }

    if (currency === "INR" && value < couponObj.minAmount) {
      setCouponStatus("increasePlanValue");
      return;
    } else if (currency === "USD" && value < couponObj.minUSDAmount) {
      setCouponStatus("increasePlanValue");
      return;
    }

    setCouponStatus("valid");
    setCoupon(couponObj);

    // if (code) {
    //   setCoupon(coupons[code]);
    //   if (code === "remove") {
    //     setCouponStatus("none");
    //   } else if (coupons.hasOwnProperty(code)) {
    //     setCouponStatus("valid");
    //   } else {
    //     setCouponStatus("invalid");
    //   }
    // }
  };

  const removeCode = () => {
    setCoupon(undefined);
    setCouponStatus("none");
  };

  const [price, setPrice] = useState<priceType>({
    INR: { price: selectedPlan.cost, dicountedPrice: selectedPlan.cost },
    USD: { price: selectedPlan.usdCost, dicountedPrice: selectedPlan.usdCost },
  });

  useDeviceStoreDateInit();
  const { deviceData } = useDeviceStore(
    (state) => ({ deviceData: state.data }),
    shallow
  );

  useEffect(() => {
    setPrice(getDiscountPrice(selectedPlan, coupon?.discount || 0));
  }, [coupon, selectedPlan]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (plan: SbPlans) => {
    setSelectedPlan(plan);
    setAnchorEl(null);
  };

  const onPay = async () => {
    setLoading(true);

    const onSubscribeCallback = async () => {
      if (selectedPlan.cost) {
        weEventTrack("conv_paid", {
          value: selectedPlan.cost,
          currency: currency,
          name: selectedPlan.name ? selectedPlan.name : "Plan",
          product_id: `${selectedPlan.durationInDays} days`,
          store: "web",
        });
      }

      weEventTrack("paywallSuccess_noClick", {});
      weEventTrack("paymentDone", {});

      createFBRequest(
        "Purchase",
        user.uid,
        `${format(new Date(), "yyyy-MM-dd")}`,
        deviceData,
        undefined,
        currency === "INR" ? selectedPlan.cost : selectedPlan.usdBaseCost,
        currency
      );

      onSuccess();
    };

    try {
      if (selectedPlan.durationInDays) {
        await subscriptionRequestV3(
          selectedPlan.appSubId,
          user.uid,
          user.email ? user.email : "",
          user.phone ? user.phone : "",
          currency,
          price[currency].dicountedPrice,
          selectedPlan.durationInDays,
          user.name ? user.name : "no name",
          [],
          selectedPlan.id,
          onSubscribeCallback,
          () => {},
          ""
        );

        // fb event for initiate checkout
        createFBRequest(
          "InitiateCheckout",
          user.uid,
          `${format(new Date(), "yyyy-MM-dd")}`,
          deviceData,
          undefined,
          currency === "INR" ? selectedPlan.cost : selectedPlan.usdBaseCost,
          currency
        );

        setLoading(false);
      } else if (selectedPlan.durationInDays) {
        onSubscribeCallback();
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      weEventTrack("paymentFailed", {});
    }

    weEventTrack("paywall_clickPlan", {});
  };

  return {
    loading,
    selectedPlan,
    anchorEl,
    isOpen,
    price,
    couponStatus,
    handleOpen,
    handleClose,
    handleApplyCode,
    removeCode,
    onPay,
  };
};
