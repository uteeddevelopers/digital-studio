// Only the approved production hostname, or an explicit local test, can send data.
const measurementId = 'G-ENJL47GT6J';
const productionHost = 'choi2025171027.ai2ax.com';
const allowedEvents = new Set(['blog_open', 'source_open']);
const allowedContent = new Set(['logo-size-2025', 'anthropomorphism-2026']);
const allowedRoutes = new Set(['profile', 'interests', 'publications', 'awards', 'alumni', 'blog']);
const campaignValues = {
  utm_source: ['instagram', 'class'],
  utm_medium: ['social', 'referral'],
  utm_campaign: ['research_2026', 'session09_test'],
  utm_content: ['profile', 'post', 'carousel', 'shortform'],
};
let initialized = false;
let currentPage = `https://${productionHost}/#profile`;

function canSend() {
  const localTest = import.meta.env.DEV && ['localhost', '127.0.0.1'].includes(location.hostname)
    && new URLSearchParams(location.search).get('ga_test') === '1';
  return location.hostname === productionHost || localTest;
}

function campaignConfig() {
  const params = new URLSearchParams(location.search);
  const keys = { utm_source: 'campaign_source', utm_medium: 'campaign_medium', utm_campaign: 'campaign_name', utm_content: 'campaign_content' };
  return Object.fromEntries(Object.entries(campaignValues)
    .filter(([key, values]) => values.includes(params.get(key)))
    .map(([key]) => [keys[key], params.get(key)]));
}

function initAnalytics() {
  if (initialized || !canSend()) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  // Never send the arbitrary browser URL, query string, title, or referrer.
  window.gtag('set', { page_location: currentPage, page_referrer: '', page_title: 'Choi Lab' });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...campaignConfig(),
  });
  const script = document.createElement('script');
  script.async = true;
  script.referrerPolicy = 'no-referrer';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function recordResearchClick(event, contentId) {
  if (!allowedEvents.has(event) || !allowedContent.has(contentId)) return;
  if (import.meta.env.DEV) console.info(JSON.stringify({ event, content_id: contentId, time: new Date().toISOString() }));
  initAnalytics();
  if (initialized) window.gtag('event', event, { content_id: contentId, page_location: currentPage, page_referrer: '', page_title: 'Choi Lab' });
}

export function recordPageView(route, contentId, page) {
  if (!allowedRoutes.has(route)) return;
  const payload = { event: 'page_view', route, time: new Date().toISOString() };
  if (route === 'blog' && allowedContent.has(contentId)) payload.content_id = contentId;
  if (route === 'publications' && Number.isSafeInteger(page) && page > 0) payload.page = page;
  if (import.meta.env.DEV) console.info(JSON.stringify(payload));
  const suffix = route === 'blog' && allowedContent.has(contentId) ? `?article=${contentId}`
    : route === 'publications' && Number.isSafeInteger(page) && page > 0 ? `?page=${page}` : '';
  currentPage = `https://${productionHost}/#${route}${suffix}`;
  const alreadyInitialized = initialized;
  initAnalytics();
  if (initialized && alreadyInitialized) {
    window.gtag('set', { page_location: currentPage, page_referrer: '', page_title: 'Choi Lab' });
    window.gtag('event', 'page_view', { page_location: currentPage, page_referrer: '', page_title: 'Choi Lab', route });
  }
  // This property's Google tag was upgraded to a GTM container whose
  // initialization tag sends the first page_view independently of config.
  // Subsequent hash navigation uses the explicit event above.
}
