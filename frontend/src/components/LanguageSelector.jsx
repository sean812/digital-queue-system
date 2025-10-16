import React from 'react'
import { useApp } from '../App'

const LanguageSelector = () => {
  const { darkMode } = useApp()
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'na', name: 'Nama', flag: '🇳🇦' },
    { code: 'ng', name: 'Oshiwambo', flag: '🇳🇦' },
    { code: 'hz', name: 'Oshiherero', flag: '🇳🇦' },
    { code: 'de', name: 'German', flag: '🇩🇪' }
  ]

  const handleLanguageChange = (langCode) => {
    // In real app, this would update the language context
    console.log(`Language changed to: ${langCode}`)
    alert(`Language set to: ${languages.find(lang => lang.code === langCode)?.name}`)
  }

  return (
    <div style={{ position: 'relative' }}>
      <select 
        onChange={(e) => handleLanguageChange(e.target.value)}
        style={{
          padding: '8px 12px',
          border: `2px solid ${darkMode ? '#ff7b00' : '#28a745'}`,
          borderRadius: 'var(--border-radius)',
          background: 'var(--primary-cream)',
          color: 'var(--text-dark)',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector