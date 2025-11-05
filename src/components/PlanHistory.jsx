import { useEffect, useState } from 'react'
import { History } from 'lucide-react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function PlanHistory({ onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPlans = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/plans`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2"><History className="h-5 w-5 text-indigo-600"/> Recent plans</h2>
        <button onClick={fetchPlans} className="text-sm text-indigo-600 hover:text-indigo-700">Refresh</button>
      </div>
      <div className="divide-y divide-slate-200">
        {loading && <p className="text-sm text-slate-500 py-3">Loading...</p>}
        {!loading && items.length === 0 && <p className="text-sm text-slate-500 py-3">No plans yet. Generate one to get started.</p>}
        {items.map(p => (
          <button key={p.id} onClick={()=>onSelect && onSelect(p)} className="w-full text-left py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg">
            <div>
              <div className="font-medium">{p.program?.title || p.title}</div>
              <div className="text-xs text-slate-500">{p.goal} • {p.days_per_week}d/wk • {p.duration_weeks}w</div>
            </div>
            <div className="text-xs text-slate-400">{new Date(p.created_at || Date.now()).toLocaleString()}</div>
          </button>
        ))}
      </div>
    </section>
  )
}
