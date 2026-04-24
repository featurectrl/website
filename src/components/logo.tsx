import { match } from "ts-pattern";
import LogoSquare from "@/assets/logo_square.svg";
import LogoWide from "@/assets/logo_wide.svg";

export function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "square";
  className?: string;
}) {
  const C = match(variant)
    .with("full", () => LogoWide)
    .with("square", () => LogoSquare)
    .exhaustive();

  return <C className={className} />;
}
