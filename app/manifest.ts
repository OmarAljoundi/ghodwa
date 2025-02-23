import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alghodwa Group",
    short_name: "Alghodwa Group",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F2F2",
    theme_color: "#EFB14E",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/images/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
