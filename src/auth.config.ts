import Github from "next-auth/providers/github";
import { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
