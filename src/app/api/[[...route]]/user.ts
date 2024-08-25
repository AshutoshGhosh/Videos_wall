import { db } from "@/db/db";
import { users } from "@/db/schema";
import { verifyAuth } from "@hono/auth-js";
import { eq } from "drizzle-orm";
import { Hono } from "hono";

const app = new Hono().get("is-premium", verifyAuth(), async (c) => {
  const session = c.get("authUser");

  if (!session.token?.email) {
    return c.json({ error: "unauthorized" }, 401);
  }
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.token.email));

  if (!user) {
    return c.json({ error: "User not found!" }, 404);
  }

  if (!user.isPremium) {
    return c.json({ isPremium: false }, 200);
  } else {
    return c.json({ isPremium: true }, 200);
  }
});

export default app;
