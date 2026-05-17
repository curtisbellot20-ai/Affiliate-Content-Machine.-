'use client';
import { useState } from 'react';
import StorefrontIntakeForm from '@/components/storefront/IntakeForm';
import StorefrontDashboard from '@/components/storefront/Dashboard';
import Link from 'next/link';

const STEPS = [
  'Analyzing niche & competitive landscape…',
  'Architecting your storefront structure…',
  'Building content engine & SEO clusters…',
  'Mapping product psychology & buying triggers…',
  'Engineering conversion & trust systems…',
  'Designing community & retention plan…',
  'Mapping social discovery strategies…',
  'Assembling your complete ecosystem…',
];

function LoadingScreen({ step }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        border: '3px solid rgba(108,99,255,0.2)',
        borderTopColor: 'var(--accent)',
        animation: 'spin 1s linear infinite',
        marginBottom: 32,
      }} />
      <p style={{ fontSize: 13, color: 'var(--accent-light)', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
        Building Your Storefront Ecosystem
      </p>
      <p style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{STEPS[step % STEPS.length]}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Claude Opus is building 6 complete strategy systems for you.</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function StorefrontPage() {
  const [appState, setAppState] = useState('idle'); // idle | generating | complete | error
  const [loadingStep, setLoadingStep] = useState(0);
  const [storefront, setStorefront] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerate(intake) {
    setAppState('generating');
    setLoadingStep(0);
    setError(null);

    // Cycle through loading steps
    const interval = setInterval(() => {
      setLoadingStep((s) => s + 1);
    }, 3500);

    try {
      const res = await fetch('/api/storefront/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake),
      });
      clearInterval(interval);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setStorefront(data);
      setAppState('complete');
    } catch (err) {
      clearInterval(interval);
      setError(err.message);
      setAppState('error');
    }
  }

  return (
    <main>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid var(--border)', padding: '16px 0',
        position: 'sticky', top: 0, background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(12px)', zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/" style={{ fontSize: 22, textDecoration: 'none' }}>⚡</Link>
            <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>/</span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Storefront Engine</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {appState === 'complete' && (
              <button className="btn btn-secondary" onClick={() => setAppState('idle')} style={{ fontSize: 13 }}>
                ← New Strategy
              </button>
            )}
            <span className="tag" style={{ fontSize: 11 }}>NEW</span>
          </div>
        </div>
      </nav>

      {/* States */}
      {appState === 'idle' && (
        <div style={{ padding: '60px 0' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="tag" style={{ marginBottom: 16 }}>🏪 Affiliate Storefront Engine</div>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1px', marginBottom: 16 }}>
                Build Your Complete<br />
                <span style={{ color: 'var(--accent-light)' }}>Affiliate Ecosystem</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
                Answer 4 steps about your niche, brand, and goals. Get a complete storefront strategy
                covering architecture, content, psychology, conversion, community, and social discovery.
              </p>
            </div>
            <div className="card">
              <StorefrontIntakeForm onSubmit={handleGenerate} isGenerating={false} />
            </div>
          </div>
        </div>
      )}

      {appState === 'generating' && (
        <div className="container">
          <LoadingScreen step={loadingStep} />
        </div>
      )}

      {appState === 'error' && (
        <div className="container" style={{ padding: '80px 0', maxWidth: 540 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>❌</div>
            <h2 style={{ marginBottom: 8 }}>Generation Failed</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{error}</p>
            <button className="btn btn-primary" onClick={() => setAppState('idle')}>Try Again</button>
          </div>
        </div>
      )}

      {appState === 'complete' && storefront && (
        <StorefrontDashboard storefront={storefront} />
      )}
    </main>
  );
}
