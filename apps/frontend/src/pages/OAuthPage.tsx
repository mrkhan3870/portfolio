import { useState } from 'react'
import OAuthFlow from '../components/oauth/OAuthFlow'
import SecurityShowcase from '../components/oauth/SecurityShowcase'
import TokenInspector from '../components/oauth/TokenInspector'

interface TokenData {
  access_token: string
  token_type: string
  expires_in: number
  id_token: string
}

export default function OAuthPage() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null)

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-blue-900/60 px-3 py-1 text-xs font-semibold text-blue-300 mb-4 border border-blue-800">
            SecureAuth Gateway
          </span>
          <h1 className="text-4xl font-extrabold mb-4">OAuth 2.0 Microservice</h1>
          <p className="text-lg text-slate-300">
            Authorization Code Grant flow with environment variable isolation,
            URLSearchParams serialization, and input sanitization.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        <OAuthFlow onTokenReceived={setTokenData} />
        <TokenInspector tokenData={tokenData} />
        <SecurityShowcase />
      </div>
    </div>
  )
}
