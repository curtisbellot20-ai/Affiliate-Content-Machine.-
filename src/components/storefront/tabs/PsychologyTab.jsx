const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  pill: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6 }),
  list: { paddingLeft: 16, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 },
};

const PSYCH_SECTIONS = [
  {
    key: 'identityBuying', label: '👤 Identity-Based Buying', color: '#6c63ff',
    render: (d) => d && (
      <div>
        <div style={{ padding: '14px 16px', background: 'rgba(108,99,255,0.1)', borderRadius: 8, marginBottom: 12 }}>
          <p style={S.label}>Identity Statement</p>
          <p style={{ fontWeight: 600, fontSize: 15 }}>{d.identityStatement}</p>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>Tribe: <strong style={{ color: 'var(--text)' }}>{d.tribeDescriptor}</strong></p>
        <p style={S.label}>Self-Concept Angles</p>
        <ul style={S.list}>{d.selfConceptAngles?.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </div>
    ),
  },
  {
    key: 'aspirationalPositioning', label: '⬆️ Aspirational Positioning', color: '#f59e0b',
    render: (d) => d && (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 16 }}>
          <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: 8, textAlign: 'center' }}>
            <p style={S.label}>Before</p>
            <p style={{ fontSize: 13 }}>{d.before}</p>
          </div>
          <span style={{ fontSize: 20, color: 'var(--text-muted)' }}>→</span>
          <div style={{ padding: '12px', background: 'rgba(34,197,94,0.1)', borderRadius: 8, textAlign: 'center' }}>
            <p style={S.label}>After</p>
            <p style={{ fontSize: 13 }}>{d.after}</p>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>Bridge: <strong style={{ color: 'var(--text)' }}>{d.bridge}</strong></p>
        <p style={S.label}>Content Angles</p>
        <ul style={S.list}>{d.contentAngles?.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </div>
    ),
  },
  {
    key: 'fandomPsychology', label: '🔥 Fandom Psychology', color: '#ec4899',
    render: (d) => d && (
      <div>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{d.communityName}</p>
        <p style={S.label}>Community Rituals</p>
        <ul style={S.list}>{d.rituals?.map((r, i) => <li key={i}>{r}</li>)}</ul>
        <p style={{ ...S.label, marginTop: 12 }}>Insider Language</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{d.insiderLanguage?.map((l, i) => <span key={i} style={S.pill('#ec4899')}>{l}</span>)}</div>
        <p style={{ ...S.label, marginTop: 10 }}>Content Angles</p>
        <ul style={S.list}>{d.contentAngles?.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </div>
    ),
  },
  {
    key: 'statusPsychology', label: '💎 Status Psychology', color: '#8b5cf6',
    render: (d) => d && (
      <div>
        <p style={S.label}>Status Signifiers</p>
        <ul style={S.list}>{d.statusSignifiers?.map((s, i) => <li key={i}>{s}</li>)}</ul>
        <p style={{ ...S.label, marginTop: 12 }}>Exclusivity Angles</p>
        <ul style={S.list}>{d.exclusivityAngles?.map((a, i) => <li key={i}>{a}</li>)}</ul>
        <p style={{ ...S.label, marginTop: 12 }}>Social Currency Ideas</p>
        <ul style={S.list}>{d.socialCurrencyIdeas?.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
    ),
  },
  {
    key: 'transformationPsychology', label: '🦋 Transformation Psychology', color: '#06b6d4',
    render: (d) => d && (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ padding: '12px', background: 'rgba(239,68,68,0.08)', borderRadius: 8 }}>
            <p style={S.label}>Before Identity</p>
            <p style={{ fontSize: 13, fontWeight: 500 }}>{d.beforeIdentity}</p>
          </div>
          <div style={{ padding: '12px', background: 'rgba(34,197,94,0.08)', borderRadius: 8 }}>
            <p style={S.label}>After Identity</p>
            <p style={{ fontSize: 13, fontWeight: 500 }}>{d.afterIdentity}</p>
          </div>
        </div>
        <p style={S.label}>Micro-transformations</p>
        <ul style={S.list}>{d.microTransformations?.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <p style={{ ...S.label, marginTop: 12 }}>Content Angles</p>
        <ul style={S.list}>{d.contentAngles?.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </div>
    ),
  },
];

export default function PsychologyTab({ data }) {
  if (!data) return null;

  return (
    <div>
      {/* Emotional Drivers */}
      {data.emotionalDrivers?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">❤️ Emotional Buying Drivers</p>
          <div style={S.grid2}>
            {data.emotionalDrivers.map((d, i) => (
              <div key={i} style={{ ...S.card, borderTop: '3px solid #ec4899' }}>
                <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{d.driver}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>{d.description}</p>
                <div style={{ padding: '8px 12px', background: 'rgba(236,72,153,0.08)', borderRadius: 6 }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Content Angle</p>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>{d.contentAngle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Psychology Sections */}
      {PSYCH_SECTIONS.map(({ key, label, color, render }) => (
        data[key] && (
          <div key={key} style={S.section}>
            <p className="section-title">{label}</p>
            <div style={{ ...S.card, borderLeft: `3px solid ${color}` }}>
              {render(data[key])}
            </div>
          </div>
        )
      ))}

      {/* Buying Triggers */}
      {data.buyingTriggers?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">🚨 Buying Triggers</p>
          <div style={S.grid2}>
            {data.buyingTriggers.map((trigger, i) => (
              <div key={i} style={S.card}>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{trigger.trigger}</p>
                <div style={{ padding: '10px 12px', background: 'rgba(108,99,255,0.08)', borderRadius: 6, marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>Example Copy</p>
                  <p style={{ fontSize: 13, fontStyle: 'italic' }}>“{trigger.copy}”</p>
                </div>
                <p style={S.label}>Use In</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {trigger.useIn?.map((loc, j) => <span key={j} style={S.pill('#6c63ff')}>{loc}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
