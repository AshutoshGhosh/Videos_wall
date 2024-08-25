import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

//routes
import userRoutes from "@/app/api/[[...route]]/user";
import paymentsRoutes from "@/app/api/[[...route]]/payments";
import videoRoutes from "@/app/api/[[...route]]/videos";

export const runtime = "nodejs";

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

const routes = app
  .route("/user", userRoutes)
  .route("/payments", paymentsRoutes)
  .route("/video", videoRoutes);

// app.get('/hello', (c) => {
//   return c.json({
//     message: 'Hello Next.js!',
//   })
// })

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
