import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Image,
  Settings,
  Bold,
  Italic,
  Underline,
  Undo2,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string
  label: string
  icon: React.ReactNode
}

type Tab = 'editor' | 'profiles'

type ExperienceTag =
  | 'Yoga'
  | 'Meditation'
  | 'Breathwork'
  | 'Nutrition'
  | 'Ayurveda'
  | 'Sound Healing'

interface WellnessCenter {
  id: number
  name: string
  tagline: string
  location: string
  tags: ExperienceTag[]
  imageUrl: string
}

interface ProfileFormState {
  name: string
  tagline: string
  location: string
  tags: ExperienceTag[]
  imageUrl: string
}

// ── Static data ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',        icon: <LayoutDashboard className="w-4 h-4" aria-hidden="true" /> },
  { id: 'articles',  label: 'Articles',         icon: <FileText        className="w-4 h-4" aria-hidden="true" /> },
  { id: 'centers',   label: 'Wellness Centers', icon: <MapPin          className="w-4 h-4" aria-hidden="true" /> },
  { id: 'media',     label: 'Media',            icon: <Image           className="w-4 h-4" aria-hidden="true" /> },
  { id: 'settings',  label: 'Settings',         icon: <Settings        className="w-4 h-4" aria-hidden="true" /> },
]

const EXPERIENCE_TAGS: ExperienceTag[] = [
  'Yoga',
  'Meditation',
  'Breathwork',
  'Nutrition',
  'Ayurveda',
  'Sound Healing',
]

const SEED_CENTERS: WellnessCenter[] = [
  {
    id: 1,
    name: 'Sanctuary Springs',
    tagline: 'Where stillness meets science.',
    location: 'Sedona, AZ',
    tags: ['Yoga', 'Meditation', 'Breathwork'],
    imageUrl: '',
  },
  {
    id: 2,
    name: 'Verde Balance Studio',
    tagline: 'Rooted in nature, grounded in practice.',
    location: 'Austin, TX',
    tags: ['Nutrition', 'Ayurveda'],
    imageUrl: '',
  },
  {
    id: 3,
    name: 'Lumina Holistic Centre',
    tagline: 'Full-spectrum healing for the modern soul.',
    location: 'Portland, OR',
    tags: ['Sound Healing', 'Meditation', 'Yoga'],
    imageUrl: '',
  },
  {
    id: 4,
    name: 'Tide & Breath Retreat',
    tagline: 'Ocean-inspired wellness, every season.',
    location: 'Big Sur, CA',
    tags: ['Breathwork', 'Sound Healing'],
    imageUrl: '',
  },
]

const INITIAL_EDITOR_HTML = `<p>The breath is the most immediate tool we have for influencing the autonomic nervous system. Unlike heart rate or digestion, respiration sits at the intersection of voluntary and involuntary control — making it a uniquely powerful lever for self-regulation.</p>

<p>In this piece, we explore how structured breathwork practices — from box breathing to coherent breathing at 5.5 breaths per minute — produce measurable shifts in heart-rate variability, cortisol levels, and subjective reports of calm. We also examine the neuroimaging evidence emerging from labs at Stanford and the Max Planck Institute, which is beginning to map exactly which brain circuits are recruited during conscious breath control.</p>`

const EMPTY_FORM: ProfileFormState = {
  name: '',
  tagline: '',
  location: '',
  tags: [],
  imageUrl: '',
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  title,
  children,
  variant = 'default',
}: {
  onClick: () => void
  title: string
  children: React.ReactNode
  variant?: 'default' | 'success'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`
        inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded text-sm font-medium
        transition-colors duration-150 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-1 focus-visible:outline-teal-500
        ${
          variant === 'success'
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
        }
      `}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <span className="inline-block w-px h-6 bg-slate-200 mx-1" aria-hidden="true" />
}

// ── Rich Text Editor tab ───────────────────────────────────────────────────────

function RichTextEditor() {
  const [undoDone, setUndoDone] = useState(false)

  function execCmd(command: string) {
    document.execCommand(command, false)
  }

  function handleUndo() {
    execCmd('undo')
    setUndoDone(true)
    setTimeout(() => setUndoDone(false), 1400)
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-800 mb-4">Rich Text Editor</h3>

      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border border-slate-200 rounded-t-lg"
        role="toolbar"
        aria-label="Text formatting toolbar"
      >
        <ToolbarButton onClick={() => execCmd('bold')}      title="Bold">
          <Bold className="w-3.5 h-3.5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd('italic')}    title="Italic">
          <Italic className="w-3.5 h-3.5" aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCmd('underline')} title="Underline">
          <Underline className="w-3.5 h-3.5" aria-hidden="true" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          onClick={() => {
            const sel = window.getSelection()
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0)
              const node = document.createElement('h3')
              node.className = 'text-lg font-semibold text-slate-800 my-2'
              node.textContent = sel.toString() || 'Subtitle'
              range.deleteContents()
              range.insertNode(node)
            }
          }}
          title="Insert Subtitle"
        >
          <span className="text-xs font-bold">Subtitle</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const sel = window.getSelection()
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0)
              const node = document.createElement('ol')
              node.className = 'list-decimal pl-5 text-sm text-slate-600 my-2'
              const li = document.createElement('li')
              li.textContent = 'Reference entry'
              node.appendChild(li)
              range.deleteContents()
              range.insertNode(node)
            }
          }}
          title="Insert Reference List"
        >
          <span className="text-xs font-bold">Reference List</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const sel = window.getSelection()
            if (sel && sel.rangeCount > 0) {
              const range = sel.getRangeAt(0)
              const cite = document.createElement('cite')
              cite.className = 'text-xs text-slate-400 italic'
              cite.textContent = `(${sel.toString() || 'Author, Year'})`
              range.deleteContents()
              range.insertNode(cite)
            }
          }}
          title="Insert In-text Citation"
        >
          <span className="text-xs font-bold">In-text Citation</span>
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          onClick={handleUndo}
          title="Undo"
          variant={undoDone ? 'success' : 'default'}
        >
          {undoDone ? (
            <span className="text-xs font-semibold">✓ Undone</span>
          ) : (
            <Undo2 className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div
        contentEditable
        role="textbox"
        aria-multiline="true"
        aria-label="Article body editor"
        suppressContentEditableWarning
        className="min-h-[200px] p-4 border border-t-0 border-slate-200 rounded-b-lg bg-white text-slate-700 text-sm leading-relaxed focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: INITIAL_EDITOR_HTML }}
      />
      <p className="mt-2 text-xs text-slate-400">
        Select text and click a toolbar button to apply formatting.
      </p>
    </div>
  )
}

// ── Center Profiles tab ────────────────────────────────────────────────────────

function CenterProfiles() {
  const [centers, setCenters] = useState<WellnessCenter[]>(SEED_CENTERS)
  const [form, setForm] = useState<ProfileFormState>(EMPTY_FORM)
  const [nextId, setNextId] = useState<number>(SEED_CENTERS.length + 1)

  function handleTextChange(field: keyof Omit<ProfileFormState, 'tags'>, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleTagToggle(tag: ExperienceTag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name.trim()) return
    const newCenter: WellnessCenter = {
      id: nextId,
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      location: form.location.trim(),
      tags: form.tags,
      imageUrl: form.imageUrl.trim(),
    }
    setCenters((prev) => [...prev, newCenter])
    setNextId((n) => n + 1)
    setForm(EMPTY_FORM)
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-slate-800 mb-4">Center Profiles</h3>

      {/* Add-center form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-8 space-y-4"
        aria-label="Add wellness center"
      >
        <h4 className="text-sm font-semibold text-slate-700">Add New Center</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="center-name" className="block text-xs font-medium text-slate-600 mb-1">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="center-name"
              type="text"
              value={form.name}
              onChange={(e) => handleTextChange('name', e.target.value)}
              placeholder="e.g. Serenity Grove"
              required
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            />
          </div>

          {/* Tagline */}
          <div>
            <label htmlFor="center-tagline" className="block text-xs font-medium text-slate-600 mb-1">
              Tagline
            </label>
            <input
              id="center-tagline"
              type="text"
              value={form.tagline}
              onChange={(e) => handleTextChange('tagline', e.target.value)}
              placeholder="e.g. Find your centre."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="center-location" className="block text-xs font-medium text-slate-600 mb-1">
              Location
            </label>
            <input
              id="center-location"
              type="text"
              value={form.location}
              onChange={(e) => handleTextChange('location', e.target.value)}
              placeholder="e.g. Santa Fe, NM"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="center-image" className="block text-xs font-medium text-slate-600 mb-1">
              Image URL
            </label>
            <input
              id="center-image"
              type="url"
              value={form.imageUrl}
              onChange={(e) => handleTextChange('imageUrl', e.target.value)}
              placeholder="https://..."
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            />
          </div>
        </div>

        {/* Experience tags */}
        <fieldset>
          <legend className="text-xs font-medium text-slate-600 mb-2">Experience Tags</legend>
          <div className="flex flex-wrap gap-3">
            {EXPERIENCE_TAGS.map((tag) => (
              <label
                key={tag}
                className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={form.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                {tag}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            Add Center
          </button>
        </div>
      </form>

      {/* Centers table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm" aria-label="Wellness centers">
          <thead className="bg-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wide">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">Name</th>
              <th scope="col" className="px-4 py-3 text-left">Location</th>
              <th scope="col" className="px-4 py-3 text-left">Tags</th>
              <th scope="col" className="px-4 py-3 text-left">Tagline</th>
            </tr>
          </thead>
          <tbody>
            {centers.map((center, i) => (
              <tr
                key={center.id}
                className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                  {center.name}
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                  {center.location || '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {center.tags.length > 0
                      ? center.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block bg-teal-50 text-teal-700 text-xs font-medium px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))
                      : <span className="text-slate-400">—</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-500 italic">
                  {center.tagline || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function CMSConsole() {
  const [activeNav, setActiveNav] = useState<string>('articles')
  const [activeTab, setActiveTab] = useState<Tab>('editor')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'editor',   label: 'Rich Text Editor' },
    { id: 'profiles', label: 'Center Profiles'  },
  ]

  return (
    <div className="flex rounded-xl border border-slate-200 overflow-hidden min-h-[520px] bg-white shadow-sm">

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <nav
        className="w-52 flex-shrink-0 bg-slate-900 flex flex-col"
        aria-label="Content Manager navigation"
      >
        {/* Heading */}
        <div className="px-4 pt-5 pb-4 border-b border-slate-700/60">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
            Content Manager
          </p>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-0.5 p-3 flex-1" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-150 text-left
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-400
                    ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/60">
          <p className="text-xs text-slate-500 text-center">Aether CMS v2.1</p>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Tab bar */}
        <div
          className="flex border-b border-slate-200 bg-slate-50 px-6 pt-4 gap-1"
          role="tablist"
          aria-label="CMS editor tabs"
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 -mb-px transition-colors duration-150
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-500
                  ${
                    isSelected
                      ? 'border-teal-600 text-teal-700 bg-white'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/60'
                  }
                `}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab panels */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'editor'   && <RichTextEditor />}
          {activeTab === 'profiles' && <CenterProfiles />}
        </div>
      </div>

    </div>
  )
}
