import {
  appStoreWhite,
  facebookIconLB,
  instaIconLB,
  linkedinIconLB,
  playStoreWhite,
  youtubeIconLB,
} from "@constants/icons/iconURLs";
import {
  androidBranchURL,
  iosBranchURL,
} from "@templates/WomenTemplate/components/V2/JoinRevolutionV2";

export const footerData = [
  {
    heading: "About",
    subHeaders: [
      {
        text: "About SocialBoat",
        link: "/about/company-details",
        linkType: "internal",
      },
      // {
      //   text: "Be an influencer",
      //   link: "/apply",
      //   linkType: "internal",
      // },
      {
        text: "Careers",
        externalLink: true,
        link: "https://angel.co/company/socialboat",
        linkType: "external",
      },
    ],
  },
  {
    heading: "Product",
    subHeaders: [
      {
        text: "Home",
        link: "#courses",
        linkType: "anchor",
      },
      {
        text: "Blog",
        link: "/blog",
        linkType: "internal",
      },
      {
        text: "Insights",
        link: "#insights",
        linkType: "anchor",
      },
      {
        text: "Get paid",
        link: "#paid",
        linkType: "anchor",
      },
      {
        text: "Live",
        link: "#live",
        linkType: "anchor",
      },
      {
        text: "Website",
        link: "#website",
        linkType: "anchor",
      },
      {
        text: "Sign in",
        link: "/dashboard",
        linkType: "internal",
      },
    ],
  },
  {
    heading: "Privacy",
    subHeaders: [
      {
        text: "Terms",
        link: "/terms",
        linkType: "internal",
      },
      {
        text: "Privacy policy",
        link: "/privacy-policy",
        linkType: "internal",
      },
    ],
  },
  {
    heading: "Follow us",
    subHeaders: [
      {
        text: "Instagram",
        externalLink: true,
        link: "https://www.instagram.com/socialboat.live",
        linkType: "external",
      },
      {
        text: "Facebook",
        externalLink: true,
        link: "https://www.facebook.com/socialboat.live",
        linkType: "external",
      },
      {
        text: "LinkedIn",
        externalLink: true,
        link: "https://www.linkedin.com/company/socialboat-live",
        linkType: "external",
      },
      {
        text: "Angelist",
        externalLink: true,
        link: "https://angel.co/company/socialboat",
        linkType: "external",
      },
      // {
      //   text: "Crunchbase",
      //   externalLink: true,
      //   link: "https://www.crunchbase.com/organization/holidaying",
      //   linkType: "external",
      // },
      {
        text: "Whatsapp",
        externalLink: true,
        link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
        linkType: "external",
      },
      {
        text: "Twitter",
        externalLink: true,
        link: "https://twitter.com/socialboat_live",
        linkType: "external",
      },
      {
        text: "Medium",
        externalLink: true,
        link: "https://medium.com/socialboat",
        linkType: "external",
      },
    ],
  },
];
export const footerDataNew = [
  {
    heading: "Community",
    subHeaders: [
      {
        text: "Write to Us",
        link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
        linkType: "external",
      },
      {
        text: "Reviews",
        link: "/reviews",
        linkType: "internal",
      },
      {
        text: "Privacy policy",
        link: "https://socialboat.notion.site/Privacy-Policy-68079970e2d64d95bddf92bb31114ad8",
        linkType: "external",
      },
      {
        text: "Terms & Conditions",
        link: "https://socialboat.notion.site/Terms-of-Use-dac5e29234f542b48e826ed54c10f8fe",
        linkType: "external",
      },
      {
        text: "Cancellation Policy",
        link: "https://socialboat.notion.site/Cancellation-Policy-ed7868378ba741aeb24adb8e6545c7bd",
        linkType: "external",
      },
      {
        text: "Blog",
        link: "/blog",
        linkType: "internal",
      },
      // {
      //   text: "Our community",
      //   link: "https://www.facebook.com/groups/3865476723485352",
      //   linkType: "external",
      // },
    ],
  },
  {
    heading: "Company",
    subHeaders: [
      {
        text: "About Us",
        link: "/about/company-details",
        linkType: "internal",
      },
      {
        text: "Contact Us",
        link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
        linkType: "external",
      },
      {
        text: "Careers",
        externalLink: true,
        link: "https://angel.co/company/socialboat",
        linkType: "external",
      },
      {
        text: "Pricing Plans",
        link: "/plans",
        linkType: "internal",
      },
      {
        text: "SiteMap",
        link: "https://socialboat.live/sitemap.xml",
        linkType: "internal",
      },
      {
        text: "SiteMap Server",
        link: "https://socialboat.live/server-sitemap.xml",
        linkType: "internal",
      },
    ],
  },
];
export const mobileFooterLinks = {
  heading: "",
  subHeaders: [
    {
      text: "About Us",
      link: "/about/company-details",
      linkType: "internal",
    },

    {
      text: "Careers",
      externalLink: true,
      link: "https://angel.co/company/socialboat",
      linkType: "external",
    },
    {
      text: "Contact Us",
      link: "/apply",
      linkType: "internal",
    },
    {
      text: "Blog",
      link: "/blog",
      linkType: "internal",
    },
    {
      text: "SiteMap",
      link: "https://socialboat.live/sitemap.xml",
      linkType: "internal",
    },
    {
      text: "SiteMap Server",
      link: "https://socialboat.live/server-sitemap.xml",
      linkType: "internal",
    },
  ],
};
export const mobileFooterPrivacy = {
  heading: "",
  subHeaders: [
    {
      text: "Terms & Conditions",
      link: "/terms",
      linkType: "internal",
    },
    {
      text: "Privacy policy",
      link: "/privacy-policy",
      linkType: "internal",
    },
    {
      text: "Reviews",
      link: "/reviews",
      linkType: "internal",
    },
  ],
};
export const followUsLinks = {
  heading: "Follow us",
  subHeaders: [
    {
      text: "Android App",
      link: androidBranchURL,
      linkType: "external",
      iconUrl: playStoreWhite,
    },
    {
      text: "iOS App",
      link: iosBranchURL,
      linkType: "external",
      iconUrl: appStoreWhite,
    },
    {
      text: "Facebook",
      externalLink: true,
      link: "https://www.facebook.com/socialboat.live",
      linkType: "external",
      iconUrl: facebookIconLB,
    },
    {
      text: "LinkedIn",
      externalLink: true,
      link: "https://www.linkedin.com/company/socialboat-live",
      linkType: "external",
      iconUrl: linkedinIconLB,
    },
    {
      text: "Instagram",
      externalLink: true,
      link: "https://www.instagram.com/socialboat.live",
      linkType: "external",
      iconUrl: instaIconLB,
    },
    {
      text: "Youtube",
      externalLink: true,
      link: "https://www.youtube.com/channel/UCa93FaRReHYXDqL3-IvDocg",
      linkType: "external",
      iconUrl: youtubeIconLB,
    },
    // {
    //   text: "Angelist",
    //   externalLink: true,
    //   link: "https://angel.co/company/socialboat",
    //   linkType: "external",
    // },
    // {
    //   text: "Crunchbase",
    //   externalLink: true,
    //   link: "https://www.crunchbase.com/organization/holidaying",
    //   linkType: "external",
    // },
    // {
    //   text: "Whatsapp",
    //   externalLink: true,
    //   link: "https://api.whatsapp.com/send?phone=919958730020&text=Hi!",
    //   linkType: "external",
    // },
    // {
    //   text: "Twitter",
    //   externalLink: true,
    //   link: "https://twitter.com/socialboat_live",
    //   linkType: "external",
    // },
    // {
    //   text: "Medium",
    //   externalLink: true,
    //   link: "https://medium.com/socialboat",
    //   linkType: "external",
    // },
  ],
};
export const companyDetails = {
  name: "HTT Holidaying Travel Technologies Pvt. Ltd.",
  address: "5th Floor, Tower C, Unitech Cyber Park, Sector 39",
  city: "Gurgaon",
  state: "Haryana",
  pin: "122003",
  country: "India",
};
