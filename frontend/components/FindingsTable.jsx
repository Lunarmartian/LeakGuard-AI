import { labelForCategory, iconForType } from './categories.js'

const SEVERITY_BY_TYPE = {
  'Email Address': 'Medium',
  'Phone Number': 'Medium',
  Username: 'Low',
  'File Name': 'Low',
  'Domain Name': 'Medium',
  'IP Address': 'Medium',
  'URL / Website': 'Medium',
  'LinkedIn Profile': 'Medium',
  'Bank Account Number': 'High',
  'Credit Card Number': 'High',
  'Azure Identifier': 'High',
  Password: 'Critical',
  'API Key': 'Critical',
  'JWT Token': 'Critical',
  'AWS Access Key': 'Critical',
  'AWS Secret Key': 'Critical',
  'GitHub Token': 'Critical',
  'Azure Secret': 'Critical',
  'Private Key': 'Critical',
  'SSH Key': 'Critical',
  'Database Connection String': 'Critical',
  'MongoDB Connection': 'Critical',
  'PostgreSQL Connection': 'Critical',
  'MySQL Connection': 'Critical',
  'Docker Secret': 'Critical',
  'Kubernetes Secret': 'Critical',
}

export default function FindingsTable({
  findings,
  searchTerm,
  severityFilter,
  categoryFilter,
}) {
  const categoryLabel =
    categoryFilter === 'all' ? null : labelForCategory(categoryFilter)

  const rows = findings
    .map((finding) => ({
      ...finding,
      severity: SEVERITY_BY_TYPE[finding.type] || 'Low',
      icon: iconForType(finding.type),
    }))
    .filter((finding) => !categoryLabel || finding.type === categoryLabel)
    .filter((finding) =>
      finding.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (finding) =>
        severityFilter === 'All Risks' || finding.severity === severityFilter
    )

  if (rows.length === 0) {
    return <p className="empty-state">No findings yet. Paste data above and run a scan.</p>
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
          <tr key={finding.type} className="finding-row">
            <td>
              <span className="type-icon">{finding.icon}</span>
              {finding.type}
            </td>
            <td>{finding.count}</td>
            <td>
              <span className={`badge badge-${finding.severity.toLowerCase()}`}>
                {finding.severity}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
