import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalized = email.trim().toLowerCase();

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", normalized))
      .unique();

    if (existing !== null) {
      return { status: "already_subscribed" as const };
    }

    await ctx.db.insert("waitlist", {
      email: normalized,
      signedAt: Date.now(),
    });
    return { status: "subscribed" as const };
  },
});
