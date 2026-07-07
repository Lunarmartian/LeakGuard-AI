export default function BreachLookup({
  email,
  setEmail,
  onCheck,
  loading,
  error,
  result,
}) {
  return (
    <div className="breach-lookup">
      <h2>Email Leak Lookup</h2>

      <div className="breach-input-row">
        <input
          type="email"
          placeholder="Enter an email address..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onCheck()}
        />
        <button onClick={onCheck} disabled={loading || !email.trim()}>
          {loading ? 'Checking...' : 'Check Email'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && result.breached && (
        <div className="breach-results">
          <p className="breach-summary critical">
            Found in {result.breaches.length} breach
            {result.breaches.length === 1 ? '' : 'es'}
          </p>

          <div className="breach-list">
            {result.breaches.map((breach) => (
              <div key={breach.name} className="breach-card">
                <div className="breach-card-top">
                  <strong>{breach.title}</strong>
                  <span className="breach-date">{breach.breachDate}</span>
                </div>

                <div className="breach-classes">
                  {breach.dataClasses.map((dataClass) => (
                    <span key={dataClass} className="breach-class-tag">
                      {dataClass}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && !result.breached && (
        <p className="breach-summary safe">No breaches found for this email.</p>
      )}
    </div>
  )
}
