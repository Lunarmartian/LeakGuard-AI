export default function RiskCard({ title, value, critical }) {
  return (
    <div className={critical ? 'card critical' : 'card'}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}
