function StatCards({ students }) {
  const total = students.length
  const female = students.filter((student) => student.gender === 'Female').length
  const male = students.filter((student) => student.gender === 'Male').length
  const classes = new Set(students.map((student) => student.className)).size
  const averageAge = total
    ? Math.round(students.reduce((sum, student) => sum + Number(student.age), 0) / total)
    : 0

  const cards = [
    { label: 'Total students', value: total, hint: `${classes} classes`, tone: 'indigo', icon: '👥' },
    { label: 'Female', value: female, hint: percent(female, total), tone: 'pink', icon: '♀' },
    { label: 'Male', value: male, hint: percent(male, total), tone: 'blue', icon: '♂' },
    { label: 'Average age', value: averageAge, hint: 'years old', tone: 'green', icon: '🎂' },
  ]

  return (
    <section className="stat-grid">
      {cards.map((card) => (
        <article key={card.label} className={`stat-card ${card.tone}`}>
          <span className="stat-icon">{card.icon}</span>
          <div>
            <p className="stat-label">{card.label}</p>
            <p className="stat-value">{card.value}</p>
            <p className="stat-hint">{card.hint}</p>
          </div>
        </article>
      ))}
    </section>
  )
}

function percent(value, total) {
  if (!total) return '0% of total'
  return `${Math.round((value / total) * 100)}% of total`
}

export default StatCards
