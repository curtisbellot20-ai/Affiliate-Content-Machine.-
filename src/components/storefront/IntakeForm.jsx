'use client';
import { useState } from 'react';

const NICHES = [
  { value: 'beauty_skincare', label: '💄 Beauty & Skincare' },
  { value: 'fitness_health', label: '🏋️ Fitness & Health' },
  { value: 'home_garden', label: '🏡 Home & Garden' },
  { value: 'tech_gadgets', label: '📱 Tech & Gadgets' },
  { value: 'fashion_style', label: '👗 Fashion & Style' },
  { value: 'pets_animals', label: '🐾 Pets & Animals' },
  { value: 'food_cooking', label: '🍳 Food & Cooking' },
  { value: 'travel_adventure', label: '✈️ Travel & Adventure' },
  { value: 'parenting_family', label: '👶 Parenting & Family' },
  { value: 'personal_finance', label: '💰 Personal Finance' },
  { value: 'sustainable_living', label: '🌿 Sustainable Living' },
  { value: 'outdoor_survival', label: '🥾 Outdoor & Survival' },
  { value: 'gaming', label: '🎮 Gaming' },
  { value: 'photography', label: '📸 Photography' },
  { value: 'art_crafts', label: '🎨 Art & Crafts' },
  { value: 'other', label: '🔠 Other' },
];

const VOICES = [
  { value: 'friendly_conversational', label: '😊 Friendly & Conversational' },
  { value: 'expert_authoritative', label: '📚 Expert & Authoritative' },
  { value: 'inspiring_motivational', label: '✨ Inspiring & Motivational' },
  { value: 'bold_edgy', label: '🔥 Bold & Edgy' },
  { value: 'warm_nurturing', label: '🌻 Warm & Nurturing' },
  { value: 'luxurious_aspirational', label: '💎 Luxurious & Aspirational' },
  { value: 'playful_humorous', label: '🎉 Playful & Humorous' },
  { value: 'honest_transparent', label: '🤝 Honest & Transparent' },
];

const PLATFORMS = [
  'TikTok', 'Instagram', 'Pinterest', 'YouTube', 'Blog/SEO', 'Facebook', 'X (Twitter)', 'Newsletter',
];

const GOALS = [
  { value: 'passive_income', label: 'Build passive affiliate income' },
  { value: 'authority_site', label: 'Build authority site & brand' },
  { value: 'social_first', label: 'Grow social following & monetize' },
  { value: 'email_list', label: 'Grow email list & sell through it' },
  { value: 'community', label: 'Build a niche community' },
  { value: 'content_brand', label: 'Become go-to content brand in niche' },
];

const STEPS = [
  { id: 'niche', label: 'Niche & Audience', emoji: '🎯' },
  { id: 'brand', label: 'Brand Identity', emoji: '✨' },
  { id: 'content', label: 'Content & Platforms', emoji: '📝' },
  { id: 'goals', label: 'Goals & Monetization', emoji: '💰' },
];

export default function StorefrontIntakeForm({ onSubmit, isGenerating }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    niche: '',
    subNiche: '',
    targetAudience: '',
    audienceAge: '',
    audienceMotivation: '',
    brandName: '',
    brandStory: '',
    brandVoice: '',
    brandValues: '',
    uniqueAngle: '',
    contentStyle: '',
    platforms: [],
    affiliatePrograms: '',
    primaryGoal: '',
    revenueTarget: '',
  });

  const set = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const togglePlatform = (p) => {
    set('platforms', data.platforms.includes(p)
      ? data.platforms.filter((x) => x !== p)
      : [...data.platforms, p]
    );
  };

  const canAdvance = () => {
    if (step === 0) return data.niche && data.targetAudience && data.audienceMotivation;
    if (step === 1) return data.brandName && data.brandVoice && data.brandValues;
    if (step === 2) return data.contentStyle && data.platforms.length > 0 && data.affiliatePrograms;
    if (step === 3) return data.primaryGoal;
    return true;
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 14, outline: 'none',
  };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 };

  const OptionCard = ({ value, label, selected, onClick }) => (
    <button type="button" onClick={onClick} style={{
      padding: '10px 14px', borderRadius: 8, textAlign: 'left', fontSize: 13, fontWeight: 500,
      background: selected ? 'var(--accent-dim)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
      color: selected ? 'var(--accent-light)' : 'var(--text-muted)',
      cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );

  return (
    <div>
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, overflowX: 'auto' }}>
        {STEPS.map((s, i) => (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: i < step ? 'var(--green)' : i === step ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${i <= step ? 'transparent' : 'var(--border)'}`,
                color: i <= step ? '#fff' : 'var(--text-muted)',
              }}>
                {i < step ? '✓' : s.emoji}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: i === step ? 'var(--text)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, background: i < step ? 'var(--accent)' : 'var(--border)', margin: '0 12px' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Niche & Audience */}
      {step === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={labelStyle}>Your Niche *</label>
            <div style={gridStyle}>
              {NICHES.map((n) => (
                <OptionCard key={n.value} value={n.value} label={n.label}
                  selected={data.niche === n.value} onClick={() => set('niche', n.value)} />
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Sub-niche (optional)</label>
            <input style={inputStyle} placeholder="e.g. anti-aging skincare, home gym equipment, vegan cooking"
              value={data.subNiche} onChange={(e) => set('subNiche', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Describe your target audience *</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3}
              placeholder="e.g. Women 28-45 who want clean, effective skincare without harsh chemicals. Health-conscious and willing to pay for quality."
              value={data.targetAudience} onChange={(e) => set('targetAudience', e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Audience age range</label>
              <input style={inputStyle} placeholder="e.g. 25–45" value={data.audienceAge} onChange={(e) => set('audienceAge', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Core buying motivation *</label>
              <input style={inputStyle} placeholder="e.g. look younger, save time, feel confident"
                value={data.audienceMotivation} onChange={(e) => set('audienceMotivation', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Brand Identity */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Brand / Site Name *</label>
              <input style={inputStyle} placeholder="e.g. Glow Lab, The Fit Shelf, Gear Nest"
                value={data.brandName} onChange={(e) => set('brandName', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Unique angle or story</label>
              <input style={inputStyle} placeholder="e.g. tested by a former aesthetician"
                value={data.uniqueAngle} onChange={(e) => set('uniqueAngle', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Brand Voice *</label>
            <div style={gridStyle}>
              {VOICES.map((v) => (
                <OptionCard key={v.value} value={v.value} label={v.label}
                  selected={data.brandVoice === v.value} onClick={() => set('brandVoice', v.value)} />
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Brand Values *</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2}
              placeholder="e.g. Transparency, ingredient integrity, cruelty-free, results-driven"
              value={data.brandValues} onChange={(e) => set('brandValues', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Brand Story (optional)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2}
              placeholder="e.g. Started after struggling with sensitive skin and spending years testing hundreds of products"
              value={data.brandStory} onChange={(e) => set('brandStory', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 2: Content & Platforms */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={labelStyle}>Content Style *</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2}
              placeholder="e.g. In-depth honest reviews with personal testing, Before/after storytelling, Educational 'what to avoid' content"
              value={data.contentStyle} onChange={(e) => set('contentStyle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Main Platforms * (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {PLATFORMS.map((p) => (
                <OptionCard key={p} value={p} label={p}
                  selected={data.platforms.includes(p)} onClick={() => togglePlatform(p)} />
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Affiliate Programs *</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2}
              placeholder="e.g. Amazon Associates, ShareASale, Sephora Affiliate, LTK, direct brand programs"
              value={data.affiliatePrograms} onChange={(e) => set('affiliatePrograms', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 3: Goals & Monetization */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <label style={labelStyle}>Primary Goal *</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {GOALS.map((g) => (
                <OptionCard key={g.value} value={g.value} label={g.label}
                  selected={data.primaryGoal === g.value} onClick={() => set('primaryGoal', g.value)} />
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Monthly Revenue Target (optional)</label>
            <input style={inputStyle} placeholder="e.g. $2,000/mo, $10k/mo, replace full-time income"
              value={data.revenueTarget} onChange={(e) => set('revenueTarget', e.target.value)} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 12 }}>
        <button type="button" className="btn btn-secondary" onClick={() => setStep((s) => s - 1)}
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" className="btn btn-primary"
            onClick={() => canAdvance() && setStep((s) => s + 1)}
            style={{ opacity: canAdvance() ? 1 : 0.4, cursor: canAdvance() ? 'pointer' : 'not-allowed' }}>
            Next →
          </button>
        ) : (
          <button type="button" className="btn btn-primary"
            onClick={() => canAdvance() && onSubmit(data)}
            disabled={isGenerating || !canAdvance()}
            style={{ padding: '12px 32px', fontSize: 15, opacity: canAdvance() ? 1 : 0.4 }}>
            {isGenerating ? 'Building Your Ecosystem…' : '⚡ Build My Storefront Strategy'}
          </button>
        )}
      </div>
    </div>
  );
}
