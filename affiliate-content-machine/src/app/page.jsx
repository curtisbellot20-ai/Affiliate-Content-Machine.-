import Link from "next/link";

const features = [
  { icon: "🎬", title: "10 Video Scripts", desc: "Hook-led short-form scripts for TikTok, Reels, and Shorts" },
  { icon: "📌", title: "5 Pinterest Pins", desc: "Title, description, and board placement for each pin" },
  { icon: "🎥", title: "Influencer Prompts", desc: "UGC-style video prompts your creators can shoot today" },
  { icon: "✍️", title: "SEO Blog Post", desc: "Full 1,500-word post with H2s, FAQs, and affiliate placement" },
  { icon: "📧", title: "Email & SMS Sequences", desc: "3-email nurture sequence plus 3 high-converting SMS blasts" },
  { icon: "📱", title: "Captions & Hashtags", desc: "Platform-optimised captions for Instagram, TikTok, and X" },
];

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        padding: "16px 0",
        position: "sticky",
        top: 0,
        background: "rgba(10,10,15,0.9)",
        backdropFilter: "blur(12px)",
        zIndex: 100,
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>Affiliate Content Machine</span>
          </div>
          <Link href="/generate" className="btn btn-primary" style={{ textDecoration: "none" }}>
            Start generating →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 0 80px", textAlign: "center" }}>
        <div className="container">
          <div className="tag" style={{ marginBottom: 20 }}>AI-powered content engine</div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            marginBottom: 24,
          }}>
            One affiliate link.<br />
            <span style={{ color: "var(--accent-light)" }}>An entire campaign.</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Paste any product URL and get 30+ pieces of high-converting content — video scripts, blog posts, emails, social captions — in under 60 seconds.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/generate" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "14px 32px" }}>
              Generate my campaign →
            </Link>
            <a href="#features" className="btn btn-secondary" style={{ fontSize: 16, padding: "14px 32px" }}>
              See what you get
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "60px 0 100px" }}>
        <div className="container">
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: 12, fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: "uppercase" }}>
            What you get in every campaign
          </p>
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48, letterSpacing: "-0.5px" }}>
            A complete content package
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {features.map((f) => (
              <div key={f.title} className="card" style={{ display: "flex", gap: 16 }}>
                <span style={{ fontSize: 28, lineHeight: 1 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 60 }}>
            <Link href="/generate" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "14px 32px" }}>
              Start for free →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
