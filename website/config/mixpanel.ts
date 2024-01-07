import mixpanel from "mixpanel-browser";

mixpanel.init(
  process.env.NEXT_PUBLIC_MIXPANEL ? process.env.NEXT_PUBLIC_MIXPANEL : "",
  {
    debug: false,
  }
);

export default mixpanel;
