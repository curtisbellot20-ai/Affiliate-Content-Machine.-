import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

export default function InfluencerVideoPromptsSection({ prompts }) {
  if (!prompts?.length) return null;

  const allText = prompts.map((p, i) =>
    `=== Prompt ${i + 1}: ${p.angle} ===\nDuration: ${p.duration}\n\n${p.script}`
  ).join("\n\n");

  return (
    <div>
      <div className="section-title">
        <span>🎥</span> Influencer Video Prompts (5)
        <CopyButton text={allText} label="Copy all" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {prompts.map((prompt, i) => (
          <div key={i} className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="tag">{i + 1}</span>
                <span style={{ fontWeight: 700 }}>{prompt.angle}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", background: "var(--bg)", padding: "2px 8px", borderRadius: 999, border: "1px solid var(--border)" }}>
                  {prompt.duration}
                </span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <CopyButton text={`${prompt.angle}\n${prompt.duration}\n\n${prompt.script}`} />
                <OpenInButton
                  text={`${prompt.angle}\n${prompt.duration}\n\n${prompt.script}`}
                  url="https://www.capcut.com/"
                  label="CapCut"
                  icon="🎬"
                />
                <OpenInButton
                  text={`${prompt.angle}\n${prompt.duration}\n\n${prompt.script}`}
                  url="https://www.canva.com/create/tiktok-videos/"
                  label="Canva"
                  icon="🎨"
                />
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{prompt.script}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
