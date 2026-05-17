const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  pill: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6 }),
  list: { paddingLeft: 16, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 },
};

export default function CommunityTab({ data }) {
  if (!data) return null;
  const { newsletter, loyaltyProgram, communityIdeas, vipSystem, repeatVisitStrategies, socialEngagement } = data;

  return (
    <div>
      {/* Newsletter */}
      {newsletter && (
        <div style={S.section}>
          <p className="section-title">📧 Newsletter System</p>
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{newsletter.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{newsletter.tagline}</p>
              </div>
              <span style={S.pill('#6c63ff')}>{newsletter.frequency}</span>
            </div>
            <div style={S.grid2}>
              <div>
                <p style={S.label}>Content Pillars</p>
                <ul style={S.list}>{newsletter.pillars?.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div>
                <p style={S.label}>Subject Line Formulas</p>
                {newsletter.subjectFormulas?.map((f, i) => (
                  <div key={i} style={{ padding: '6px 10px', background: 'rgba(108,99,255,0.08)', borderRadius: 6, marginBottom: 6, fontSize: 13, fontStyle: 'italic' }}>“{f}”</div>
                ))}
              </div>
            </div>
            {newsletter.welcomeSequence?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <p style={S.label}>Welcome Email Sequence</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {newsletter.welcomeSequence.map((email, i) => (
                    <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid var(--accent)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>Email {email.email}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{email.preview}</span>
                      </div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>📧 {email.subject}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{email.keyContent}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loyalty Program */}
      {loyaltyProgram && (
        <div style={S.section}>
          <p className="section-title">🏆 Loyalty Program</p>
          <div style={S.card}>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{loyaltyProgram.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>Points: {loyaltyProgram.pointsEarning}</p>
            {loyaltyProgram.tiers?.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={S.label}>Loyalty Tiers</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                  {loyaltyProgram.tiers.map((tier, i) => {
                    const colors = ['#cd7f32', '#c0c0c0', '#ffd700'];
                    const color = colors[i] || '#6c63ff';
                    return (
                      <div key={i} style={{ padding: '14px', background: color + '15', border: `1px solid ${color}44`, borderRadius: 10 }}>
                        <p style={{ fontWeight: 700, color, fontSize: 15, marginBottom: 2 }}>{tier.name}</p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{tier.requirement}</p>
                        <ul style={{ paddingLeft: 14, fontSize: 12, lineHeight: 1.8 }}>{tier.perks?.map((p, j) => <li key={j}>{p}</li>)}</ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {loyaltyProgram.gamification?.length > 0 && (
              <div>
                <p style={S.label}>Gamification Ideas</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {loyaltyProgram.gamification.map((g, i) => <span key={i} style={S.pill('#f59e0b')}>{g}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Community Ideas + VIP */}
      <div style={{ ...S.grid2, ...S.section }}>
        {communityIdeas?.length > 0 && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>👥 Community Ideas</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {communityIdeas.map((idea, i) => (
                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{idea.name}</p>
                    <span style={S.pill('#6c63ff')}>{idea.platform}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 4 }}>{idea.format}</p>
                  <p style={{ color: 'var(--text)', fontSize: 13 }}>{idea.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {vipSystem && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>👑 VIP System</p>
            <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{vipSystem.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12 }}>Access: {vipSystem.accessMethod}</p>
            <p style={S.label}>Benefits</p>
            <ul style={S.list}>{vipSystem.benefits?.map((b, i) => <li key={i}>{b}</li>)}</ul>
            <p style={{ ...S.label, marginTop: 12 }}>Exclusive Content</p>
            <ul style={S.list}>{vipSystem.exclusiveContent?.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
      </div>

      {/* Repeat Visit + Social Engagement */}
      <div style={{ ...S.grid2, ...S.section }}>
        {repeatVisitStrategies?.length > 0 && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>🔄 Repeat Visit Strategies</p>
            <ul style={S.list}>{repeatVisitStrategies.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        )}
        {socialEngagement?.length > 0 && (
          <div style={S.card}>
            <p className="section-title" style={{ fontSize: 16 }}>👋 Social Engagement System</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {socialEngagement.map((eng, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{eng.platform}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{eng.frequency}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{eng.tactic}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
