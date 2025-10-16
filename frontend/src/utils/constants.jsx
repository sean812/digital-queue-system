export const SERVICES = [
  { id: 'banking', name: 'Banking Services', description: 'Account opening, loans, investments' },
  { id: 'payments', name: 'Bill Payments', description: 'Utility bills, fees, other payments' },
  { id: 'support', name: 'Customer Support', description: 'Account issues, complaints, queries' },
  { id: 'technical', name: 'Technical Support', description: 'App issues, technical problems' },
  { id: 'general', name: 'General Inquiry', description: 'General questions and information' }
]

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'na', name: 'Nama', flag: '🇳🇦' },
  { code: 'ng', name: 'Oshiwambo', flag: '🇳🇦' },
  { code: 'hz', name: 'Oshiherero', flag: '🇳🇦' },
  { code: 'de', name: 'German', flag: '🇩🇪' }
]

export const TICKET_STATUS = {
  WAITING: 'waiting',
  SERVING: 'serving',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}