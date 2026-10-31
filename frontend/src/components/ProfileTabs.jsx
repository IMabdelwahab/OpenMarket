import ProfileIcon from './ProfileIcon'

function ProfileTabs({ tabs, activeTab, onTabChange, idPrefix = 'profile', ariaLabel = 'Rubriques du compte' }) {
  return (
    <nav className="profile-tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          aria-selected={activeTab === tab.id}
          className={activeTab === tab.id ? 'is-selected' : ''}
          id={`${idPrefix}-tab-${tab.id}`}
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          type="button"
        >
          <ProfileIcon>{tab.icon}</ProfileIcon>
          {tab.label}
          {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
        </button>
      ))}
    </nav>
  )
}

export default ProfileTabs
