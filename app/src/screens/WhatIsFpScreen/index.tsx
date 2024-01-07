import WhatIsFpMain from "@modules/WhatIsFpMain";
import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";
// import { SubscriptionProvider } from "@providers/subscription/SubscriptionProvider";

const WhatIsFpScreen = () => {
  return (
    <StepsPermissionProvider>
      {/* <SubscriptionProvider> */}
      <WhatIsFpMain />
      {/* </SubscriptionProvider> */}
    </StepsPermissionProvider>
  );
};

export default WhatIsFpScreen;
