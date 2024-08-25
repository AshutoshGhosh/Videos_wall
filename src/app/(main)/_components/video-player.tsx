"use client";

import { Button } from "@/components/ui/button";
import { useCheckPremium } from "@/lib/hooks/users/use-check-premium";
import React from "react";
import Upgrade from "./Upgrade";
import { useSingedUrl } from "@/lib/hooks/users/videos/use-get-signed-url";

const VideoPlayer = () => {
  const { data: isPremium, isPending, isError } = useCheckPremium();

  const {
    data : signedUrl,
    isPending: isSignedUrlPending,
    isError: isSignedUrlError,
  } = useSingedUrl("https://iframe.mediadelivery.net/embed/294946/00227d5d-5ea2-4d67-9193-33880c7dc388")


  if (isPending || isSignedUrlPending) {
    return <div>Loading...</div>;
  }
  if (isError || isSignedUrlError) {
    return <div>Error Loading Video</div>;
  }

  if (!isPremium || !signedUrl) {
    return (
      <div>
        <p>Upgrade to premium to watch this video</p>
       
       <Upgrade />
      </div>
    );
  }

  return (
    <iframe
      src={signedUrl}
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
  );
};

export default VideoPlayer;
