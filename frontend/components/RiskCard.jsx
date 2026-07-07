export default function RiskCard({ icon, title, value, critical }) {
  return (
    <div className={critical ? 'card critical' : 'card'}>
      <span className="card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}
