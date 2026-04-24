"use client";

import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import { type ReactNode, useEffect } from "react";

export function PosthogClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
