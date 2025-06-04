import type { Metadata } from "next";

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  creator: string;
  twitterHandle: string;
  keywords: string[];
}

export interface PageMetadataOptions {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
}

export interface StructuredDataWebApp {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  author: {
    "@type": string;
    name: string;
  };
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  keywords: string;
  image: string;
  screenshot: string;
}

export interface SEOImageOptions {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export type MetadataGenerator = (options: PageMetadataOptions) => Metadata;
