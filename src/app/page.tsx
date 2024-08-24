import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe
        src="https://iframe.mediadelivery.net/embed/294946/00227d5d-5ea2-4d67-9193-33880c7dc388?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
        loading="lazy"
        style={{
          border: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
    </main>
  );
}
