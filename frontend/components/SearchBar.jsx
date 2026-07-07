export default function SearchBar({
  searchTerm,
  setSearchTerm
}) {
  return (
    <input
      type="text"
      placeholder="Search findings..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-700 bg-slate-900 text-white"
    />
  );
}
