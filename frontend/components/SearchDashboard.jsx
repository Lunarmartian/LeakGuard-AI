import { useState, useMemo } from 'react'

/* ------------------------------------------------------------------ */
/* Category taxonomy                                                   */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { value: 'all', label: 'All Findings', icon: '🔍' },
  { value: 'email', label: 'Email Address', icon: '📧' },
  { value: 'phone', label: 'Phone Number', icon: '📞' },
  { value: 'aws', label: 'AWS Access Key', icon: '🔑' },
  { value: 'aws-secret', label: 'AWS Secret Key', icon: '🗝️' },
  { value: 'github-token', label: 'GitHub Token', icon: '🐙' },
  { value: 'azure-id', label: 'Azure Identifier', icon: '☁️' },
  { value: 'azure-secret', label: 'Azure Secret', icon: '🔒' },
  { value: 'credit-card', label: 'Credit Card Number', icon: '💳' },
  { value: 'bank-account', label: 'Bank Account Number', icon: '🏦' },
  { value: 'ip-address', label: 'IP Address', icon: '🌐' },
  { value: 'domain', label: 'Domain Name', icon: '🌍' },
  { value: 'url', label: 'URL / Website', icon: '🔗' },
  { value: 'password', label: 'Password', icon: '🔐' },
  { value: 'api-key', label: 'API Key', icon: '🗝️' },
  { value: 'jwt', label: 'JWT Token', icon: '🎫' },
  { value: 'private-key', label: 'Private Key', icon: '🔏' },
  { value: 'ssh-key', label: 'SSH Key', icon: '🖥️' },
  { value: 'database-string', label: 'Database Connection String', icon: '🗄️' },
  { value: 'mongodb', label: 'MongoDB Connection', icon: '🍃' },
  { value: 'postgresql', label: 'PostgreSQL Connection', icon: '🐘' },
  { value: 'mysql', label: 'MySQL Connection', icon: '🐬' },
  { value: 'docker-secret', label: 'Docker Secret', icon: '🐳' },
  { value: 'kubernetes-secret', label: 'Kubernetes Secret', icon: '☸️' },
  { value: 'linkedin', label: 'LinkedIn Profile', icon: '💼' },
  { value: 'username', label: 'Username', icon: '👤' },
  { value: 'filename', label: 'File Name', icon: '📄' },
]

const RISK_LEVELS = ['All Risks', 'Low', 'Medium', 'High', 'Critical']

/* ------------------------------------------------------------------ */
/* Mock data — swap this array for a single API call when ready        */
/* ------------------------------------------------------------------ */

const mockFindings = [
  { id: 1, category: 'Email Address', maskedValue: 'j.smith@••••••.com', risk: 'Low', source: 'pastebin', timestamp: '2026-07-06T14:32:00Z' },
  { id: 2, category: 'Phone Number', maskedValue: '+1-415-•••-8823', risk: 'Medium', source: 'linkedin-breach', timestamp: '2026-07-05T09:14:00Z' },
  { id: 3, category: 'AWS Access Key', maskedValue: 'AKIA••••••••••••3F9K', risk: 'Critical', source: 'github-repo', timestamp: '2026-07-06T22:03:00Z' },
  { id: 4, category: 'AWS Secret Key', maskedValue: 'wJalr••••••••••••••••bPxRf', risk: 'Critical', source: 'code-leak', timestamp: '2026-07-04T11:47:00Z' },
  { id: 5, category: 'GitHub Token', maskedValue: 'ghp_••••••••••••XkZ2', risk: 'Critical', source: 'docker-hub', timestamp: '2026-07-03T18:22:00Z' },
  { id: 6, category: 'Azure Identifier', maskedValue: '3fa85f64-5717-••••-••••-••••••••2266', risk: 'High', source: 'code-leak', timestamp: '2026-07-02T08:55:00Z' },
  { id: 7, category: 'Azure Secret', maskedValue: '~AzSecret.••••••••••••Qp1', risk: 'Critical', source: 'github-repo', timestamp: '2026-07-06T05:10:00Z' },
  { id: 8, category: 'Credit Card Number', maskedValue: '4111-••••-••••-1234', risk: 'High', source: 'reseller-market', timestamp: '2026-07-01T16:40:00Z' },
  { id: 9, category: 'Bank Account Number', maskedValue: '••••••3456', risk: 'High', source: 'darkweb-forum', timestamp: '2026-06-30T13:05:00Z' },
  { id: 10, category: 'IP Address', maskedValue: '203.0.113.•', risk: 'Medium', source: 'darkweb-forum', timestamp: '2026-07-06T19:18:00Z' },
  { id: 11, category: 'Domain Name', maskedValue: 'internal-••••.corp.net', risk: 'Low', source: 'code-leak', timestamp: '2026-06-29T07:33:00Z' },
  { id: 12, category: 'URL / Website', maskedValue: 'https://exampl••••.com/reset?token=••••', risk: 'Medium', source: 'pastebin', timestamp: '2026-07-05T21:12:00Z' },
  { id: 13, category: 'Password', maskedValue: 'P@ssW••••23!', risk: 'Critical', source: 'credential-stuffing-list', timestamp: '2026-07-06T02:47:00Z' },
  { id: 14, category: 'API Key', maskedValue: 'sk-live-••••••••ab3f', risk: 'Critical', source: 'code-leak', timestamp: '2026-07-04T15:28:00Z' },
  { id: 15, category: 'JWT Token', maskedValue: 'eyJhbGciOi••••••••••••w5N_XU8U', risk: 'Critical', source: 'telegram-dump', timestamp: '2026-07-03T10:02:00Z' },
  { id: 16, category: 'Private Key', maskedValue: '-----BEGIN RSA PRIVATE KEY----- ••••••••', risk: 'Critical', source: 's3-bucket-exposed', timestamp: '2026-07-06T12:39:00Z' },
  { id: 17, category: 'SSH Key', maskedValue: 'ssh-rsa AAAAB3Nza••••••••C7Q==', risk: 'Critical', source: 'github-repo', timestamp: '2026-07-02T17:51:00Z' },
  { id: 18, category: 'Database Connection String', maskedValue: 'postgres://admin:••••@10.20.0.5:5432/finance', risk: 'Critical', source: 'code-leak', timestamp: '2026-07-05T04:16:00Z' },
  { id: 19, category: 'MongoDB Connection', maskedValue: 'mongodb+srv://svc:••••@cluster0.mongodb.net/prod', risk: 'Critical', source: 'mongodb-exposed', timestamp: '2026-07-06T09:44:00Z' },
  { id: 20, category: 'PostgreSQL Connection', maskedValue: 'postgresql://root:••••@db-01.internal:5432/orders', risk: 'Critical', source: 's3-bucket-exposed', timestamp: '2026-06-28T20:09:00Z' },
  { id: 21, category: 'MySQL Connection', maskedValue: 'mysql://app:••••@10.0.1.9:3306/billing', risk: 'Critical', source: 'docker-hub', timestamp: '2026-07-01T06:23:00Z' },
  { id: 22, category: 'Docker Secret', maskedValue: 'DOCKER_REGISTRY_PWD=••••••••', risk: 'High', source: 'docker-hub', timestamp: '2026-07-04T23:57:00Z' },
  { id: 23, category: 'Kubernetes Secret', maskedValue: 'kind: Secret data.token=••••••••', risk: 'High', source: 'code-leak', timestamp: '2026-07-03T14:31:00Z' },
  { id: 24, category: 'LinkedIn Profile', maskedValue: 'linkedin.com/in/j••••-smith-42', risk: 'Low', source: 'linkedin-breach', timestamp: '2026-06-27T11:05:00Z' },
  { id: 25, category: 'Username', maskedValue: 'j.doe_••••', risk: 'Low', source: 'telegram-dump', timestamp: '2026-07-06T16:52:00Z' },
  { id: 26, category: 'File Name', maskedValue: 'payroll_2024_••••.xlsx', risk: 'Low', source: 'reseller-market', timestamp: '2026-07-02T09:38:00Z' },

  { id: 27, category: 'Email Address', maskedValue: '****@corp-mail.net', risk: 'Low', source: 'pastebin', timestamp: '2026-06-26T13:14:00Z' },
  { id: 28, category: 'Password', maskedValue: 'adm••••2024!', risk: 'Critical', source: 'credential-stuffing-list', timestamp: '2026-07-06T18:25:00Z' },
  { id: 29, category: 'Credit Card Number', maskedValue: '3782-••••••-1005', risk: 'High', source: 'reseller-market', timestamp: '2026-07-05T15:47:00Z' },
  { id: 30, category: 'AWS Access Key', maskedValue: 'AKIA••••••••••••7QRT', risk: 'Critical', source: 'github-repo', timestamp: '2026-07-01T22:36:00Z' },
  { id: 31, category: 'API Key', maskedValue: 'AIzaSy••••••••••••9kLm', risk: 'Critical', source: 'code-leak', timestamp: '2026-06-25T08:09:00Z' },
  { id: 32, category: 'JWT Token', maskedValue: 'eyJraWQiOi••••••••••••ZzA', risk: 'Critical', source: 'telegram-dump', timestamp: '2026-07-04T20:41:00Z' },
  { id: 33, category: 'SSH Key', maskedValue: 'ssh-ed25519 AAAAC3••••••Uu', risk: 'Critical', source: 's3-bucket-exposed', timestamp: '2026-07-06T07:19:00Z' },
  { id: 34, category: 'GitHub Token', maskedValue: 'ghp_••••••••••••9mNp', risk: 'Critical', source: 'code-leak', timestamp: '2026-06-24T19:53:00Z' },
  { id: 35, category: 'Phone Number', maskedValue: '+44 7•••• 221190', risk: 'Medium', source: 'linkedin-breach', timestamp: '2026-07-03T05:27:00Z' },
  { id: 36, category: 'IP Address', maskedValue: '198.51.100.•', risk: 'Medium', source: 'darkweb-forum', timestamp: '2026-07-05T12:58:00Z' },
  { id: 37, category: 'Domain Name', maskedValue: 'vpn-••••.internal', risk: 'Low', source: 'code-leak', timestamp: '2026-06-23T10:44:00Z' },
  { id: 38, category: 'URL / Website', maskedValue: 'https://admin-panel-••••.io/login', risk: 'Medium', source: 'pastebin', timestamp: '2026-07-06T01:12:00Z' },
  { id: 39, category: 'Username', maskedValue: 'root_admin_••', risk: 'Medium', source: 'telegram-dump', timestamp: '2026-07-02T14:03:00Z' },
  { id: 40, category: 'File Name', maskedValue: 'customer_db_backup_••••.sql', risk: 'High', source: 'mongodb-exposed', timestamp: '2026-06-22T16:29:00Z' },
  { id: 41, category: 'MongoDB Connection', maskedValue: 'mongodb://readonly:••••@203.0.113.9:27017/analytics', risk: 'Critical', source: 'mongodb-exposed', timestamp: '2026-07-04T03:15:00Z' },
  { id: 42, category: 'Docker Secret', maskedValue: 'docker login -p ••••••••', risk: 'High', source: 'docker-hub', timestamp: '2026-06-21T09:48:00Z' },
  { id: 43, category: 'Kubernetes Secret', maskedValue: 'apiVersion: v1 kind: Secret data:••••', risk: 'High', source: 'code-leak', timestamp: '2026-07-05T17:36:00Z' },
  { id: 44, category: 'Bank Account Number', maskedValue: 'IBAN GB29 •••• •••• •••• 1199', risk: 'High', source: 'reseller-market', timestamp: '2026-06-20T12:22:00Z' },
  { id: 45, category: 'LinkedIn Profile', maskedValue: 'linkedin.com/in/a-patel-••••', risk: 'Low', source: 'linkedin-breach', timestamp: '2026-07-03T21:09:00Z' },
  { id: 46, category: 'Azure Secret', maskedValue: 'Az.CS~••••••••••••••••2FQ', risk: 'Critical', source: 'github-repo', timestamp: '2026-06-19T15:57:00Z' },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function iconForCategory(label) {
  return CATEGORIES.find((c) => c.label === label)?.icon || '🔎'
}

function formatSource(source) {
  return source
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatTimestamp(iso) {
  const date = new Date(iso)
  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`

  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 30) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function riskClass(risk) {
  return `lg-risk-${risk.toLowerCase().replace(' ', '-')}`
}

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export default function SearchDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('All Risks')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [categoryQuery, setCategoryQuery] = useState('')

  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.value === categoryFilter) ?? CATEGORIES[0],
    [categoryFilter]
  )

  const visibleCategoryOptions = useMemo(
    () =>
      CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(categoryQuery.toLowerCase())
      ),
    [categoryQuery]
  )

  const filteredFindings = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return mockFindings.filter((finding) => {
      if (categoryFilter !== 'all' && finding.category !== selectedCategory.label) {
        return false
      }

      if (riskFilter !== 'All Risks' && finding.risk !== riskFilter) {
        return false
      }

      if (term) {
        const haystack =
          `${finding.category} ${finding.maskedValue} ${finding.source}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }

      return true
    })
  }, [searchTerm, categoryFilter, riskFilter, selectedCategory])

  function handleSelectCategory(value) {
    setCategoryFilter(value)
    setIsCategoryOpen(false)
    setCategoryQuery('')
  }

  return (
    <div className="lg-dashboard">
      <style>{CSS}</style>

      <header className="lg-header">
        <h1>🛡️ LeakGuard AI — Search Dashboard</h1>
        <p>Breach intelligence across dark web, social, resellers, code &amp; databases</p>
      </header>

      <div className="lg-search-row">
        <input
          className="lg-search-input"
          type="text"
          placeholder="Search findings by category, value, or source..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="lg-filters">
        <div className="lg-dropdown">
          <button
            type="button"
            className="lg-dropdown-toggle"
            onClick={() => setIsCategoryOpen((open) => !open)}
          >
            <span className="lg-cat-icon">{selectedCategory.icon}</span>
            <span>{selectedCategory.label}</span>
            <span className="lg-dropdown-caret">{isCategoryOpen ? '▲' : '▼'}</span>
          </button>

          {isCategoryOpen && (
            <div className="lg-dropdown-panel">
              <input
                autoFocus
                type="text"
                className="lg-dropdown-search"
                placeholder="Filter categories..."
                value={categoryQuery}
                onChange={(e) => setCategoryQuery(e.target.value)}
              />
              <div className="lg-dropdown-list">
                {visibleCategoryOptions.length === 0 && (
                  <div className="lg-dropdown-empty">No matching categories</div>
                )}
                {visibleCategoryOptions.map((category) => (
                  <button
                    type="button"
                    key={category.value}
                    className={
                      category.value === categoryFilter
                        ? 'lg-dropdown-option active'
                        : 'lg-dropdown-option'
                    }
                    onClick={() => handleSelectCategory(category.value)}
                  >
                    <span className="lg-cat-icon">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg-risk-row">
          {RISK_LEVELS.map((risk) => (
            <button
              type="button"
              key={risk}
              className={
                riskFilter === risk
                  ? `lg-risk-pill active ${riskClass(risk)}`
                  : `lg-risk-pill ${riskClass(risk)}`
              }
              onClick={() => setRiskFilter(risk)}
            >
              {risk}
            </button>
          ))}
        </div>
      </div>

      <div className="lg-results-count">
        Showing <strong>{filteredFindings.length}</strong> of{' '}
        <strong>{mockFindings.length}</strong> findings
      </div>

      {filteredFindings.length === 0 ? (
        <div className="lg-empty-state">
          <span className="lg-empty-icon">🕳️</span>
          <p>No findings match your current filters.</p>
          <span className="lg-empty-hint">Try clearing the search text or switching categories.</span>
        </div>
      ) : (
        <div className="lg-card-grid">
          {filteredFindings.map((finding) => (
            <div key={finding.id} className="lg-finding-card">
              <div className="lg-card-top">
                <span className="lg-card-icon">{iconForCategory(finding.category)}</span>
                <span className="lg-card-category">{finding.category}</span>
              </div>

              <div className="lg-card-value">{finding.maskedValue}</div>

              <div className="lg-card-bottom">
                <span className={`lg-badge ${riskClass(finding.risk)}`}>{finding.risk}</span>
                <span className="lg-source-tag">{formatSource(finding.source)}</span>
              </div>

              <div className="lg-card-timestamp">{formatTimestamp(finding.timestamp)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Styles (plain CSS fallback — no Tailwind dependency required)       */
/* ------------------------------------------------------------------ */

const CSS = `
.lg-dashboard {
  min-height: 100vh;
  background: radial-gradient(circle at top, #16213a 0%, #0a0f1e 60%);
  color: #e6edf3;
  font-family: -apple-system, "Segoe UI", Arial, sans-serif;
  padding: 28px 20px 60px;
}

.lg-header {
  text-align: center;
  margin-bottom: 24px;
}

.lg-header h1 {
  margin: 0 0 6px;
  font-size: 1.8rem;
  background: linear-gradient(90deg, #58a6ff, #a371f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.lg-header p {
  margin: 0;
  color: #8b95a5;
}

.lg-search-row {
  max-width: 900px;
  margin: 0 auto 18px;
}

.lg-search-input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #2a3550;
  background: #131a2b;
  color: #e6edf3;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.lg-search-input:focus {
  outline: none;
  border-color: #58a6ff;
  box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
}

.lg-filters {
  max-width: 900px;
  margin: 0 auto 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: flex-start;
}

.lg-dropdown {
  position: relative;
}

.lg-dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid #2a3550;
  background: #131a2b;
  color: #e6edf3;
  cursor: pointer;
  font-size: 0.9rem;
  min-width: 220px;
  transition: border-color 0.2s ease;
}

.lg-dropdown-toggle:hover {
  border-color: #58a6ff;
}

.lg-dropdown-caret {
  margin-left: auto;
  color: #8b95a5;
  font-size: 0.7rem;
}

.lg-dropdown-panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  width: 280px;
  background: #131a2b;
  border: 1px solid #2a3550;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
  padding: 10px;
  animation: lg-fade-in 0.15s ease;
}

.lg-dropdown-search {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #2a3550;
  background: #0a0f1e;
  color: #e6edf3;
  margin-bottom: 8px;
}

.lg-dropdown-search:focus {
  outline: none;
  border-color: #58a6ff;
}

.lg-dropdown-list {
  max-height: 260px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lg-dropdown-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #e6edf3;
  cursor: pointer;
  text-align: left;
  font-size: 0.85rem;
  transition: background 0.15s ease;
}

.lg-dropdown-option:hover {
  background: rgba(88, 166, 255, 0.12);
}

.lg-dropdown-option.active {
  background: linear-gradient(120deg, #1f6feb, #388bfd);
  color: white;
}

.lg-dropdown-empty {
  padding: 10px;
  color: #8b95a5;
  font-size: 0.85rem;
}

.lg-cat-icon {
  font-size: 1rem;
}

.lg-risk-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.lg-risk-pill {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid #2a3550;
  background: transparent;
  color: #c9d3e0;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.lg-risk-pill:hover {
  transform: translateY(-2px);
}

.lg-risk-all-risks.active {
  background: rgba(88, 166, 255, 0.18);
  border-color: #58a6ff;
  color: #79c0ff;
  box-shadow: 0 0 12px rgba(88, 166, 255, 0.35);
}

.lg-risk-low.active {
  background: rgba(34, 197, 94, 0.18);
  border-color: #22c55e;
  color: #4ade80;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.35);
}

.lg-risk-medium.active {
  background: rgba(234, 179, 8, 0.18);
  border-color: #eab308;
  color: #facc15;
  box-shadow: 0 0 12px rgba(234, 179, 8, 0.35);
}

.lg-risk-high.active {
  background: rgba(249, 115, 22, 0.18);
  border-color: #f97316;
  color: #fb923c;
  box-shadow: 0 0 12px rgba(249, 115, 22, 0.35);
}

.lg-risk-critical.active {
  background: rgba(239, 68, 68, 0.18);
  border-color: #ef4444;
  color: #f87171;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.35);
}

.lg-results-count {
  max-width: 900px;
  margin: 0 auto 16px;
  color: #8b95a5;
  font-size: 0.9rem;
}

.lg-empty-state {
  max-width: 900px;
  margin: 40px auto;
  text-align: center;
  padding: 50px 20px;
  border: 1px dashed #2a3550;
  border-radius: 16px;
  color: #8b95a5;
}

.lg-empty-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 10px;
}

.lg-empty-state p {
  margin: 0 0 6px;
  font-size: 1.05rem;
  color: #c9d3e0;
}

.lg-empty-hint {
  font-size: 0.85rem;
}

.lg-card-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.lg-finding-card {
  background: linear-gradient(160deg, #17203a 0%, #111827 100%);
  border: 1px solid #2a3550;
  border-radius: 14px;
  padding: 16px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  animation: lg-fade-in 0.3s ease;
}

.lg-finding-card:hover {
  transform: translateY(-4px);
  border-color: #3b4a6b;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);
}

.lg-card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.lg-card-icon {
  font-size: 1.2rem;
}

.lg-card-category {
  font-weight: 600;
  font-size: 0.9rem;
  color: #e6edf3;
}

.lg-card-value {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  background: #0a0f1e;
  border: 1px solid #232d47;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 0.82rem;
  color: #79c0ff;
  overflow-x: auto;
  white-space: nowrap;
  margin-bottom: 12px;
}

.lg-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 6px;
}

.lg-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.lg-badge.lg-risk-low {
  background: rgba(34, 197, 94, 0.16);
  color: #4ade80;
}

.lg-badge.lg-risk-medium {
  background: rgba(234, 179, 8, 0.16);
  color: #facc15;
}

.lg-badge.lg-risk-high {
  background: rgba(249, 115, 22, 0.16);
  color: #fb923c;
}

.lg-badge.lg-risk-critical {
  background: rgba(239, 68, 68, 0.16);
  color: #f87171;
}

.lg-source-tag {
  font-size: 0.72rem;
  color: #8b95a5;
  background: #0a0f1e;
  border: 1px solid #232d47;
  border-radius: 999px;
  padding: 3px 10px;
}

.lg-card-timestamp {
  font-size: 0.75rem;
  color: #62708a;
}

@keyframes lg-fade-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .lg-dropdown-toggle {
    min-width: 0;
    width: 100%;
  }

  .lg-filters {
    flex-direction: column;
  }
}
`
