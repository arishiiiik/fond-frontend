// adminComponents.jsx
export const Card = ({ title, children }) => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
        {title && <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>{title}</h2>}
        {children}
    </div>
)

export const Field = ({ label, textarea, rows, type = 'text', value, onChange, required, disabled }) => {
    const common = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '16px', fontSize: '14px' }
    return (
        <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>{label}{required && ' *'}</label>
            {textarea
                ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} style={common} disabled={disabled} />
                : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={common} disabled={disabled} required={required} />
            }
        </div>
    )
}

export const Button = ({ onClick, children, style }) => (
    <button onClick={onClick} style={{ ...buttonStyle, ...style }}>{children}</button>
)

const buttonStyle = {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box'
}

const smallButton = {
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
}