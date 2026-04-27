import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

export default function CaptionsHashtagsSection({ captions }) {
  if (!captions) return null;

  const platforms = [
    { key: "instagram", label: "Instagram", icon: "📸", canvaUrl: "https://www.canva.com/create/instagram-posts/" },
    { key: "tiktok", label: "TikTok", icon: "🎵", capCutUrl: "https://www.capcut.com/", canvaUrl: "https://www.canva.com/create/tiktok-videos/" },
    { key: "twitter", label: "X / Twitter", icon: "🐦" },
  ];

  return (
    <div>
      <div className="section-title">
        <span>📱</span> Captions & Hashtags
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {platforms.map(({ key, label, icon, canvaUrl, capCutUrl }) => (
          <div key={key} className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{icon}</span> {label}
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <CopyButton text={captions[key] || ""} />
                {canvaUrl && (
                  <OpenInButton text={captions[key] || ""} url={canvaUrl} label="Canva" icon="🎨" />
                )}
                {capCutUrl && (
                  <OpenInButton text={captions[key] || ""} url={capCutUrl} label="CapCut" icon="🎬" />
                )}
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>{captions[key]}</p>
          </div>
        ))}

        {captions.hashtags?.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                <span>#</span> Hashtag Pack
              </div>
              <CopyButton text={captions.hashtags.join(" ")} label="Copy hashtags" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {captions.hashtags.map((tag, i) => (
                <span key={i} style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "var(--accent-dim)",
                  color: "var(--accent-light)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  fontSize: 13,
                  fontWeight: 500,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
