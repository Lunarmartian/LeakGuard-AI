const SEVERITY_BY_TYPE = {
  'Email Address': 'Medium',
  'Phone Number': 'Medium',
  'AWS Access Key': 'Critical',
  'GitHub Token': 'Critical',
  'Azure Identifier': 'High',
  'Credit Card Number': 'High',
}

export default function FindingsTable({ findings, searchTerm, severityFilter }) {
  const rows = findings
    .map((finding) => ({
      ...finding,
      severity: SEVERITY_BY_TYPE[finding.type] || 'Low',
    }))
    .filter((finding) =>
      finding.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (finding) =>
        severityFilter === 'All Risks' || finding.severity === severityFilter
    )

  if (rows.length === 0) {
    return <p>No findings yet. Paste data above and run a scan.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Severity</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((finding) => (
          <tr key={finding.type}>
            <td>{finding.type}</td>
            <td>{finding.count}</td>
            <td>{finding.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
