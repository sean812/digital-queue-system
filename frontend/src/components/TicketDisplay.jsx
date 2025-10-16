import React from 'react'

const TicketDisplay = ({ ticket, queuePosition }) => {
  if (!ticket) return null

  return (
    <div className="card fade-in" style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ 
        background: 'var(--primary-orange)', 
        color: 'white', 
        padding: '1rem', 
        borderRadius: 'var(--border-radius)',
        marginBottom: '1rem'
      }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Your Ticket</h2>
        <p>Please keep this ticket safe</p>
      </div>

      <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-green)', margin: '1rem 0' }}>
        {ticket.id}
      </div>

      <div style={{ background: 'rgba(255, 123, 0, 0.1)', padding: '1rem', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }}>
        <p><strong>Service:</strong> {ticket.service}</p>
        <p><strong>Time:</strong> {ticket.timestamp}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
      </div>

      <div style={{ background: 'rgba(40, 167, 69, 0.1)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
        <h3 style={{ color: 'var(--primary-green)', marginBottom: '0.5rem' }}>Queue Position</h3>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-orange)' }}>
          #{queuePosition}
        </div>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Estimated wait: {ticket.estimatedWait} minutes
        </p>
      </div>

      <div className="pulse" style={{ 
        background: 'var(--primary-green)', 
        color: 'white', 
        padding: '1rem', 
        borderRadius: 'var(--border-radius)',
        marginTop: '1rem'
      }}>
        <p>🎯 You will be notified when it's your turn</p>
      </div>
    </div>
  )
}

export default TicketDisplay