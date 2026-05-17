import Link from 'next/link';

const productFeatures = [
  { icon: '🎬', title: '10 Video Scripts', desc: 'Hook-led short-form scripts for TikTok, Reels, and Shorts' },
  { icon: '📌', title: '5 Pinterest Pins', desc: 'Title, description, and board placement for each pin' },
  { icon: '🎥', title: 'Influencer Prompts', desc: 'UGC-style video prompts your creators can shoot today' },
  { icon: '✍️', title: 'SEO Blog Post', desc: 'Full 1,500-word post with H2s, FAQs, and affiliate placement' },
  { icon: '📧', title: 'Email & SMS Sequences', desc: '3-email nurture sequence plus 3 high-converting SMS blasts' },
  { icon: '📱', title: 'Captions & Hashtags', desc: 'Platform-optimised captions for Instagram, TikTok, and X' },
];

const storefrontFeatures = [
  { icon: '🏗️', title: 'Storefront Blueprint', desc: 'Full site architecture: homepage, collections, category & special pages' },
  { icon: '📝', title: 'Content Engine', desc: 'Topic pillars, SEO clusters, 35+ article ideas + 4-week content calendar' },
  { icon: '🧠', title: 'Product Psychology', desc: 'Emotional drivers, identity buying, transformation + status psychology' },
  { icon: '💡', title: 'Conversion System', desc: 'CTA systems, trust signals, comparison tables, review structures' },
  { icon: '👥', title: 'Community & Retention', desc: 'Newsletter, loyalty tiers, VIP system, repeat-visit strategies' },
  { icon: '📱', title: 'Social Discovery', desc: 'TikTok, Pinterest, Instagram, YouTube + SEO + AI-search strategies' },
];

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>Affiliate Content Machine</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/storefront" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              Storefront Engine
            </Link>
            <Link href="/generate" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Content Machine →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 20 }}>AI-powered affiliate ecosystem</div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1.5px',
            marginBottom: 24,
          }}>
            Two engines.<br />
            <span style={{ color: 'var(--accent-light)' }}>One complete affiliate system.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Generate a product-by-product content campaign in 60 seconds — or build your complete
            affiliate storefront ecosystem with site architecture, content strategy, psychology, and social discovery.
          </p>
        </div>
      </section>

      {/* Two engine cards */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 24 }}>

            {/* Content Machine */}
            <div className="engine-card" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 200, height: 200,
                background: 'radial-gradient(circle at top right, rgba(108,99,255,0.15), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>⚡</span>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>Content Machine</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>One product → complete content campaign</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
                {productFeatures.map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{f.icon}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13 }}>{f.title}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/generate" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}>
                Generate Campaign →
              </Link>
            </div>

            {/* Storefront Engine */}
            <div className="engine-card" style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(139,133,255,0.04))',
              border: '1px solid rgba(108,99,255,0.3)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 200, height: 200,
                background: 'radial-gradient(circle at top right, rgba(108,99,255,0.25), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 32 }}>🏪</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>Storefront Engine</h2>
                    <span className="tag" style={{ fontSize: 10, padding: '2px 8px' }}>NEW</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Complete affiliate ecosystem blueprint</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
                Build your entire affiliate storefront strategy — site architecture, SEO content engine,
                product psychology, conversion systems, community, and social discovery.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 28 }}>
                {storefrontFeatures.map((f) => (
                  <div key={f.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2 }}>{f.icon}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 13 }}>{f.title}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/storefront" style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
                <button style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: 8,
                  background: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '-0.3px',
                }}>
                  Build My Storefront Strategy →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
