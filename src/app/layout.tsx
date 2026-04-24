import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { PosthogClientProvider } from "@/components/posthog-client-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "featurectrl - type-safe feature flags from config in your repo",
  description:
    "Platform for feature flags management made by engineers for engineers. Type-safe, code-first, open source",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        montserrat.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <PosthogClientProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </PosthogClientProvider>
      </body>
    </html>
  );
}
