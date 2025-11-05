import { useMemo } from 'react'
import { Calendar, Download, Copy } from 'lucide-react'

export default function PlanPreview({ plan, onCopy }) {
  const weeks = plan?.program?.weeks || []
  const title = plan?.program?.title || 'Your plan'

  const textExport = useMemo(() => {
    if (!plan) return ''
    let lines = [title]
    weeks.forEach(w => {
      lines.push(`\nWeek ${w.week}`)
      w.days.forEach((d, idx) => {
        lines.push(`  Day ${idx+1} – ${d.title}`)
        d.exercises.forEach(ex => {
          lines.push(`    • ${ex.name} — ${ex.reps}`)
        })
      })
    })
    return lines.join('\n')
  }, [plan, title, weeks])

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2"><Calendar className="h-5 w-5 text-indigo-600"/> {title}</h2>
          {plan?.name && <p className="text-sm text-slate-500">for {plan.name}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>{navigator.clipboard.writeText(textExport); onCopy && onCopy()}} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"><Copy className="h-4 w-4"/> Copy</button>
          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(textExport)}`} download="fitforge-plan.txt" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"><Download className="h-4 w-4"/> Export</a>
        </div>
      </div>

      <div className="mt-4 space-y-6">
        {weeks.map(w => (
          <div key={w.week} className="rounded-xl border border-slate-200">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-sm font-medium">Week {w.week}</div>
            <div className="divide-y divide-slate-200">
              {w.days.map((d, idx) => (
                <div key={idx} className="p-4">
                  <h3 className="font-semibold mb-2">Day {idx+1} — {d.title}</h3>
                  <ul className="space-y-1.5">
                    {d.exercises.map((ex, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-800">{ex.name}</span>
                        <span className="text-slate-600">{ex.reps}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
