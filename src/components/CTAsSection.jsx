import CopyButton from "./CopyButton";

export default function CTAsSection({ ctas }) {
  if (!ctas?.length) return null;

  const allText = ctas.map((c, i) => `${i + 1}. ${c}`).join("\n");

  return (
    <div>
      <div className="section-title">
        <span>📣</span> CTAs (10)
        <CopyButton text={allText} label="Copy all" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ctas.map((cta, i) => (
          <div key={i} className="card" style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px" }}>
            <span className="tag" style={{ flexShrink: 0, fontVariantNumeric: "tabular-nums", minWidth: 28, textAlign: "center" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p style={{ flex: 1, fontSize: 14, lineHeight: 1.7, color: "var(--text)", margin: 0 }}>{cta}</p>
            <CopyButton text={cta} />
          </div>
        ))}
      </div>
    </div>
  );
}
