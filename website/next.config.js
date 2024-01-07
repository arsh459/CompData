// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

moduleExports = {
  future: {
    // webpack5: false,
  },
  api: {
    responseLimit: "8mb",
  },

  async redirects() {
    return [
      {
        source: "/apply",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/program/:slug*",
        destination: "/myProgram",
        permanent: true,
      },
      // {
      //   source: "/MyProgram",
      //   destination: "/myProgram",
      //   permanent: true,
      // },
      // {
      //   source: "/myprogram",
      //   destination: "/myProgram",
      //   permanent: true,
      // },
      {
        source: "/play",
        destination: "/myProgram",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/women",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joinBoatV5",
        destination: "/plans",
        permanent: true,
      },
      {
        source: "/workout/:slug*",
        destination: "/teams",
        permanent: true,
      },
      {
        source: "/boats",
        destination: "/",
        permanent: true,
      },
      {
        source: "/campaign/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkout/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/checkoutSeries/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/createLive",
        destination: "/",
        permanent: true,
      },
      {
        source: "/createNutrition",
        destination: "/",
        permanent: true,
      },
      {
        source: "/createSeries",
        destination: "/",
        permanent: true,
      },
      {
        source: "/createWorkout",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/editEvent",
        destination: "/",
        permanent: true,
      },
      {
        source: "/editUserProfile/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/editUserProfileV2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/editUserProfileV2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/events/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joinBoat/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joinBoatV2/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joinBoatV3/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/joinBoatV4/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/landing",
        destination: "/",
        permanent: true,
      },
      {
        source: "/onboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/p/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pr/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/t/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/teams/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/teams",
        destination: "/",
        permanent: true,
      },
      {
        source: "/workout/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/boats",
        destination: "/",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/",
        permanent: true,
      },
      {
        source: "/landingV2",
        destination: "/",
        permanent: true,
      },
      // {
      //   source: "/socialboat",
      //   destination: "/community",
      //   permanent: true,
      // },
      // {
      //   has: [
      //     {
      //       type: "host",
      //       value: "socialboat.socialboat.live",
      //     },
      //   ],
      //   source: "/",
      //   permanent: false,
      //   destination: "community.socialboat.live",
      // },
    ];
  },

  async rewrites() {
    return {
      afterFiles: [
        {
          has: [
            {
              type: "host",
              value: "(?<host>.*)",
            },
          ],
          source: "/",
          destination: "/:host",
        },

        // {
        //   has: [
        //     {
        //       type: "host",
        //       value: "(?<host>.*)",
        //     },
        //   ],
        //   source: "/events",
        //   destination: "/:host/community",
        // },
      ],
    };
  },

  images: {
    domains: [
      "img.icons8.com",
      "ik.imagekit.io",
      "res.cloudinary.com",
      "https://s3.ap-south-1.amazonaws.com/",
      "https://d2cjy81ufi4f1m.cloudfront.net",
    ],
    // loader: "cloudinary",
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  withBundleAnalyzer(moduleExports),
  sentryWebpackPluginOptions
);
