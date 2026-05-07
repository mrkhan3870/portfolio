import { useState, useEffect } from 'react'
import { Lock, Clock, AlertTriangle, ChevronDown, ChevronUp, User } from 'lucide-react'

interface TokenData {
  access_token: string
  token_type: string
  expires_in: number
  id_token: string
}

interface JwtClaims {
  sub?: string
  email?: string
  name?: string
  iss?: string
  iat?: number
  exp?: number
  picture?: string
  [key: string]: string | number | boolean | undefined
}

interface TokenInspectorProps {
  tokenData: TokenData | null
}

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function ClaimRow({ claim, value }: { claim: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
      <span className="font-mono text-xs text-teal-600 w-20 shrink-0 pt-0.5">{claim}</span>
      <span className="font-mono text-xs text-slate-700 break-all">{value}</span>
    </div>
  )
}

function CountdownTimer({ exp }: { exp: number }) {
  const [remaining, setRemaining] = useState<number>(() => exp - Math.floor(Date.now() / 1000))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(exp - Math.floor(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [exp])

  if (remaining <= 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
        <Clock className="w-4 h-4 text-red-500 shrink-0" />
        <span className="text-sm font-semibold text-red-700">Token Expired</span>
      </div>
    )
  }

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return (
    <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5">
      <Clock className="w-4 h-4 text-blue-500 shrink-0" />
      <span className="text-sm text-slate-600">
        Token expires in:{' '}
        <span className="font-semibold text-blue-700 tabular-nums">
          {minutes}m {seconds.toString().padStart(2, '0')}s
        </span>
      </span>
    </div>
  )
}

export default function TokenInspector({ tokenData }: TokenInspectorProps) {
  const [rawOpen, setRawOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Parse the id_token JWT claims from the payload segment
  let claims: JwtClaims | null = null
  let parseError: string | null = null

  if (tokenData) {
    try {
      const parts = tokenData.id_token.split('.')
      if (parts.length < 2) throw new Error('Malformed JWT — expected 3 segments')
      const payload = parts[1]
      // Pad base64 if needed
      const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
      claims = JSON.parse(atob(padded)) as JwtClaims
    } catch (err) {
      parseError = err instanceof Error ? err.message : 'Failed to parse token'
    }
  }

  const displayClaims: { key: string; label: string; format?: (v: string | number | boolean) => string }[] = [
    { key: 'sub', label: 'sub' },
    { key: 'email', label: 'email' },
    { key: 'name', label: 'name' },
    { key: 'iss', label: 'iss' },
    {
      key: 'iat',
      label: 'iat',
      format: (v) => formatDate(v as number),
    },
    {
      key: 'exp',
      label: 'exp',
      format: (v) => formatDate(v as number),
    },
  ]

  return (
    <section id="token-inspector" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
        <Lock className="w-5 h-5 text-blue-400" />
        <h2 className="text-white font-semibold text-lg">Token Inspector</h2>
      </div>

      {/* Empty state */}
      {!tokenData && (
        <div className="flex flex-col items-center justify-center py-16 text-center px-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-4">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm max-w-xs">
            Complete the OAuth flow above to inspect the token claims and watch the expiry
            countdown.
          </p>
        </div>
      )}

      {/* Token loaded */}
      {tokenData && (
        <div className="p-6 space-y-6">
          {/* Parse error */}
          {parseError && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">{parseError}</p>
            </div>
          )}

          {claims && (
            <>
              {/* Avatar + name */}
              <div className="flex items-center gap-4">
                {claims.picture && !imgError ? (
                  <img
                    src={claims.picture}
                    alt={typeof claims.name === 'string' ? claims.name : 'User avatar'}
                    onError={() => setImgError(true)}
                    className="w-14 h-14 rounded-full border-2 border-slate-200 object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 border-2 border-slate-200">
                    <User className="w-7 h-7 text-blue-500" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-800">
                    {typeof claims.name === 'string' ? claims.name : 'Unknown User'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {typeof claims.email === 'string' ? claims.email : ''}
                  </p>
                </div>
              </div>

              {/* Countdown */}
              {typeof claims.exp === 'number' && (
                <CountdownTimer exp={claims.exp} />
              )}

              {/* Claims table */}
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Decoded Claims</h3>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-1">
                  {displayClaims.map(({ key, label, format }) => {
                    const raw = claims![key]
                    if (raw === undefined) return null
                    const display = format ? format(raw) : String(raw)
                    return <ClaimRow key={key} claim={label} value={display} />
                  })}
                </div>
              </div>

              {/* Raw token details */}
              <details
                open={rawOpen}
                onToggle={(e) => setRawOpen((e.currentTarget as HTMLDetailsElement).open)}
                className="rounded-lg border border-slate-200 overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors list-none">
                  <span>Raw id_token</span>
                  {rawOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </summary>
                <div className="bg-slate-900 px-4 py-3">
                  <p className="font-mono text-xs text-green-400 break-all">
                    {tokenData.id_token.length > 100
                      ? tokenData.id_token.slice(0, 100) + '...'
                      : tokenData.id_token}
                  </p>
                </div>
              </details>
            </>
          )}
        </div>
      )}
    </section>
  )
}
