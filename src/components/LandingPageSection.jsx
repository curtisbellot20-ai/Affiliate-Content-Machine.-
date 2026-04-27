import CopyButton from "./CopyButton";
import OpenInButton from "./OpenInButton";

export default function LandingPageSection({ landingPage }) {
  if (!landingPage) return null;

  const allText = [
    "=== LANDING PAGE COPY ===",
    "",
    `HEADLINE: ${landingPage.headline}`,
    `SUBHEADLINE: ${landingPage.subheadline}`,
    "",
    "HEADLINE VARIATIONS:",
    ...(landingPage.headlines || []).map((h, i) => `${i + 1}. ${h}`),
    "",
    "EMAIL SUBJECT LINES:",
    ...(landingPage.emailSubjects || landingPage.emailSubjectLines || []).map((s, i) => `${i + 1}. ${s}`),
  ].join("\n");

  const emailSubjects = landingPage.emailSubjects || landingPage.emailSubjectLines || [];

  return (
    <div>
      <div className="section-title">
        <span>🚀</span> Landing Page Copy
        <CopyButton text={allText} label="Copy all" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Primary headline */}
        {landingPage.headline && (
          <div className="card">
            <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)", marginBottom: 10 }}>
              Primary Headline
            </div>
            <p style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3, color: "var(--text)", marginBottom: 14 }}>
              {landingPage.headline}
            </p>
            {landingPage.subheadline && (
              <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 14 }}>
                {landingPage.subheadline}
              </p>
            )}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <CopyButton text={`${landingPage.headline}\n\n${landingPage.subheadline || ""}`} />
              <OpenInButton
                text={`${landingPage.headline}\n\n${landingPage.subheadline || ""}`}
                url="https://www.canva.com/create/landing-pages/"
                label="Canva"
                icon="🎨"
              />
            </div>
          </div>
        )}

        {/* Headline variations */}
        {landingPage.headlines?.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)" }}>
                Headline Variations
              </div>
              <CopyButton text={landingPage.headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")} label="Copy all" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {landingPage.headlines.map((headline, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span className="tag" style={{ flexShrink: 0, minWidth: 24, textAlign: "center" }}>{i + 1}</span>
                  <p style={{ flex: 1, fontSize: 15, fontWeight: 600, lineHeight: 1.4, color: "var(--text)", margin: 0 }}>{headline}</p>
                  <CopyButton text={headline} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email subjects */}
        {emailSubjects.length > 0 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--accent-light)" }}>
                Email Subject Lines
              </div>
              <CopyButton text={emailSubjects.map((s, i) => `${i + 1}. ${s}`).join("\n")} label="Copy all" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {emailSubjects.map((subject, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span className="tag" style={{ flexShrink: 0, minWidth: 24, textAlign: "center" }}>{i + 1}</span>
                  <p style={{ flex: 1, fontSize: 14, lineHeight: 1.5, color: "var(--text)", margin: 0 }}>{subject}</p>
                  <CopyButton text={subject} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
