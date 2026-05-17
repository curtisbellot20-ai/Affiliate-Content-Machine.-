import { getAnthropicClient } from './anthropicClient.js';

const SCHEMA = `{
  "storefrontName": "string",
  "tagline": "string",
  "positioningStatement": "string",

  "storefrontBlueprint": {
    "homepage": {
      "heroHeadline": "string",
      "heroSubheadline": "string",
      "heroCTA": "string",
      "heroSubCTA": "string",
      "sections": [{"name":"string","purpose":"string","contentBrief":"string"}],
      "trustSignals": ["string"],
      "featuredCollections": ["string"]
    },
    "navigation": {
      "primary": [{"label":"string","slug":"string","description":"string"}],
      "collections": [{"name":"string","slug":"string","angle":"string"}]
    },
    "keyPages": [
      {"type":"buyer_guide","title":"string","targetKeyword":"string","angle":"string","outline":["string"]},
      {"type":"comparison","title":"string","targetKeyword":"string","angle":"string","outline":["string"]},
      {"type":"top_list","title":"string","targetKeyword":"string","angle":"string","outline":["string"]},
      {"type":"review","title":"string","targetKeyword":"string","angle":"string","outline":["string"]},
      {"type":"faq","title":"string","targetKeyword":"string","angle":"string","outline":["string"]},
      {"type":"recommendation","title":"string","targetKeyword":"string","angle":"string","outline":["string"]}
    ],
    "blogSystem": {
      "name": "string",
      "tagline": "string",
      "categories": [{"name":"string","pillarTopic":"string","monthlyPosts":2}],
      "cornerStoneContent": [{"title":"string","keyword":"string","wordCount":2000,"outline":["string"]}]
    },
    "leadMagnet": {
      "title": "string",
      "format": "string",
      "deliveryMethod": "string",
      "value": "string",
      "cta": "string",
      "thankYouMessage": "string"
    },
    "emailCapture": {
      "placements": ["string"],
      "incentive": "string",
      "buttonText": "string",
      "privacyNote": "string"
    }
  },

  "contentEngine": {
    "topicPillars": [{"name":"string","angle":"string","keyQuestions":["string"]}],
    "seoStrategy": {
      "primaryKeyword": "string",
      "secondaryKeywords": ["string"],
      "longTailClusters": [{"pillar":"string","keywords":["string"]}],
      "topicalAuthorityPlan": "string"
    },
    "bestProductsArticles": [{"title":"string","angle":"string","keyword":"string"}],
    "comparisonArticles": [{"title":"string","products":["string"],"angle":"string"}],
    "topLists": [{"title":"string","count":10,"angle":"string"}],
    "buyerGuides": [{"title":"string","audience":"string","outline":["string"]}],
    "emotionalStories": [{"title":"string","hook":"string","arc":"string"}],
    "trendContent": [{"title":"string","trend":"string","angle":"string"}],
    "faqContent": [{"title":"string","questions":["string"]}],
    "socialContentIdeas": [{"platform":"string","format":"string","idea":"string","hook":"string"}],
    "contentCalendar": [
      {"week":1,"items":[{"day":"string","type":"string","title":"string","platform":"string"}]},
      {"week":2,"items":[{"day":"string","type":"string","title":"string","platform":"string"}]},
      {"week":3,"items":[{"day":"string","type":"string","title":"string","platform":"string"}]},
      {"week":4,"items":[{"day":"string","type":"string","title":"string","platform":"string"}]}
    ]
  },

  "productPsychology": {
    "emotionalDrivers": [{"driver":"string","description":"string","contentAngle":"string"}],
    "identityBuying": {"identityStatement":"string","tribeDescriptor":"string","selfConceptAngles":["string"]},
    "aspirationalPositioning": {"before":"string","after":"string","bridge":"string","contentAngles":["string"]},
    "fandomPsychology": {"communityName":"string","rituals":["string"],"insiderLanguage":["string"],"contentAngles":["string"]},
    "statusPsychology": {"statusSignifiers":["string"],"exclusivityAngles":["string"],"socialCurrencyIdeas":["string"]},
    "transformationPsychology": {"beforeIdentity":"string","afterIdentity":"string","microTransformations":["string"],"contentAngles":["string"]},
    "buyingTriggers": [{"trigger":"string","copy":"string","useIn":["string"]}]
  },

  "conversionSystem": {
    "ctaSystem": {"primary":"string","secondary":"string","urgency":"string","variations":["string"],"placements":["string"]},
    "trustSystem": {
      "signals": [{"signal":"string","placement":"string","copy":"string"}],
      "socialProofTypes": ["string"],
      "credibilityMarkers": ["string"],
      "transparencyElements": ["string"]
    },
    "recommendationSections": [{"name":"string","trigger":"string","angle":"string","productCount":3}],
    "urgencyTactics": [{"tactic":"string","ethical":true,"copy":"string"}],
    "productStorytelling": [{"format":"string","structure":["string"],"example":"string"}],
    "reviewStructure": {"sections":["string"],"ratingCategories":["string"],"proConFormat":"string"},
    "comparisonTable": {"headers":["string"],"scoringCriteria":["string"],"calloutIdeas":["string"]}
  },

  "communityRetention": {
    "newsletter": {
      "name": "string",
      "tagline": "string",
      "frequency": "string",
      "pillars": ["string"],
      "subjectFormulas": ["string"],
      "welcomeSequence": [{"email":1,"subject":"string","preview":"string","keyContent":"string"}]
    },
    "loyaltyProgram": {
      "name": "string",
      "tiers": [{"name":"string","requirement":"string","perks":["string"]}],
      "pointsEarning": "string",
      "gamification": ["string"]
    },
    "communityIdeas": [{"platform":"string","format":"string","name":"string","value":"string"}],
    "vipSystem": {"name":"string","benefits":["string"],"accessMethod":"string","exclusiveContent":["string"]},
    "repeatVisitStrategies": ["string"],
    "socialEngagement": [{"platform":"string","tactic":"string","frequency":"string"}]
  },

  "socialDiscovery": {
    "tiktok": {
      "strategy": "string",
      "videoIdeas": [{"hook":"string","concept":"string","cta":"string"}],
      "formats": ["string"],
      "hashtags": {"branded":["string"],"niche":["string"]},
      "bestTimes": ["string"]
    },
    "pinterest": {
      "boards": [{"name":"string","description":"string","pinTypes":["string"]}],
      "pinIdeas": [{"title":"string","description":"string","keyword":"string"}],
      "strategy": "string",
      "affiliateApproach": "string"
    },
    "instagram": {
      "contentMix": {"reels":"40%","carousels":"30%","stories":"20%","posts":"10%"},
      "reelIdeas": [{"hook":"string","concept":"string"}],
      "carouselIdeas": [{"headline":"string","slides":["string"]}],
      "captionFormulas": ["string"]
    },
    "youtube": {
      "positioning": "string",
      "shortsIdeas": [{"hook":"string","concept":"string"}],
      "longFormIdeas": [{"title":"string","outline":["string"]}],
      "thumbnailStrategy": "string"
    },
    "seoContentClusters": [{"pillar":"string","clusterKeywords":["string"]}],
    "aiSearchOptimization": {
      "strategy": "string",
      "answerBoxTargets": ["string"],
      "conversationalQueries": ["string"],
      "entityBuilding": ["string"]
    }
  }
}`;

export async function generateStorefront(intake) {
  const client = await getAnthropicClient();

  const system = `You are the Affiliate Storefront Strategy Engine — 8 elite specialists collaborating:
1. Storefront Architect — designs full affiliate site structures
2. Content Strategist — builds SEO-rich content ecosystems
3. Product Psychologist — analyzes emotional buying behavior
4. Conversion Optimizer — engineers CTA and trust systems
5. Community Builder — designs retention and loyalty systems
6. Social Media Strategist — platform-specific discovery plans
7. SEO Specialist — keyword clusters and topical authority
8. Email Marketing Expert — lead magnets and nurture sequences

Generate deeply specific, niche-relevant strategies. Every title, keyword, and tactic must be directly relevant to the exact niche and audience provided. Be specific — never generic.

Return ONLY valid JSON matching the schema. No markdown, no explanation, no code blocks.`;

  const user = `Affiliate Storefront Strategy Request:

Niche: ${intake.niche}
Sub-niche: ${intake.subNiche || 'N/A'}
Brand Name: ${intake.brandName}
Target Audience: ${intake.targetAudience}
Audience Age Range: ${intake.audienceAge || 'N/A'}
Audience Core Motivation: ${intake.audienceMotivation}
Brand Voice: ${intake.brandVoice}
Brand Values: ${intake.brandValues}
Content Style: ${intake.contentStyle}
Main Platforms: ${Array.isArray(intake.platforms) ? intake.platforms.join(', ') : intake.platforms}
Affiliate Programs: ${intake.affiliatePrograms}
Primary Goal: ${intake.primaryGoal}
Revenue Target: ${intake.revenueTarget || 'N/A'}
Unique Angle: ${intake.uniqueAngle || 'N/A'}

Generate the complete affiliate storefront ecosystem. Be highly specific to "${intake.niche}" — every idea, title, and keyword must be niche-relevant.

Fill all arrays to reasonable depth (4-7 items per array). Return ONLY this JSON schema:\n${SCHEMA}`;

  const res = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 8000,
    system,
    messages: [{ role: 'user', content: user }],
  });

  const raw = res.content[0].text.trim();
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(cleaned);
}
