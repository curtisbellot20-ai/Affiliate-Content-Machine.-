import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

export default function PinterestPinsSection({ pins, productImage }) {
  if (!pins?.length) return null;

  const allText = pins.map((p, i) =>
    `=== Pin ${i + 1} ===\nTitle: ${p.title}\nDescription: ${p.description}\nBoard: ${p.boardSuggestion}`
  ).join("\n\n");

  return (
    <div>
      <div className="section-title">
        <span>📌</span> Pinterest Pins (5)
        <CopyButton text={allText} label="Copy all" />
      </div>
      {productImage && (
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
          <img src={productImage} alt="Product" style={{ width: 56, height: 56, objectFit: "contain", borderRadius: 6, background: "#fff", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Use this product image as your pin visual in Canva</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {pins.map((pin, i) => (
          <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              <span className="tag">Pin {i + 1}</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <CopyButton text={`Title: ${pin.title}\n${pin.description}\nBoard: ${pin.boardSuggestion}`} />
                <OpenInButton
                  text={`Title: ${pin.title}\n\n${pin.description}\n\nBoard: ${pin.boardSuggestion}`}
                  url="https://www.canva.com/create/pinterest-graphics/"
                  label="Canva"
                  icon="🎨"
                />
              </div>
            </div>
            <div style={{ fontWeight: 700, lineHeight: 1.4 }}>{pin.title}</div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, flex: 1 }}>{pin.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 8, borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 14 }}>📋</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Board:</span>
              <span style={{ fontSize: 13, color: "var(--accent-light)", fontWeight: 600 }}>{pin.boardSuggestion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
