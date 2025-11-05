import { useState } from 'react'
import Header from './components/Header'
import PlanForm from './components/PlanForm'
import PlanPreview from './components/PlanPreview'
import PlanHistory from './components/PlanHistory'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [toast, setToast] = useState('')

  const generatePlan = async (payload) => {
    setLoading(true)
    setToast('')
    try {
      const res = await fetch(`${BACKEND}/api/generate-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to generate')
      setPlan(data.plan)
      setToast('Plan generated and saved!')
    } catch (e) {
      console.error(e)
      setToast('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setTimeout(()=>setToast(''), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <PlanForm onGenerate={generatePlan} loading={loading} />
          {plan && <PlanPreview plan={plan} onCopy={()=>setToast('Copied to clipboard')} />}
        </div>
        <div className="lg:col-span-2">
          <PlanHistory onSelect={setPlan} />
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm shadow-lg">{toast}</div>
        </div>
      )}

      <footer className="py-8 text-center text-sm text-slate-500">
        Built with ❤️ by FitForge AI
      </footer>
    </div>
  )
}
