import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import { URLSearchParams } from 'url'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

// ── Environment variable names exposed (values never sent) ──────────────────
const ENV_KEYS = ['OAUTH_CLIENT_ID', 'OAUTH_CLIENT_SECRET', 'REDIRECT_URI'] as const
type EnvKey = (typeof ENV_KEYS)[number]

function sanitizedEnvEntry(key: EnvKey): { key: string; masked: string; present: boolean } {
  const raw = process.env[key]
  const trimmed = raw?.trim()
  return {
    key,
    masked: '***',
    present: Boolean(trimmed),
  }
}

// ── In-memory state store (demo only) ──────────────────────────────────────
const stateStore = new Map<string, number>()

function generateState(): string {
  const state = crypto.randomBytes(16).toString('hex')
  stateStore.set(state, Date.now())
  return state
}

function validateState(state: string): boolean {
  if (!stateStore.has(state)) return false
  stateStore.delete(state)
  return true
}

// ── GET /auth/oauth — build authorization URL ───────────────────────────────
app.get('/auth/oauth', (req, res) => {
  const clientId = (process.env.OAUTH_CLIENT_ID ?? 'demo_client_id').trim()
  const redirectUri = (process.env.REDIRECT_URI ?? 'http://localhost:3001/auth/callback').trim()
  const state = generateState()

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: 'profile email openid',
    state,
    redirect_uri: redirectUri,
  })

  // Store state in cookie for CSRF validation
  res.cookie('oauth_state', state, { httpOnly: true, sameSite: 'lax', maxAge: 300_000 })

  // In a real flow this redirects; here we return the URL so the SPA can demo it
  res.json({
    authorizationUrl: `https://oauth.example.com/authorize?${params.toString()}`,
    state,
    params: {
      response_type: 'code',
      client_id: clientId,
      scope: 'profile email openid',
      state,
      redirect_uri: redirectUri,
    },
  })
})

// ── GET /auth/callback — validate state, simulate token exchange ────────────
app.get('/auth/callback', (req, res) => {
  const { code, state } = req.query as { code?: string; state?: string }
  const cookieState = req.cookies?.oauth_state as string | undefined

  if (!state || !code) {
    res.status(400).json({ error: 'Missing code or state parameter' })
    return
  }

  if (state !== cookieState || !validateState(state)) {
    res.status(403).json({ error: 'Invalid or expired state — possible CSRF attempt' })
    return
  }

  res.clearCookie('oauth_state')

  // Simulate successful token exchange response
  res.json({
    message: 'State validated. Token exchange would proceed server-side.',
    code,
    next: 'POST /auth/token',
  })
})

// ── POST /auth/token — URLSearchParams server-to-server exchange ────────────
app.post('/auth/token', (req, res) => {
  const { code } = req.body as { code?: string }

  if (!code) {
    res.status(400).json({ error: 'code is required' })
    return
  }

  const clientId = (process.env.OAUTH_CLIENT_ID ?? 'demo_client_id').trim()
  const clientSecret = (process.env.OAUTH_CLIENT_SECRET ?? 'demo_secret').trim()
  const redirectUri = (process.env.REDIRECT_URI ?? 'http://localhost:3001/auth/callback').trim()

  // URLSearchParams serialization — Content-Type: application/x-www-form-urlencoded
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  })

  // In production this goes to the real token endpoint; we simulate the response
  const mockToken = {
    access_token: 'mock_access_token_' + crypto.randomBytes(8).toString('hex'),
    token_type: 'Bearer',
    expires_in: 3600,
    id_token: buildMockIdToken(),
    serialized_body: body.toString(),
    content_type: 'application/x-www-form-urlencoded',
  }

  res.json(mockToken)
})

function buildMockIdToken(): string {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: 'usr_9f3a2b1c4d',
      email: 'demo.user@example.com',
      name: 'Demo User',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=proxy',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      iss: 'https://oauth.example.com',
    }),
  )
  return `${header}.${payload}.mock_signature`
}

// ── GET /auth/env — show var names only, never values ──────────────────────
app.get('/auth/env', (_req, res) => {
  res.json({ variables: ENV_KEYS.map(sanitizedEnvEntry) })
})

// ── POST /auth/sanitize — trim demo ────────────────────────────────────────
app.post('/auth/sanitize', (req, res) => {
  const { input } = req.body as { input?: string }

  if (typeof input !== 'string') {
    res.status(400).json({ error: 'input must be a string' })
    return
  }

  const before = input
  const after = input.trim()

  res.json({
    before,
    after,
    beforeLength: before.length,
    afterLength: after.length,
    changed: before !== after,
  })
})

app.listen(PORT, () => {
  console.log(`SecureAuth backend running on http://localhost:${PORT}`)
})
