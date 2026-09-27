import { ImageResponse } from "next/og";
import { seo } from "@/content/seo";
import { theme } from "@/lib/theme";

export const alt = seo.home.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: theme.void,
          borderBottom: `12px solid ${theme.accent}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: theme.accent }}>
          {seo.siteName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 700, lineHeight: 1.05, color: theme.ink }}>
            {seo.home.title}
          </div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.35, color: theme.inkMuted }}>
            {seo.home.description}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
