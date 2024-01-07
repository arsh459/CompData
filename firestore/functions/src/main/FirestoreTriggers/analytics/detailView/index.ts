import * as functions from "firebase-functions";

export const onListingClickEventFunc = functions.analytics
  .event("listing_click")
  .onLog((event) => {
    const user = event.user;

    console.log("here");

    if (user) {
      console.log("user", user.userId);
    }
  });
