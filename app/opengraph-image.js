import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "@/lib/profile";
import { readToken } from "@/lib/tokens";

// One share image for every page, rendered at build time.
export const alt = `${identity.name}, ${identity.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse needs a static TTF file.
const sairaBold = await readFile(join(process.cwd(), "assets/fonts/Saira-Bold.ttf"));

const css = await readFile(join(process.cwd(), "app/globals.css"), "utf8");
const token = (name) => readToken(css, name);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: token("background"),
          color: token("text-strong"),
          fontFamily: "Saira",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -24,
            bottom: -170,
            fontSize: 600,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: token("watermark"),
          }}
        >
          {identity.monogram}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 108,
            height: 108,
            border: `6px solid ${token("accent-large")}`,
            color: token("accent-text"),
            fontSize: 42,
            letterSpacing: "-0.025em",
          }}
        >
          {identity.monogram}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              lineHeight: 1,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {identity.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: token("accent-text"),
            }}
          >
            {identity.role}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Saira", data: sairaBold, weight: 700, style: "normal" }] },
  );
}
