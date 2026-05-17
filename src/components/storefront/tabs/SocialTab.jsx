const S = {
  section: { marginBottom: 36 },
  label: { fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 },
  pill: (color) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: color + '22', color, border: `1px solid ${color}44`, marginRight: 6, marginBottom: 6 }),
  list: { paddingLeft: 16, color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.8 },
};

const PLATFORM_COLORS = {
  TikTok: '#ff0050', Pinterest: '#e60023', Instagram: '#e1306c',
  YouTube: '#ff0000', SEO: '#22c55e',
};

function PlatformSection({ emoji, label, color, children }) {
  return (
    <div style={S.section}>
      <p className="section-title">{emoji} {label}</p>
      <div style={{ ...S.card, borderTop: `3px solid ${color}` }}>
        {children}
      </div>
    </div>
  );
}

export default function SocialTab({ data }) {
  if (!data) return null;
  const { tiktok, pinterest, instagram, youtube, seoContentClusters, aiSearchOptimization } = data;

  return (
    <div>
      {/* TikTok */}
      {tiktok && (
        <PlatformSection emoji="🎟️" label="TikTok Strategy" color={PLATFORM_COLORS.TikTok}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{tiktok.strategy}</p>
          <div style={S.grid2}>
            <div>
              <p style={S.label}>Video Ideas</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {tiktok.videoIdeas?.map((v, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,0,80,0.06)', borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: PLATFORM_COLORS.TikTok, fontWeight: 700, marginBottom: 2 }}>HOOK</p>
                    <p style={{ fontStyle: 'italic', marginBottom: 4, fontSize: 13 }}>“{v.hook}”</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 4 }}>{v.concept}</p>
                    {v.cta && <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>CTA: {v.cta}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={S.label}>Content Formats</p>
              <ul style={S.list}>{tiktok.formats?.map((f, i) => <li key={i}>{f}</li>)}</ul>
              <p style={{ ...S.label, marginTop: 16 }}>Hashtag Strategy</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Branded</p>
              <div>{tiktok.hashtags?.branded?.map((h, i) => <span key={i} style={S.pill(PLATFORM_COLORS.TikTok)}>#{h}</span>)}</div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, marginBottom: 6 }}>Niche</p>
              <div>{tiktok.hashtags?.niche?.map((h, i) => <span key={i} style={S.pill('#8888aa')}>#{h}</span>)}</div>
              {tiktok.bestTimes?.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p style={S.label}>Best Post Times</p>
                  <ul style={S.list}>{tiktok.bestTimes.map((t, i) => <li key={i}>{t}</li>)}</ul>
                </div>
              )}
            </div>
          </div>
        </PlatformSection>
      )}

      {/* Pinterest */}
      {pinterest && (
        <PlatformSection emoji="📌" label="Pinterest Strategy" color={PLATFORM_COLORS.Pinterest}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{pinterest.strategy}</p>
          <div style={S.grid2}>
            <div>
              <p style={S.label}>Board Structure</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pinterest.boards?.map((board, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(230,0,35,0.06)', borderRadius: 8 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{board.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 6 }}>{board.description}</p>
                    <div>{board.pinTypes?.map((t, j) => <span key={j} style={{ ...S.pill('#e60023'), fontSize: 10 }}>{t}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={S.label}>Pin Ideas</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pinterest.pinIdeas?.map((pin, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '2px solid #e60023' }}>
                    <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{pin.title}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 4 }}>{pin.description}</p>
                    <p style={{ fontSize: 11, fontFamily: 'monospace', color: '#e60023' }}>{pin.keyword}</p>
                  </div>
                ))}
              </div>
              {pinterest.affiliateApproach && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(230,0,35,0.06)', borderRadius: 8 }}>
                  <p style={S.label}>Affiliate Approach</p>
                  <p style={{ fontSize: 13 }}>{pinterest.affiliateApproach}</p>
                </div>
              )}
            </div>
          </div>
        </PlatformSection>
      )}

      {/* Instagram */}
      {instagram && (
        <PlatformSection emoji="📸" label="Instagram Strategy" color={PLATFORM_COLORS.Instagram}>
          {instagram.contentMix && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {Object.entries(instagram.contentMix).map(([type, pct]) => (
                <div key={type} style={{ padding: '10px 16px', background: 'rgba(225,48,108,0.08)', borderRadius: 8, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: 20, color: PLATFORM_COLORS.Instagram }}>{pct}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{type}</p>
                </div>
              ))}
            </div>
          )}
          <div style={S.grid2}>
            <div>
              <p style={S.label}>Reel Ideas</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {instagram.reelIdeas?.map((r, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(225,48,108,0.06)', borderRadius: 8 }}>
                    <p style={{ fontSize: 11, color: PLATFORM_COLORS.Instagram, fontWeight: 700, marginBottom: 2 }}>HOOK</p>
                    <p style={{ fontStyle: 'italic', fontSize: 13, marginBottom: 4 }}>“{r.hook}”</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{r.concept}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={S.label}>Carousel Ideas</p>
              {instagram.carouselIdeas?.map((c, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 8 }}>
                  <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{c.headline}</p>
                  <ol style={{ paddingLeft: 14, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>
                    {c.slides?.slice(0, 4).map((s, j) => <li key={j}>{s}</li>)}
                  </ol>
                </div>
              ))}
              <p style={{ ...S.label, marginTop: 12 }}>Caption Formulas</p>
              {instagram.captionFormulas?.map((f, i) => (
                <div key={i} style={{ padding: '6px 10px', background: 'rgba(225,48,108,0.06)', borderRadius: 6, marginBottom: 6, fontSize: 13, fontStyle: 'italic' }}>“{f}”</div>
              ))}
            </div>
          </div>
        </PlatformSection>
      )}

      {/* YouTube */}
      {youtube && (
        <PlatformSection emoji="🎥" label="YouTube Strategy" color={PLATFORM_COLORS.YouTube}>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>{youtube.positioning}</p>
          <div style={S.grid2}>
            <div>
              <p style={S.label}>Shorts Ideas</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {youtube.shortsIdeas?.map((s, i) => (
                  <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,0,0,0.06)', borderRadius: 8 }}>
                    <p style={{ fontStyle: 'italic', fontSize: 13, marginBottom: 4 }}>“{s.hook}”</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>{s.concept}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={S.label}>Long-form Ideas</p>
              {youtube.longFormIdeas?.map((v, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, marginBottom: 8 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{v.title}</p>
                  <ol style={{ paddingLeft: 14, color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>
                    {v.outline?.slice(0, 4).map((o, j) => <li key={j}>{o}</li>)}
                  </ol>
                </div>
              ))}
              {youtube.thumbnailStrategy && (
                <div style={{ marginTop: 10, padding: '10px 12px', background: 'rgba(255,0,0,0.06)', borderRadius: 8 }}>
                  <p style={S.label}>Thumbnail Strategy</p>
                  <p style={{ fontSize: 13 }}>{youtube.thumbnailStrategy}</p>
                </div>
              )}
            </div>
          </div>
        </PlatformSection>
      )}

      {/* SEO Clusters */}
      {seoContentClusters?.length > 0 && (
        <div style={S.section}>
          <p className="section-title">🔍 SEO Content Clusters</p>
          <div style={S.grid2}>
            {seoContentClusters.map((cluster, i) => (
              <div key={i} style={S.card}>
                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent-light)', marginBottom: 10 }}>{cluster.pillar}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {cluster.clusterKeywords?.map((kw, j) => <span key={j} style={{ ...S.pill('#22c55e'), fontSize: 11 }}>{kw}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Search Optimization */}
      {aiSearchOptimization && (
        <div style={S.section}>
          <p className="section-title">🤖 AI Search Optimization (GEO / AEO)</p>
          <div style={S.card}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{aiSearchOptimization.strategy}</p>
            <div style={S.grid2}>
              <div>
                <p style={S.label}>Answer Box Targets</p>
                <ul style={S.list}>{aiSearchOptimization.answerBoxTargets?.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
              <div>
                <p style={S.label}>Conversational Queries</p>
                {aiSearchOptimization.conversationalQueries?.map((q, i) => (
                  <div key={i} style={{ padding: '6px 10px', background: 'rgba(108,99,255,0.08)', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>{q}</div>
                ))}
              </div>
            </div>
            {aiSearchOptimization.entityBuilding?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <p style={S.label}>Entity Building Strategy</p>
                <ul style={S.list}>{aiSearchOptimization.entityBuilding.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
