const url = "https://socialboat.live";

module.exports = {
  siteUrl: url,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [`/admin/*`, "/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/admin" }, // to exclude page
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${url}/sitemap.xml`, `${url}/server-sitemap.xml`],
  },
};
