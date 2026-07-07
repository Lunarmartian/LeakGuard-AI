import { CATEGORIES } from './categories.js'

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="category-grid">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          type="button"
          className={
            category.value === selected
              ? 'category-chip active'
              : 'category-chip'
          }
          onClick={() => onSelect(category.value)}
        >
          <span className="category-icon">{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  )
}
