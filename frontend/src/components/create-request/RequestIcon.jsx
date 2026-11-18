function RequestIcon({ children, className = '' }) {
  return <span className={`material-symbols-outlined${className ? ` ${className}` : ''}`} aria-hidden="true">{children}</span>
}

export default RequestIcon
