export const SEO_CONSTANTS = {
  SITE_NAME: "GitHub Repositories Explorer",
  TAGLINE: "Discover amazing repositories and developers",
  DEFAULT_IMAGE_WIDTH: 1200,
  DEFAULT_IMAGE_HEIGHT: 630,
  TWITTER_CARD_TYPE: "summary_large_image" as const,
  OG_TYPE: "website" as const,
  LOCALE: "en_US",
  THEME_COLOR: "#000000",
  MSAPPLICATION_TILE_COLOR: "#000000",
} as const;

export const SCHEMA_TYPES = {
  WEB_APPLICATION: "WebApplication",
  ORGANIZATION: "Organization",
  PERSON: "Person",
  OFFER: "Offer",
} as const;

export const ROBOT_SETTINGS = {
  DEFAULT: {
    index: true,
    follow: true,
  },
  NO_INDEX: {
    index: false,
    follow: false,
  },
  GOOGLE_BOT: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
} as const;

export const ICON_SIZES = {
  FAVICON_16: "16x16",
  FAVICON_32: "32x32",
  APPLE_TOUCH: "180x180",
  ANDROID_192: "192x192",
  ANDROID_512: "512x512",
} as const;
