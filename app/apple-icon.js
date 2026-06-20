import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)",
          color: "#ffffff",
          fontSize: 78,
          fontWeight: 700,
          letterSpacing: "-0.05em",
        }}
      >
        VH
      </div>
    ),
    { ...size }
  );
}
