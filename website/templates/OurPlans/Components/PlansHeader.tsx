import { useRouter } from "next/router";
import { planParams } from "./PlanTypeToggler";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import HeaderWithSkipCta from "@templates/WomenTemplate/components/V2/LandingHeader/HeaderWithSkipCta";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  coachRef: string;
}

const PlansHeader: React.FC<Props> = ({ coachRef }) => {
  const router = useRouter();
  const q = router.query as planParams;

  const source = q.source;

  return source === "joinboat" ? (
    <HeaderWithSkipCta
      logoLink={coachRef ? `/?${coachRef}` : `/`}
      skipLink="/plans/skip"
      onSkip={() => weEventTrack("slot_request", { source: "webSkipSlot" })}
    />
  ) : (
    <LandingHeaderV2
      route={`/start?origin=plans${coachRef ? `&${coachRef}` : ""}`}
      btnText="Start Journey"
      coachRef={coachRef}
      activeLink="link_3"
    />
  );
};

export default PlansHeader;
