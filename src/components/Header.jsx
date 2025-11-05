import { Activity, Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-white">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">FitForge AI</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Smart gym plan generator</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>Personalized • Evidence-based • Ready to use</span>
        </div>
      </div>
    </header>
  )
}
