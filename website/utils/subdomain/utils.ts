export const stripSubDomain = (host: string) => {
  // if (
  //   host === "courses.prepp.in" ||
  //   host === "www.courses.prepp.in" ||
  //   host === "prepp.socialboat.shop"
  // ) {
  //   return "prepp";
  // } else

  if (
    host === "localhost" ||
    host === "socialboat.live" ||
    host === "www.socialboat.live" ||
    host === "socialboat.shop" ||
    host === "socialboat.in" ||
    host === "www.socialboat.in" ||
    host === "www.socialboat.shop"
  ) {
    return "home";
  } else if (host.includes(".")) {
    const hostTmp = host.replace("www.", "");
    return hostTmp.substr(0, hostTmp.indexOf("."));
  }

  return host;
};
