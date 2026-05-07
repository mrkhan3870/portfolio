// ── Code snippet display ─────────────────────────────────────────────────────

interface CodeBlockProps {
  code: string
  variant: 'broken' | 'fixed'
}

function CodeBlock({ code, variant }: CodeBlockProps) {
  const borderClass = variant === 'broken' ? 'border-red-300' : 'border-green-300'
  const bgClass = variant === 'broken' ? 'bg-red-950' : 'bg-green-950'
  const textClass = variant === 'broken' ? 'text-red-200' : 'text-green-200'

  return (
    <pre
      className={`rounded-lg border ${borderClass} ${bgClass} ${textClass} text-xs leading-relaxed p-4 overflow-x-auto`}
    >
      <code>{code}</code>
    </pre>
  )
}

// ── Badge ────────────────────────────────────────────────────────────────────

function Badge({ variant }: { variant: 'broken' | 'fixed' }) {
  return variant === 'broken' ? (
    <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
      Bug
    </span>
  ) : (
    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
      Fixed
    </span>
  )
}

// ── Demo 1: Stacking context ─────────────────────────────────────────────────

const BROKEN_CSS = `.card::after {
  z-index: 10;
  pointer-events: auto;
}`

const FIXED_CSS = `.card {
  isolation: isolate;
}
.card::after {
  z-index: -1;
  pointer-events: none;
}`

function StackingContextDemo() {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Demo 1: Stacking Context Bug</h3>
      <p className="text-sm text-slate-500 mb-6">
        A CSS <code className="font-mono text-violet-700 bg-violet-50 rounded px-1">::after</code> overlay
        with an incorrect <code className="font-mono text-violet-700 bg-violet-50 rounded px-1">z-index</code> and{' '}
        <code className="font-mono text-violet-700 bg-violet-50 rounded px-1">pointer-events</code> value
        can make interactive elements inside a card completely unreachable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Broken card */}
        <div className="flex flex-col gap-4">
          <div className="demo-broken-card rounded-xl border border-red-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-800">❌ Broken: z-index Overlap</h4>
              <Badge variant="broken" />
            </div>
            <p className="text-xs text-slate-600 mb-3">
              A <code className="font-mono">::after</code> pseudo-element with{' '}
              <code className="font-mono">z-index: 10</code> overlays the entire card, making the
              link below unclickable.
            </p>
            <p className="text-xs text-slate-500 mb-2">Try clicking the link:</p>
            <a
              href="#stacking-context-demo"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-violet-600 underline hover:text-violet-800"
            >
              Click me (broken)
            </a>
          </div>
          <CodeBlock code={BROKEN_CSS} variant="broken" />
        </div>

        {/* Fixed card */}
        <div className="flex flex-col gap-4">
          <div className="demo-fixed-card rounded-xl border border-green-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-800">✅ Fixed: isolation: isolate</h4>
              <Badge variant="fixed" />
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Adding <code className="font-mono">isolation: isolate</code> and moving the overlay
              to <code className="font-mono">z-index: -1</code> restores click events. The link is
              now functional.
            </p>
            <p className="text-xs text-slate-500 mb-2">Try clicking the link:</p>
            <a
              href="#stacking-context-demo"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-violet-600 underline hover:text-violet-800"
            >
              Click me (works!)
            </a>
          </div>
          <CodeBlock code={FIXED_CSS} variant="fixed" />
        </div>
      </div>
    </div>
  )
}

// ── Demo 2: Import error / white screen ──────────────────────────────────────

const BROKEN_IMPORT = `// DeletedWidget was removed from codebase
import DeletedWidget from './DeletedWidget'

export default function Dashboard() {
  return (
    <div>
      <DeletedWidget /> {/* 💥 White screen */}
    </div>
  )
}`

const FIXED_IMPORT = `// Import removed, component replaced inline
export default function Dashboard() {
  const [widget, setWidget] = useState(null)

  return (
    <div>
      {widget ? <div>{widget}</div> : null}
    </div>
  )
}`

function ImportErrorDemo() {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Demo 2: Import Error / White Screen</h3>
      <p className="text-sm text-slate-500 mb-6">
        Importing a deleted module causes a runtime bundle error that crashes the entire React tree,
        showing a blank white screen. Removing the stale import and guarding the render fixes it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Broken */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">❌ Broken: Missing Import</span>
            <Badge variant="broken" />
          </div>
          <CodeBlock code={BROKEN_IMPORT} variant="broken" />
        </div>

        {/* Fixed */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800">✅ Fixed: Conditional Render + Cleanup</span>
            <Badge variant="fixed" />
          </div>
          <CodeBlock code={FIXED_IMPORT} variant="fixed" />
        </div>
      </div>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function BugFixDemo() {
  return (
    <section aria-labelledby="bugfix-heading">
      <div className="mb-10 text-center">
        <h2
          id="bugfix-heading"
          className="text-3xl font-extrabold text-slate-900 mb-2"
        >
          Engineering Challenges Solved
        </h2>
        <p className="text-slate-500 text-base">
          Real debugging work — reproduced in isolation.
        </p>
      </div>

      <div className="flex flex-col gap-14">
        <StackingContextDemo />
        <ImportErrorDemo />
      </div>
    </section>
  )
}
