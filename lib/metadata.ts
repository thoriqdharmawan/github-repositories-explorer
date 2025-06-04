import type { Metadata } from "next";
import { SEO_CONSTANTS, SCHEMA_TYPES, ROBOT_SETTINGS } from "./seo-constants";
import type {
  SiteConfig,
  PageMetadataOptions,
  StructuredDataWebApp,
} from "@/types/metadata";

const PUBLIC_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://github-repositories-explorer.vercel.app";

export const siteConfig: SiteConfig = {
  name: SEO_CONSTANTS.SITE_NAME,
  description:
    "Discover and explore GitHub users and their repositories. Search for developers, browse their projects, and find interesting open-source repositories with detailed insights and statistics.",
  url: PUBLIC_URL,
  ogImage: "/og-image.png",
  creator: "Thoriq Dharmawan",
  twitterHandle: "@github_explorer",
  keywords: [
    "GitHub",
    "repositories",
    "developers",
    "open source",
    "code explorer",
    "git",
    "programming",
    "software development",
    "project discovery",
    "developer profiles",
  ],
};

const getMetadataBaseURL = () => {
  try {
    return new URL(PUBLIC_URL);
  } catch {
    // Fallback for development environment
    return new URL("http://localhost:3000");
  }
};

export const defaultMetadata: Metadata = {
  metadataBase: getMetadataBaseURL(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  robots: {
    ...ROBOT_SETTINGS.DEFAULT,
    googleBot: ROBOT_SETTINGS.GOOGLE_BOT,
  },
  openGraph: {
    type: SEO_CONSTANTS.OG_TYPE,
    locale: SEO_CONSTANTS.LOCALE,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: SEO_CONSTANTS.DEFAULT_IMAGE_WIDTH,
        height: SEO_CONSTANTS.DEFAULT_IMAGE_HEIGHT,
        alt: `${siteConfig.name} - ${SEO_CONSTANTS.TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: SEO_CONSTANTS.TWITTER_CARD_TYPE,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
  },
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": SEO_CONSTANTS.THEME_COLOR,
    "msapplication-TileColor": SEO_CONSTANTS.MSAPPLICATION_TILE_COLOR,
  },
};

export const generateStructuredData = (): StructuredDataWebApp => ({
  "@context": "https://schema.org",
  "@type": SCHEMA_TYPES.WEB_APPLICATION,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": SCHEMA_TYPES.OFFER,
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": SCHEMA_TYPES.PERSON,
    name: siteConfig.creator,
  },
  datePublished: "2025-06-04",
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-US",
  keywords: siteConfig.keywords.join(", "),
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  screenshot: `${siteConfig.url}${siteConfig.ogImage}`,
});

export const generatePageMetadata = ({
  title,
  description,
  image,
  noIndex = false,
  keywords,
  author,
}: PageMetadataOptions): Metadata => {
  const robotSettings = noIndex
    ? ROBOT_SETTINGS.NO_INDEX
    : ROBOT_SETTINGS.DEFAULT;

  return {
    title,
    description: description || siteConfig.description,
    keywords: keywords || siteConfig.keywords,
    authors: author ? [{ name: author }] : [{ name: siteConfig.creator }],
    robots: robotSettings,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url: siteConfig.url,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: SEO_CONSTANTS.DEFAULT_IMAGE_WIDTH,
          height: SEO_CONSTANTS.DEFAULT_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
    },
  };
};
