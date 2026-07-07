export default function UploadPanel({ scanText, setScanText }) {
  return (
    <div className="scanner">
      <h2>Scan Input</h2>
      <textarea
        placeholder="Paste suspicious data here..."
        value={scanText}
        onChange={(e) => setScanText(e.target.value)}
      />
    </div>
  )
}
