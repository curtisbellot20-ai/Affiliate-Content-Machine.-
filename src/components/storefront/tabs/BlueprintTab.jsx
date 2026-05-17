import CopyButton from '@/components/CopyButton';

const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  tag: { display: 'inline-block', padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600 },
  pill: (color) => ({
    display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
    background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6,
  }),
};

const PAGE_TYPE_COLORS = {
  buyer_guide: '#6c63ff', comparison: '#22c55e', top_list: '#f59e0b',
  review: '#ec4899', faq: '#06b6d4', recommendation: '#8b5cf6',
};

const PAGE_TYPE_LABELS = {
  buyer_guide: 'Buyer Guide', comparison: 'Comparison', top_list: 'Top List',
  review: 'Review', faq: 'FAQ', recommendation: 'Recommendation',
};

export default function BlueprintTab({ data }) {
  if (!data) return null;
  const { homepage, navigation, keyPages, blogSystem, leadMagnet, emailCapture } = data;

  return (
    <div>
      {/* Homepage Blueprint */}
      <div style={S.section}>
        <p className="section-title">🏠 Homepage Blueprint</p>
        <div style={S.card}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 6 }}>{homepage?.heroHeadline}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 12 }}>{homepage?.heroSubheadline}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ ...S.pill('#6c63ff') }}>{homepage?.heroCTA}</span>
              {homepage?.heroSubCTA && <span style={{ ...S.pill('#8888aa') }}>{homepage?.heroSubCTA}</span>}
            </div>
          </div>

          {homepage?.sections && (
            <div style={{ marginBottom: 16 }}>
              <p style={S.label}>Page Sections</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {homepage.sections.map((sec, i) => (
                  <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid var(--accent)' }}>
                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{sec.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{sec.contentBrief}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {homepage?.trustSignals && (
            <div>
              <p style={S.label}>Trust Signals</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {homepage.trustSignals.map((t, i) => <span key={i} style={S.pill('#22c55e')}>✓ {t}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div style={S.section}>
        <p className="section-title">🧭 Navigation Structure</p>
        <div style={S.grid2}>
          <div style={S.card}>
            <p style={S.label}>Primary Nav</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navigation?.primary?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</span>
                  <code style={{ fontSize: 11, color: 'var(--accent-light)', opacity: 0.7 }}>/{item.slug}</code>
                </div>
              ))}
            </div>
          </div>
          <div style={S.card}>
            <p style={S.label}>Collections</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navigation?.collections?.map((col, i) => (
                <div key={i} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{col.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>{col.angle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Pages */}
      <div style={S.section}>
        <p className="section-title">📄 Key Pages Blueprint</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {keyPages?.map((page, i) => (
            <div key={i} style={S.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ ...S.pill(PAGE_TYPE_COLORS[page.type] || '#6c63ff') }}>
                  {PAGE_TYPE_LABELS[page.type] || page.type}
                </span>
              </div>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{page.title}</p>
              <p style={{ color: 'var(--accent-light)', fontSize: 12, marginBottom: 10, fontFamily: 'monospace' }}>{page.targetKeyword}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>{page.angle}</p>
              {page.outline && (
                <ol style={{ paddingLeft: 16, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8 }}>
                  {page.outline.map((item, j) => <li key={j}>{item}</li>)}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Blog System */}
      {blogSystem && (
        <div style={S.section}>
          <p className="section-title">✏️ Blog System</p>
          <div style={S.card}>
            <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{blogSystem.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>{blogSystem.tagline}</p>
            <div style={S.grid2}>
              <div>
                <p style={S.label}>Blog Categories</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {blogSystem.categories?.map((cat, i) => (
                    <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{cat.name}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>{cat.pillarTopic} • {cat.monthlyPosts} posts/mo</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p style={S.label}>Cornerstone Content</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {blogSystem.cornerStoneContent?.map((post, i) => (
                    <div key={i} style={{ padding: '10px 14px', background: 'rgba(108,99,255,0.08)', borderRadius: 8, borderLeft: '3px solid var(--accent)' }}>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{post.title}</p>
                      <p style={{ color: 'var(--accent-light)', fontSize: 11, fontFamily: 'monospace' }}>{post.keyword}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 2 }}>{post.wordCount?.toLocaleString()} words</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Magnet + Email Capture */}
      {(leadMagnet || emailCapture) && (
        <div style={S.section}>
          <p className="section-title">📧 Lead Magnet & Email Capture</p>
          <div style={S.grid2}>
            {leadMagnet && (
              <div style={{ ...S.card, borderColor: 'rgba(108,99,255,0.4)' }}>
                <p style={S.label}>Lead Magnet</p>
                <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{leadMagnet.title}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 10 }}>{leadMagnet.value}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={S.pill('#6c63ff')}>{leadMagnet.format}</span>
                  <span style={S.pill('#8888aa')}>{leadMagnet.deliveryMethod}</span>
                </div>
                <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(108,99,255,0.08)', borderRadius: 8 }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 4 }}>CTA</p>
                  <p style={{ fontWeight: 600 }}>{leadMagnet.cta}</p>
                </div>
              </div>
            )}
            {emailCapture && (
              <div style={S.card}>
                <p style={S.label}>Email Capture Strategy</p>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 4 }}>Incentive</p>
                  <p style={{ fontWeight: 600 }}>{emailCapture.incentive}</p>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 4 }}>Button Text</p>
                  <p style={{ fontWeight: 600, color: 'var(--accent-light)' }}>{emailCapture.buttonText}</p>
                </div>
                <div>
                  <p style={S.label}>Placement Locations</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {emailCapture.placements?.map((p, i) => <span key={i} style={S.pill('#06b6d4')}>{p}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
