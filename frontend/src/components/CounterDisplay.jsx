import React from 'react'

const CounterDisplay = ({ counter }) => {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: counter.status === 'busy' ? 'var(--primary-orange)' : 'var(--primary-green)',
        marginBottom: '0.5rem'
      }}>
        Counter {counter.id}
      </div>
      
      <div style={{ 
        padding: '0.5rem',
        background: counter.status === 'busy' ? 'rgba(255, 123, 0, 0.1)' : 'rgba(40, 167, 69, 0.1)',
        borderRadius: 'var(--border-radius)',
        marginBottom: '1rem'
      }}>
        <span style={{ 
          color: counter.status === 'busy' ? 'var(--primary-orange)' : 'var(--primary-green)',
          fontWeight: 'bold'
        }}>
          {counter.status === 'busy' ? '🔴 Serving' : '🟢 Available'}
        </span>
      </div>

      {counter.currentTicket && (
        <div style={{ 
          background: 'var(--primary-orange)', 
          color: 'white', 
          padding: '0.5rem',
          borderRadius: 'var(--border-radius)',
          marginBottom: '0.5rem'
        }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {counter.currentTicket.id}
          </div>
          <div style={{ fontSize: '0.8rem' }}>
            {counter.currentTicket.service}
          </div>
        </div>
      )}

      <div style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>
        {counter.language_support || 'Multi-language'}
      </div>
    </div>
  )
}

export default CounterDisplay