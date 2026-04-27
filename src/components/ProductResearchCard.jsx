import CopyButton from "./CopyButton";

export default function ProductResearchCard({ product, research }) {
  if (!research) return null;

  const fullText = [
    `PRODUCT RESEARCH`,
    `Product: ${product?.title}`,
    `Price: ${product?.price}`,
    ``,
    `Summary: ${research.summary}`,
    `Target Demographic: ${research.targetDemographic}`,
    ``,
    `Pain Points:\n${research.painPoints?.map((p) => `- ${p}`).join("\n")}`,
    ``,
    `Unique Selling Points:\n${research.uniqueSellingPoints?.map((u) => `- ${u}`).join("\n")}`,
    ``,
    `Competitor Gap: ${research.competitorGap}`,
    research.emotionalAngle ? `\nEmotional Angle: ${research.emotionalAngle}` : "",
  ].join("\n");

  return (
    <div>
      <div className="section-title">
        <span>🔍</span> Product Research
        <CopyButton text={fullText} label="Copy all" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {product && (
          <div className="card">
            {product.images?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                  {product.images.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" title="Open full size" style={{ flexShrink: 0 }}>
                      <img
                        src={src}
                        alt={`Product image ${i + 1}`}
                        style={{ width: i === 0 ? 160 : 80, height: i === 0 ? 160 : 80, objectFit: "contain", borderRadius: 8, background: "#fff", border: i === 0 ? "2px solid var(--accent)" : "1px solid var(--border)", cursor: "pointer" }}
                        onError={(e) => { e.target.parentElement.style.display = "none"; }}
                      />
                    </a>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>
                  {product.images.length} image{product.images.length !== 1 ? "s" : ""} found — click to open full size
                </div>
              </div>
            )}
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>Product Info</div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{product.title}</div>
            {product.price && <div style={{ color: "var(--accent-light)", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{product.price}</div>}
            {product.description && <div style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{product.description}</div>}
          </div>
        )}

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>Summary</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{research.summary}</p>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Target Demographic</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{research.targetDemographic}</p>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>Pain Points</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {research.painPoints?.map((p, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }}>✗</span> {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>Unique Selling Points</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {research.uniqueSellingPoints?.map((u, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--text-muted)" }}>
                <span style={{ color: "var(--green)", flexShrink: 0, marginTop: 2 }}>✓</span> {u}
              </li>
            ))}
          </ul>
        </div>

        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)" }}>Competitor Gap</div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{research.competitorGap}</p>
        </div>

        {research.emotionalAngle && (
          <div className="card" style={{ gridColumn: "1 / -1", borderColor: "rgba(108,99,255,0.3)", background: "var(--accent-dim)" }}>
            <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)" }}>💜 Emotional Angle</div>
            <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{research.emotionalAngle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
