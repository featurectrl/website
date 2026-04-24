"use client";

import { type SubmitEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutationEx } from "@/hooks/useMutationEx";
import { cn } from "@/lib/utils";
import { api } from "../../convex/_generated/api";

export function SubscribeWaitlistForm({ className }: { className?: string }) {
  const [subscribe, subscribeState] = useMutationEx(api.waitlist.subscribe);
  const emailInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const email = emailInputRef.current?.value ?? "";
    if (subscribeState.isLoading || !email) {
      return;
    }

    void subscribe({ email });
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          className="h-10 flex-1"
          ref={emailInputRef}
          type="email"
          required
          placeholder="your@company.email"
          disabled={!subscribeState.isIdle}
        />
        <Button
          type="submit"
          disabled={!subscribeState.isIdle}
          className="h-10 px-5 shrink-0"
        >
          {subscribeState.isSuccess ? "You're in!" : "Join the waitlist"}
        </Button>
      </div>

      {subscribeState.isError && (
        <p className="mt-2 text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      )}

      {!(subscribeState.isSuccess || subscribeState.isError) && (
        <p className={cn("mt-2 text-xs text-muted-foreground")}>
          No spam. We will only email you once platform is available.
        </p>
      )}
    </form>
  );
}
