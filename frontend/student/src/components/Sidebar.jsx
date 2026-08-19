const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'students', label: 'Students', icon: '👤' },
  { id: 'classes', label: 'Classes', icon: '🏫' },
  { id: 'reports', label: 'Reports', icon: '📊' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

function Sidebar({ active = 'students', onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">S</span>
        <span>StudentHub</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link${item.id === active ? ' active' : ''}`}
            onClick={() => onSelect?.(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">AD</div>
        <div>
          <div className="sidebar-user">Admin</div>
          <div className="sidebar-role">Administrator</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
