import { useState, useEffect } from 'react'
import { Shield, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'

interface EnvData {
  OAUTH_CLIENT_ID: boolean
  OAUTH_CLIENT_SECRET: boolean
  REDIRECT_URI: boolean
}

interface SanitizeResponse {
  original: string
  sanitized: string
  trimmedCount: number
}

type SimulateState = 'idle' | 'error' | 'success'

function PresenceTag({ present }: { present: boolean }) {
  return present ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-900/40 px-2 py-0.5 text-xs font-semibold text-green-400">
      <CheckCircle className="w-3 h-3" />
      Present ✓
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-900/40 px-2 py-0.5 text-xs font-semibold text-red-400">
      <XCircle className="w-3 h-3" />
      Missing ✗
    </span>
  )
}

// ── Sub-section 1 ───────────────────────────────────────────────
function EnvVarsSection() {
  const [envData, setEnvData] = useState<EnvData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/auth/env')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<EnvData>
      })
      .then((data) => {
        setEnvData(data)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load env data')
      })
      .finally(() => setLoading(false))
  }, [])

  const rows: { key: keyof EnvData; label: string }[] = [
    { key: 'OAUTH_CLIENT_ID', label: 'OAUTH_CLIENT_ID' },
    { key: 'OAUTH_CLIENT_SECRET', label: 'OAUTH_CLIENT_SECRET' },
    { key: 'REDIRECT_URI', label: 'REDIRECT_URI' },
  ]

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        Environment Variable Isolation
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Sensitive credentials are stored in environment variables and never exposed to the
        client. Only variable names are shown:
      </p>

      <div className="rounded-lg bg-slate-900 border border-slate-700 overflow-hidden mb-4">
        {loading && (
          <div className="px-4 py-3 text-slate-400 text-sm font-mono">Loading...</div>
        )}
        {error && (
          <div className="px-4 py-3 text-red-400 text-sm font-mono">{error}</div>
        )}
        {!loading && !error && envData &&
          rows.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-800 last:border-0"
            >
              <span className="font-mono text-sm text-green-400 w-48 shrink-0">{label}</span>
              <span className="font-mono text-sm text-slate-500 flex-1">= ***</span>
              <PresenceTag present={envData[key]} />
            </div>
          ))}
      </div>

      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
        Values are accessed only server-side via{' '}
        <code className="font-mono text-teal-600">process.env</code>. The client never
        receives secrets.
      </p>
    </div>
  )
}

// ── Sub-section 2 ───────────────────────────────────────────────
function SanitizationSection() {
  const [inputValue, setInputValue] = useState('  my_client_id  ')
  const [sanitizeResult, setSanitizeResult] = useState<SanitizeResponse | null>(null)
  const [sanitizeLoading, setSanitizeLoading] = useState(false)
  const [simulateState, setSimulateState] = useState<SimulateState>('idle')
  const [sanitizeError, setSanitizeError] = useState<string | null>(null)

  async function handleSanitize() {
    setSanitizeLoading(true)
    setSanitizeResult(null)
    setSanitizeError(null)
    try {
      const res = await fetch('/auth/sanitize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as SanitizeResponse
      setSanitizeResult(data)
    } catch (err) {
      setSanitizeError(err instanceof Error ? err.message : 'Request failed')
    } finally {
      setSanitizeLoading(false)
    }
  }

  // Derive trimmed count locally as fallback display
  const trimmedChars = inputValue.length - inputValue.trim().length

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        Input Sanitization — <code className="text-teal-600 text-sm">.trim()</code> Demo
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Whitespace-padded env vars cause 401 errors. All credentials are sanitized with{' '}
        <code className="font-mono text-xs bg-slate-100 px-1 rounded">.trim()</code> before
        use.
      </p>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-600 mb-1">
          Client ID Input
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setSanitizeResult(null)
            }}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSanitize}
            disabled={sanitizeLoading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {sanitizeLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : null}
            Sanitize
          </button>
        </div>
      </div>

      {/* Sanitize error */}
      {sanitizeError && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {sanitizeError}
        </div>
      )}

      {/* Before / After comparison */}
      {sanitizeResult && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 mb-4 space-y-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Before
            </span>
            <div className="mt-1 font-mono text-sm">
              <span className="text-red-500 bg-red-50 px-0.5 rounded">
                {sanitizeResult.original.match(/^(\s*)/)?.[1] ?? ''}
              </span>
              <span className="text-slate-700">{sanitizeResult.original.trim()}</span>
              <span className="text-red-500 bg-red-50 px-0.5 rounded">
                {sanitizeResult.original.match(/(\s*)$/)?.[1] ?? ''}
              </span>
              <span className="ml-2 text-xs text-slate-400">
                (length: {sanitizeResult.original.length})
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              After
            </span>
            <div className="mt-1 font-mono text-sm">
              <span className="text-green-700">&quot;{sanitizeResult.sanitized}&quot;</span>
              <span className="ml-2 text-xs text-slate-400">
                (length: {sanitizeResult.sanitized.length})
              </span>
            </div>
          </div>
          {sanitizeResult.trimmedCount > 0 && (
            <p className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
              Trimmed {sanitizeResult.trimmedCount} character
              {sanitizeResult.trimmedCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      {/* Simulate 401 */}
      <div>
        {simulateState === 'idle' && (
          <button
            onClick={() => setSimulateState('error')}
            className="inline-flex items-center gap-2 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            Simulate 401 Error
          </button>
        )}

        {simulateState === 'error' && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="font-mono text-sm font-bold text-red-700">
                HTTP 401 Unauthorized — invalid_client
              </span>
            </div>
            <p className="text-xs text-red-600">
              This error occurs when{' '}
              <code className="font-mono bg-red-100 px-1 rounded">client_id</code> contains
              whitespace. Fixed by{' '}
              <code className="font-mono bg-red-100 px-1 rounded">.trim()</code>.
            </p>
            <button
              onClick={() => setSimulateState('success')}
              className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Retry with Sanitized Input
            </button>
          </div>
        )}

        {simulateState === 'success' && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Authentication successful — trimmed input accepted
            </span>
            <button
              onClick={() => setSimulateState('idle')}
              className="ml-auto text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Show trimmed count hint even without API */}
      {!sanitizeResult && trimmedChars > 0 && (
        <p className="mt-3 text-xs text-slate-400">
          Current input has {trimmedChars} leading/trailing whitespace character
          {trimmedChars !== 1 ? 's' : ''} — click Sanitize to see the diff.
        </p>
      )}
    </div>
  )
}

// ── Sub-section 3 ───────────────────────────────────────────────
const CSRF_STEPS = [
  {
    text: (
      <>
        Client generates{' '}
        <code className="font-mono text-xs bg-slate-100 px-1 rounded">
          state = crypto.randomBytes(16).toString(&apos;hex&apos;)
        </code>
      </>
    ),
  },
  { text: 'State stored in httpOnly cookie' },
  { text: 'Authorization URL includes state parameter' },
  {
    text: (
      <>
        Callback validates:{' '}
        <code className="font-mono text-xs bg-slate-100 px-1 rounded">
          state === cookie.oauth_state
        </code>
      </>
    ),
  },
  { text: 'State deleted after use (one-time token)' },
]

function CsrfSection() {
  return (
    <div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        CSRF Protection via State Parameter
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        A cryptographically random{' '}
        <code className="font-mono text-xs bg-slate-100 px-1 rounded">state</code>{' '}
        parameter prevents cross-site request forgery attacks.
      </p>

      <ol className="space-y-2">
        {CSRF_STEPS.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
              {i + 1}
            </span>
            <span className="text-sm text-slate-700 pt-0.5">{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────
export default function SecurityShowcase() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
        <Shield className="w-5 h-5 text-blue-400" />
        <h2 className="text-white font-semibold text-lg">Security Features</h2>
      </div>

      <div className="divide-y divide-slate-100">
        <div className="px-6 py-6">
          <EnvVarsSection />
        </div>
        <div className="px-6 py-6">
          <SanitizationSection />
        </div>
        <div className="px-6 py-6">
          <CsrfSection />
        </div>
      </div>
    </section>
  )
}
