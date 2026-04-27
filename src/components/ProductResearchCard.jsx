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
            {product.image && (
              <div style={{ marginBottom: 16, borderRadius: "var(--radius-sm)", overflow: "hidden", background: "#fff", textAlign: "center" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: "100%", maxHeight: 220, objectFit: "contain", display: "block", margin: "0 auto" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
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
      </div>
    </div>
  );
}
