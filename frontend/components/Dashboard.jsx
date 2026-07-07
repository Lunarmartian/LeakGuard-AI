import RiskCard from './RiskCard.jsx'
import UploadPanel from './UploadPanel.jsx'
import FindingsTable from './FindingsTable.jsx'
import CategoryFilter from './CategoryFilter.jsx'

const SEVERITIES = ['All Risks', 'Low', 'Medium', 'High', 'Critical']

function totalCount(findings) {
  return findings.reduce((sum, finding) => sum + finding.count, 0)
}

export default function Dashboard({
  findings,
  risk,
  filesScanned,
  severityFilter,
  setSeverityFilter,
  categoryFilter,
  setCategoryFilter,
  scanText,
  setScanText,
  onScan,
  loading,
  error,
  searchTerm,
}) {
  return (
    <>
      <div className="stats">
        <RiskCard icon="📊" title="Total Findings" value={totalCount(findings)} />
        <RiskCard icon="📈" title="Risk Score" value={risk.score} />
        <RiskCard
          icon="🚨"
          title="Risk Level"
          value={risk.risk}
          critical={risk.risk === 'CRITICAL'}
        />
        <RiskCard icon="📁" title="Files Scanned" value={filesScanned} />
      </div>

      <section className="filters">
        <h2>Search by Category</h2>
        <CategoryFilter selected={categoryFilter} onSelect={setCategoryFilter} />

        <div className="severity-row">
          {SEVERITIES.map((severity) => (
            <button
              key={severity}
              type="button"
              className={
                severityFilter === severity
                  ? `severity-pill active severity-${severity.toLowerCase().replace(' ', '-')}`
                  : `severity-pill severity-${severity.toLowerCase().replace(' ', '-')}`
              }
              onClick={() => setSeverityFilter(severity)}
            >
              {severity}
            </button>
          ))}
        </div>
      </section>

      <div className="controls">
        <button onClick={onScan} disabled={loading} className="scan-button">
          {loading ? 'Scanning...' : '🛡️ Run Scan'}
        </button>
      </div>

      <UploadPanel scanText={scanText} setScanText={setScanText} />

      {error && <p className="error">{error}</p>}

      <div className="results">
        <h2>Detection Results</h2>
        <FindingsTable
          findings={findings}
          searchTerm={searchTerm}
          severityFilter={severityFilter}
          categoryFilter={categoryFilter}
        />
      </div>
    </>
  )
}
