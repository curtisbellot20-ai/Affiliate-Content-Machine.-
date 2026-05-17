const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  pill: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6 }),
};

const ARTICLE_TYPES = [
  { key: 'bestProductsArticles', label: '🏆 Best Products Articles', color: '#f59e0b' },
  { key: 'comparisonArticles',   label: '⚖️ Comparison Articles',    color: '#06b6d4' },
  { key: 'topLists',             label: '📊 Top Lists',              color: '#22c55e' },
  { key: 'buyerGuides',          label: '📖 Buyer Guides',           color: '#6c63ff' },
  { key: 'emotionalStories',     label: '❤️ Emotional Stories',       color: '#ec4899' },
  { key: 'trendContent',         label: '🚀 Trend Content',           color: '#8b5cf6' },
  { key: 'faqContent',           label: '❓ FAQ Content',              color: '#f97316' },
];

export default function ContentEngineTab({ data }) {
  if (!data) return null;

  return (
    <div>
      {/* Topic Pillars */}
      <div style={S.section}>
        <p className="section-title">🏛️ Topic Pillars</p>
        <div style={S.grid2}>
          {data.topicPillars?.map((pillar, i) => (
            <div key={i} style={S.card}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{pillar.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 12 }}>{pillar.angle}</p>
              <p style={S.label}>Key Questions</p>
              <ul style={{ paddingLeft: 16, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 }}>
                {pillar.keyQuestions?.map((q, j) => <li key={j}>{q}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Strategy */}
      {data.seoStrategy && (
        <div style={S.section}>
          <p className="section-title">🔍 SEO Strategy</p>
          <div style={S.card}>
            <div style={{ marginBottom: 16 }}>
              <p style={S.label}>Primary Keyword</p>
              <p style={{ fontFamily: 'monospace', color: 'var(--accent-light)', fontSize: 15, fontWeight: 600 }}>{data.seoStrategy.primaryKeyword}</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={S.label}>Secondary Keywords</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.seoStrategy.secondaryKeywords?.map((kw, i) => <span key={i} style={S.pill('#6c63ff')}>{kw}</span>)}
              </div>
            </div>
            {data.seoStrategy.longTailClusters && (
              <div style={{ marginBottom: 16 }}>
                <p style={S.label}>Long-tail Clusters</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.seoStrategy.longTailClusters.map((cluster, i) => (
                    <div key={i} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>📌 {cluster.pillar}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {cluster.keywords?.map((kw, j) => <span key={j} style={{ ...S.pill('#8b5cf6'), fontSize: 11 }}>{kw}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ padding: '12px 14px', background: 'rgba(108,99,255,0.08)', borderRadius: 8 }}>
              <p style={S.label}>Topical Authority Plan</p>
              <p style={{ color: 'var(--text)', fontSize: 14, lineHeight: 1.6 }}>{data.seoStrategy.topicalAuthorityPlan}</p>
            </div>
          </div>
        </div>
      )}

      {/* Article Types */}
      {ARTICLE_TYPES.map(({ key, label, color }) => (
        data[key]?.length > 0 && (
          <div key={key} style={S.section}>
            <p className="section-title">{label}</p>
            <div style={S.grid2}>
              {data[key].map((article, i) => (
                <div key={i} style={{ ...S.card, borderLeft: `3px solid ${color}` }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{article.title}</p>
                  {article.keyword && <p style={{ color, fontSize: 11, fontFamily: 'monospace', marginBottom: 6 }}>{article.keyword}</p>}
                  {article.angle && <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 6 }}>{article.angle}</p>}
                  {article.hook && <p style={{ color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic' }}>“{article.hook}”</p>}
                  {article.arc && <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{article.arc}</p>}
                  {article.trend && <p style={{ color, fontSize: 12 }}>Trend: {article.trend}</p>}
                  {article.count && <span style={S.pill(color)}>Top {article.count}</span>}
                  {article.products && (
                    <div style={{ marginTop: 6 }}>
                      {article.products.map((p, j) => <span key={j} style={{ ...S.pill('#8888aa'), fontSize: 11 }}>{p}</span>)}
                    </div>
                  )}
                  {article.questions && (
                    <ul style={{ paddingLeft: 14, marginTop: 8, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8 }}>
                      {article.questions.slice(0, 3).map((q, j) => <li key={j}>{q}</li>)}
                    </ul>
                  )}
                  {article.outline && (
                    <ol style={{ paddingLeft: 14, marginTop: 8, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.8 }}>
                      {article.outline.slice(0, 4).map((o, j) => <li key={j}>{o}</li>)}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Social Content Ideas */}
      {data.socialContentIdeas?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">📱 Social Content Ideas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {data.socialContentIdeas.map((idea, i) => (
              <div key={i} style={S.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={S.pill('#6c63ff')}>{idea.platform}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{idea.format}</span>
                </div>
                <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{idea.idea}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, fontStyle: 'italic' }}>“{idea.hook}”</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Calendar */}
      {data.contentCalendar?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">📅 4-Week Content Calendar</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {data.contentCalendar.map((week, i) => (
              <div key={i} style={S.card}>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--accent-light)', marginBottom: 12 }}>Week {week.week}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {week.items?.map((item, j) => (
                    <div key={j} style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.day}</span>
                        <span style={{ fontSize: 11, color: 'var(--accent-light)' }}>{item.platform}</span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</p>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
