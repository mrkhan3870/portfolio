import { useState, useEffect } from 'react'
import {
  Key,
  ChevronRight,
  CheckCircle,
  Loader2,
  RefreshCw,
  AlertTriangle,
  Shield,
} from 'lucide-react'

type Step = 'idle' | 'building' | 'redirecting' | 'callback' | 'exchange' | 'done'

interface AuthData {
  authorization_url: string
  client_id: string
  state: string
  redirect_uri: string
  response_type: string
  scope: string
}

interface TokenData {
  access_token: string
  token_type: string
  expires_in: number
  id_token: string
}

interface OAuthFlowProps {
  onTokenReceived: (data: TokenData) => void
}

const STEPS = [
  'Build Authorization URL',
  'User Authorizes',
  'Receive Auth Code',
  'Exchange for Token',
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  done
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : active
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {done ? <CheckCircle className="w-4 h-4" /> : idx}
              </div>
              <span
                className={`mt-1 text-xs font-medium text-center leading-tight max-w-[70px] ${
                  active ? 'text-blue-600' : done ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 mb-5 transition-colors ${
                  done ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ParamRow({ label, value, badge }: { label: string; value: string; badge?: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
      <span className="font-mono text-sm text-teal-600 w-36 shrink-0">{label}</span>
      <span className="font-mono text-sm text-slate-700 break-all">{value}</span>
      {badge && (
        <span className="ml-auto shrink-0 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
          <Shield className="w-3 h-3" />
          {badge}
        </span>
      )}
    </div>
  )
}

export default function OAuthFlow({ onTokenReceived }: OAuthFlowProps) {
  const [step, setStep] = useState<Step>('idle')
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [tokenData, setTokenData] = useState<TokenData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [authCode, setAuthCode] = useState<string>('')
  const [exchangeLoading, setExchangeLoading] = useState(false)

  // Auto-advance from redirecting after 1.5s
  useEffect(() => {
    if (step !== 'redirecting') return
    const timer = setTimeout(() => {
      const code =
        'auth_code_' +
        Array.from(crypto.getRandomValues(new Uint8Array(8)))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')
      setAuthCode(code)
      setStep('callback')
    }, 1500)
    return () => clearTimeout(timer)
  }, [step])

  async function startFlow() {
    setError(null)
    try {
      const res = await fetch('/auth/oauth')
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const data = (await res.json()) as AuthData
      setAuthData(data)
      setStep('building')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start OAuth flow')
    }
  }

  async function exchangeCode() {
    setExchangeLoading(true)
    setError(null)
    setStep('exchange')
    try {
      const res = await fetch('/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: authCode }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const data = (await res.json()) as TokenData
      setTokenData(data)
      onTokenReceived(data)
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Token exchange failed')
      setStep('callback')
    } finally {
      setExchangeLoading(false)
    }
  }

  function reset() {
    setStep('idle')
    setAuthData(null)
    setTokenData(null)
    setError(null)
    setAuthCode('')
  }

  const currentStepNum =
    step === 'idle'
      ? 0
      : step === 'building'
      ? 1
      : step === 'redirecting'
      ? 2
      : step === 'callback'
      ? 3
      : step === 'exchange'
      ? 3
      : 4

  return (
    <section id="oauth-flow" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
        <Key className="w-5 h-5 text-blue-400" />
        <h2 className="text-white font-semibold text-lg">OAuth 2.0 Flow Simulator</h2>
      </div>

      <div className="p-6">
        {/* Error banner */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Idle */}
        {step === 'idle' && (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Key className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              OAuth 2.0 Authorization Code Grant
            </h3>
            <p className="text-slate-500 max-w-md mb-3 text-sm leading-relaxed">
              The Authorization Code Grant is the most secure OAuth 2.0 flow for
              server-side applications. The authorization code is exchanged server-side,
              keeping the client secret out of the browser.
            </p>
            <ol className="text-left text-sm text-slate-600 space-y-1 mb-8 list-decimal list-inside">
              <li>Client builds an authorization URL with state parameter</li>
              <li>User authenticates at the provider</li>
              <li>Provider redirects back with a short-lived code</li>
              <li>Server exchanges code + secret for access token</li>
            </ol>
            <button
              onClick={startFlow}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Start OAuth Flow
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Steps 1–4 */}
        {step !== 'idle' && (
          <>
            <StepIndicator current={currentStepNum} />

            {/* Step 1: Building */}
            {step === 'building' && authData && (
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Authorization URL Parameters
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  The client constructs this URL and redirects the user's browser to it.
                </p>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 mb-5">
                  <ParamRow label="response_type" value="code" />
                  <ParamRow label="client_id" value={authData.client_id} />
                  <ParamRow label="scope" value="profile email openid" />
                  <ParamRow
                    label="state"
                    value={authData.state}
                    badge="CSRF Protection"
                  />
                  <ParamRow label="redirect_uri" value={authData.redirect_uri} />
                </div>
                <button
                  onClick={() => setStep('redirecting')}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Simulate User Authorization
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Redirecting */}
            {step === 'redirecting' && (
              <div className="flex flex-col items-center py-12 text-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-700 font-medium">Redirecting to OAuth Provider...</p>
                <p className="text-slate-400 text-sm mt-1">
                  Simulating browser redirect to authorization endpoint
                </p>
              </div>
            )}

            {/* Step 3: Callback */}
            {(step === 'callback' || step === 'exchange') && (
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">
                  Authorization Code Received
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  The provider redirected back with a short-lived authorization code.
                </p>
                <div className="rounded-lg border border-slate-200 bg-slate-900 px-4 py-3 font-mono text-xs text-green-400 break-all mb-3">
                  GET /auth/callback?code=
                  <span className="text-yellow-300">{authCode}</span>
                  &amp;state=
                  <span className="text-yellow-300">{authData?.state ?? ''}</span>
                </div>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-0.5">
                    State validated ✓
                  </span>
                </div>
                <button
                  onClick={exchangeCode}
                  disabled={exchangeLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {exchangeLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Key className="w-4 h-4" />
                  )}
                  Exchange Code for Token
                </button>
              </div>
            )}

            {/* Step 4: Done */}
            {step === 'done' && tokenData && (
              <div>
                <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 mb-5">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                  <span className="text-sm font-semibold text-green-800">
                    Authentication Complete
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Token Response</h3>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 space-y-2 mb-5">
                  <div className="flex gap-3 text-sm font-mono">
                    <span className="text-teal-600 w-28 shrink-0">access_token</span>
                    <span className="text-slate-500">***</span>
                  </div>
                  <div className="flex gap-3 text-sm font-mono">
                    <span className="text-teal-600 w-28 shrink-0">token_type</span>
                    <span className="text-slate-700">{tokenData.token_type}</span>
                  </div>
                  <div className="flex gap-3 text-sm font-mono">
                    <span className="text-teal-600 w-28 shrink-0">expires_in</span>
                    <span className="text-slate-700">{tokenData.expires_in}s</span>
                  </div>
                  <div className="flex gap-3 text-sm font-mono">
                    <span className="text-teal-600 w-28 shrink-0">id_token</span>
                    <span className="text-slate-500">*** (JWT)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#token-inspector"
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    View Token Claims
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Flow
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
