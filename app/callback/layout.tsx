import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "GitHub OAuth Callback",
  description:
    "Completing GitHub authentication process for repository explorer",
  noIndex: true, // Prevent indexing of callback page
});

export default function CallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="callback-page">{children}</div>;
}
