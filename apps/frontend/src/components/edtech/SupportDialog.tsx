import { useState, useRef, useEffect, useId } from 'react'
import { HelpCircle, X, CheckCircle } from 'lucide-react'

type DialogState = 'closed' | 'auth' | 'guest' | 'success'

const SUBJECTS = ['Study Plan Issue', 'Billing', 'Technical Problem', 'Feature Request'] as const
type Subject = (typeof SUBJECTS)[number]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function generateTicketId(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

// ── Auth form ────────────────────────────────────────────────────────────────

interface AuthFormProps {
  onSubmit: () => void
  onSwitchToGuest: () => void
}

function AuthForm({ onSubmit, onSwitchToGuest }: AuthFormProps) {
  const [subject, setSubject] = useState<Subject>('Study Plan Issue')
  const [message, setMessage] = useState('')
  const messageId = useId()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name (readonly) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 select-none">
          Alex Johnson
        </div>
      </div>

      {/* Email (readonly) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 select-none">
          alex.johnson@studyspark.io
        </div>
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="auth-subject">
          Subject
        </label>
        <select
          id="auth-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={messageId}>
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id={messageId}
          // autoFocus on the first real input — message is the first editable field here
          autoFocus
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={!message.trim()}
        className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-colors"
      >
        Submit Ticket
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        <button
          type="button"
          onClick={onSwitchToGuest}
          className="text-violet-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 rounded"
        >
          Switch to guest mode
        </button>
      </p>
    </form>
  )
}

// ── Guest form ───────────────────────────────────────────────────────────────

interface GuestFormProps {
  onSubmit: () => void
  onSwitchToAuth: () => void
}

function GuestForm({ onSubmit, onSwitchToAuth }: GuestFormProps) {
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [subject, setSubject] = useState<Subject>('Study Plan Issue')
  const [message, setMessage] = useState('')

  const emailValid = EMAIL_RE.test(email)
  const showEmailError = emailTouched && !emailValid
  const emailInputId = useId()
  const subjectId = useId()
  const messageId = useId()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailTouched(true)
    if (emailValid && message.trim()) onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={emailInputId}>
          Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id={emailInputId}
          type="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailTouched(true)}
          aria-invalid={showEmailError}
          aria-describedby={showEmailError ? `${emailInputId}-error` : undefined}
          placeholder="you@example.com"
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
            showEmailError ? 'border-red-400 bg-red-50' : 'border-slate-300'
          }`}
        />
        {showEmailError && (
          <p id={`${emailInputId}-error`} role="alert" className="mt-1 text-xs text-red-600">
            Please enter a valid email address.
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={subjectId}>
          Subject
        </label>
        <select
          id={subjectId}
          value={subject}
          onChange={(e) => setSubject(e.target.value as Subject)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor={messageId}>
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id={messageId}
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue…"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={!message.trim() || (emailTouched && !emailValid)}
        className="w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-colors"
      >
        Submit Ticket
      </button>

      <p className="mt-4 text-center text-xs text-slate-500">
        <button
          type="button"
          onClick={onSwitchToAuth}
          className="text-violet-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 rounded"
        >
          I have an account
        </button>
      </p>
    </form>
  )
}

// ── Success view ─────────────────────────────────────────────────────────────

interface SuccessViewProps {
  ticketId: string
  onClose: () => void
}

function SuccessView({ ticketId, onClose }: SuccessViewProps) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <CheckCircle className="w-14 h-14 text-green-500 mb-4" aria-hidden="true" />
      <h3 className="text-xl font-bold text-slate-900 mb-2">Ticket Submitted!</h3>
      <p className="text-sm font-mono text-violet-700 bg-violet-50 rounded-full px-4 py-1 mb-3">
        Your ticket ID: #SP-{ticketId}
      </p>
      <p className="text-sm text-slate-600 mb-8">We'll respond within 24 hours.</p>
      <button
        type="button"
        autoFocus
        onClick={onClose}
        className="rounded-lg bg-violet-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-colors"
      >
        Close
      </button>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function SupportDialog() {
  const [dialogState, setDialogState] = useState<DialogState>('closed')
  const [ticketId] = useState<string>(() => generateTicketId())
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  const isOpen = dialogState !== 'closed'

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDialogState('closed')
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const dialogTitle =
    dialogState === 'auth' ? 'Contact Support'
    : dialogState === 'guest' ? 'Contact Support'
    : 'Support'

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setDialogState('auth')}
        aria-label="Open support dialog"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-colors"
      >
        <HelpCircle className="w-5 h-5" aria-hidden="true" />
        Help
      </button>

      {/* Backdrop + modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-hidden={!isOpen}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDialogState('closed')}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-[480px] rounded-xl bg-white shadow-2xl p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 id={titleId} className="text-lg font-bold text-slate-900">
                {dialogTitle}
              </h2>
              <button
                type="button"
                onClick={() => setDialogState('closed')}
                aria-label="Close dialog"
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            {dialogState === 'auth' && (
              <AuthForm
                onSubmit={() => setDialogState('success')}
                onSwitchToGuest={() => setDialogState('guest')}
              />
            )}
            {dialogState === 'guest' && (
              <GuestForm
                onSubmit={() => setDialogState('success')}
                onSwitchToAuth={() => setDialogState('auth')}
              />
            )}
            {dialogState === 'success' && (
              <SuccessView ticketId={ticketId} onClose={() => setDialogState('closed')} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
