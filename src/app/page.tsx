import Link from "next/link";
import { Logo } from "@/components/logo";
import { SubscribeWaitlistForm } from "@/components/subscribe-waitlist-form";

export default function Home() {
  return (
    <div className="py-16 container mx-auto px-6 flex justify-center">
      <div className="flex flex-col items-center text-center w-full xl:w-2/4 lg:w-3/4">
        <div className="mb-16">
          <Link className="inline-flex" href="/">
            <Logo className="text-black h-16" />
          </Link>
        </div>

        <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-12">
          Code-first · Type-safe · Open-source
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-8">
          Feature flags{" "}
          <span className="underline decoration-accent underline-offset-4 lg:underline-offset-8">
            in your code
          </span>
          , not around it
        </h1>

        <div className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-16">
          Designed{" "}
          <b className="text-foreground font-semibold">
            for engineers by engineers
          </b>
        </div>

        <SubscribeWaitlistForm className="w-2/4" />
      </div>
    </div>
  );
}
