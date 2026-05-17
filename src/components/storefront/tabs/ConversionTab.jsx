const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  pill: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6 }),
  list: { paddingLeft: 16, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 },
};

export default function ConversionTab({ data }) {
  if (!data) return null;
  const { ctaSystem, trustSystem, recommendationSections, urgencyTactics, productStorytelling, reviewStructure, comparisonTable } = data;

  return (
    <div>
      {/* CTA System */}
      {ctaSystem && (
        <div style={S.section}>
          <p className="section-title">🎯 CTA System</p>
          <div style={S.card}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
              {[{ label: 'Primary CTA', value: ctaSystem.primary, color: '#6c63ff' },
                { label: 'Secondary CTA', value: ctaSystem.secondary, color: '#22c55e' },
                { label: 'Urgency CTA', value: ctaSystem.urgency, color: '#f59e0b' },
              ].map(({ label, value, color }) => value && (
                <div key={label} style={{ padding: '12px 16px', background: color + '15', border: `1px solid ${color}44`, borderRadius: 8 }}>
                  <p style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 4 }}>{label}</p>
                  <p style={{ fontWeight: 700, fontSize: 15 }}>{value}</p>
                </div>
              ))}
            </div>
            {ctaSystem.variations?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={S.label}>CTA Variations</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {ctaSystem.variations.map((v, i) => <span key={i} style={S.pill('#6c63ff')}>{v}</span>)}
                </div>
              </div>
            )}
            {ctaSystem.placements?.length > 0 && (
              <div>
                <p style={S.label}>Placement Strategy</p>
                <ul style={S.list}>{ctaSystem.placements.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trust System */}
      {trustSystem && (
        <div style={S.section}>
          <p className="section-title">🔒 Trust System</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {trustSystem.signals?.length > 0 && (
              <div style={S.card}>
                <p style={S.label}>Trust Signals</p>
                {trustSystem.signals.map((sig, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 12px', background: 'rgba(34,197,94,0.06)', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid #22c55e' }}>
                    <span style={{ fontSize: 18 }}>✓</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{sig.signal}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>Placement: {sig.placement}</p>
                      {sig.copy && <p style={{ color: 'var(--text)', fontSize: 13, marginTop: 4, fontStyle: 'italic' }}>“{sig.copy}”</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={S.grid2}>
              {trustSystem.socialProofTypes?.length > 0 && (
                <div style={S.card}>
                  <p style={S.label}>Social Proof Types</p>
                  <ul style={S.list}>{trustSystem.socialProofTypes.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
              )}
              {trustSystem.credibilityMarkers?.length > 0 && (
                <div style={S.card}>
                  <p style={S.label}>Credibility Markers</p>
                  <ul style={S.list}>{trustSystem.credibilityMarkers.map((m, i) => <li key={i}>{m}</li>)}</ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recommendation Sections */}
      {recommendationSections?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">⭐ Recommendation Sections</p>
          <div style={S.grid2}>
            {recommendationSections.map((sec, i) => (
              <div key={i} style={S.card}>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{sec.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8 }}>{sec.angle}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Trigger: <strong style={{ color: 'var(--text)' }}>{sec.trigger}</strong></p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{sec.productCount} products recommended</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Storytelling */}
      {productStorytelling?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">📚 Product Storytelling Formats</p>
          <div style={S.grid2}>
            {productStorytelling.map((fmt, i) => (
              <div key={i} style={S.card}>
                <span style={S.pill('#8b5cf6')}>{fmt.format}</span>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '8px 0', fontStyle: 'italic' }}>“{fmt.example}”</p>
                <p style={S.label}>Structure</p>
                <ol style={S.list}>{fmt.structure?.map((s, j) => <li key={j}>{s}</li>)}</ol>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Urgency Tactics */}
      {urgencyTactics?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">⏰ Urgency & Scarcity Tactics</p>
          <div style={S.grid2}>
            {urgencyTactics.map((t, i) => (
              <div key={i} style={{ ...S.card, borderLeft: `3px solid ${t.ethical ? '#22c55e' : '#f59e0b'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{t.tactic}</p>
                  <span style={S.pill(t.ethical ? '#22c55e' : '#f59e0b')}>{t.ethical ? 'Ethical' : 'Use Carefully'}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic' }}>“{t.copy}”</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Structure + Comparison Table */}
      <div style={{ ...S.grid2, ...S.section }}>
        {reviewStructure && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>⭐ Review Structure</p>
            <p style={S.label}>Sections</p>
            <ol style={S.list}>{reviewStructure.sections?.map((s, i) => <li key={i}>{s}</li>)}</ol>
            <p style={{ ...S.label, marginTop: 12 }}>Rating Categories</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>{reviewStructure.ratingCategories?.map((c, i) => <span key={i} style={S.pill('#f59e0b')}>{c}</span>)}</div>
            {reviewStructure.proConFormat && (
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <p style={S.label}>Pro/Con Format</p>
                <p style={{ fontSize: 13 }}>{reviewStructure.proConFormat}</p>
              </div>
            )}
          </div>
        )}
        {comparisonTable && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>📊 Comparison Table</p>
            <p style={S.label}>Headers</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>{comparisonTable.headers?.map((h, i) => <span key={i} style={S.pill('#06b6d4')}>{h}</span>)}</div>
            <p style={{ ...S.label, marginTop: 12 }}>Scoring Criteria</p>
            <ul style={S.list}>{comparisonTable.scoringCriteria?.map((c, i) => <li key={i}>{c}</li>)}</ul>
            <p style={{ ...S.label, marginTop: 12 }}>Callout Ideas</p>
            <ul style={S.list}>{comparisonTable.calloutIdeas?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
