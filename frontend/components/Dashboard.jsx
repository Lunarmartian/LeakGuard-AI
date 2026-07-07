import RiskCard from './RiskCard.jsx'
import UploadPanel from './UploadPanel.jsx'
import FindingsTable from './FindingsTable.jsx'

function totalCount(findings) {
  return findings.reduce((sum, finding) => sum + finding.count, 0)
}

export default function Dashboard({
  findings,
  risk,
  filesScanned,
  severityFilter,
  setSeverityFilter,
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
        <RiskCard title="Total Findings" value={totalCount(findings)} />
        <RiskCard title="Risk Score" value={risk.score} />
        <RiskCard
          title="Risk Level"
          value={risk.risk}
          critical={risk.risk === 'CRITICAL'}
        />
        <RiskCard title="Files Scanned" value={filesScanned} />
      </div>

      <div className="controls">
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option>All Risks</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <button onClick={onScan} disabled={loading}>
          {loading ? 'Scanning...' : 'Run Scan'}
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
        />
      </div>
    </>
  )
}
