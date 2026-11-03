import type { Metadata } from "next";
import "./globals.css";
import { BreakingNewsProvider } from "@/src/context/BreakingNewsContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://afrocrymedia.com"),

  title: {
    default: "AfroCry Media",
    template: "%s | AfroCry Media",
  },

  description:
    "Modern African news, culture, technology, entertainment and politics.",

  keywords: [
    "Africa",
    "News",
    "Media",
    "Technology",
    "Politics",
    "Entertainment",
  ],

  openGraph: {
    title: "AfroCry Media",
    description:
      "Modern African news, culture, technology, entertainment and politics.",
    siteName: "AfroCry Media",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AfroCry Media",
    description:
      "Modern African news, culture, technology, entertainment and politics.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BreakingNewsProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              className:
                "bg-white text-black border border-gray-200 shadow-xl rounded-2xl",
            }}
          />
        </BreakingNewsProvider>
      </body>
    </html>
  );
}