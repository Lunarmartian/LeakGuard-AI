import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import Dashboard from './components/Dashboard.jsx'

const API_URL = 'http://localhost:8000'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('All Risks')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [scanText, setScanText] = useState('')
  const [findings, setFindings] = useState([])
  const [risk, setRisk] = useState({ score: 0, risk: 'LOW' })
  const [filesScanned, setFilesScanned] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleScan() {
    if (!scanText.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: scanText }),
      })

      if (!res.ok) {
        throw new Error(`Scan failed (${res.status})`)
      }

      const data = await res.json()
      setFindings(data.findings)
      setRisk(data.risk)
      setFilesScanned((count) => count + 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header>
        <h1>🛡️ LeakGuard AI</h1>
        <p>Cybersecurity Detection &amp; Risk Analysis Platform</p>
      </header>

      <div className="container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Dashboard
          findings={findings}
          risk={risk}
          filesScanned={filesScanned}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          scanText={scanText}
          setScanText={setScanText}
          onScan={handleScan}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
        />
      </div>
    </>
  )
}
