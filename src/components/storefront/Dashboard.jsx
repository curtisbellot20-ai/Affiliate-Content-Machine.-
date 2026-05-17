'use client';
import { useState } from 'react';
import BlueprintTab from './tabs/BlueprintTab';
import ContentEngineTab from './tabs/ContentEngineTab';
import PsychologyTab from './tabs/PsychologyTab';
import ConversionTab from './tabs/ConversionTab';
import CommunityTab from './tabs/CommunityTab';
import SocialTab from './tabs/SocialTab';

const TABS = [
  { id: 'blueprint',  label: '🏗️ Storefront Blueprint', short: 'Blueprint' },
  { id: 'content',    label: '📝 Content Engine',        short: 'Content' },
  { id: 'psychology', label: '🧠 Product Psychology',    short: 'Psychology' },
  { id: 'conversion', label: '💡 Conversion System',     short: 'Conversion' },
  { id: 'community',  label: '👥 Community & Retention', short: 'Community' },
  { id: 'social',     label: '📱 Social Discovery',       short: 'Social' },
];

export default function StorefrontDashboard({ storefront }) {
  const [activeTab, setActiveTab] = useState('blueprint');

  return (
    <div>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', padding: '28px 0 0', marginBottom: 0 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 4 }}>
                {storefront.storefrontName}
              </h1>
              <p style={{ color: 'var(--accent-light)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                {storefront.tagline}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 600, lineHeight: 1.5 }}>
                {storefront.positioningStatement}
              </p>
            </div>
          </div>

          {/* Tab navigation */}
          <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 0 }}>
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 600,
                border: 'none',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                background: activeTab === tab.id ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
                <span className="hidden-sm">{tab.label}</span>
                <span className="show-sm">{tab.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="container" style={{ padding: '32px 24px 80px' }}>
        {activeTab === 'blueprint'  && <BlueprintTab  data={storefront.storefrontBlueprint} />}
        {activeTab === 'content'    && <ContentEngineTab data={storefront.contentEngine} />}
        {activeTab === 'psychology' && <PsychologyTab  data={storefront.productPsychology} />}
        {activeTab === 'conversion' && <ConversionTab  data={storefront.conversionSystem} />}
        {activeTab === 'community'  && <CommunityTab   data={storefront.communityRetention} />}
        {activeTab === 'social'     && <SocialTab      data={storefront.socialDiscovery} />}
      </div>

      <style>{`.hidden-sm { display: inline; } .show-sm { display: none; }
        @media (max-width: 640px) { .hidden-sm { display: none; } .show-sm { display: inline; } }`}
      </style>
    </div>
  );
}
