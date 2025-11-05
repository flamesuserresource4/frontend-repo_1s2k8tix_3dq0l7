import { useState } from 'react'
import { Loader2, Wand2 } from 'lucide-react'

const goals = ["Build Muscle", "Lose Fat", "Get Stronger", "Endurance"]
const levels = ["Beginner", "Intermediate", "Advanced"]
const allEquipment = ["Dumbbells", "Barbell", "Machines", "Bodyweight", "Kettlebells"]
const focuses = ["Full Body", "Upper/Lower", "Push/Pull/Legs", "Glutes", "Arms", "Core"]

export default function PlanForm({ onGenerate, loading }) {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState(goals[0])
  const [experience, setExperience] = useState(levels[0])
  const [days, setDays] = useState(3)
  const [weeks, setWeeks] = useState(8)
  const [equipment, setEquipment] = useState(["Dumbbells", "Bodyweight"])
  const [focus, setFocus] = useState(["Full Body"]) 
  const [constraints, setConstraints] = useState("")

  const toggle = (arr, setArr, item) => {
    if (arr.includes(item)) setArr(arr.filter(i => i !== item))
    else setArr([...arr, item])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate({
      name: name || undefined,
      goal,
      experience,
      days_per_week: days,
      duration_weeks: weeks,
      equipment,
      focus_areas: focus,
      constraints: constraints || undefined,
    })
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Your training preferences</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm text-slate-600">Name (optional)</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="e.g., Alex" className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-600">Primary goal</label>
          <select value={goal} onChange={(e)=>setGoal(e.target.value)} className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            {goals.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-600">Experience</label>
          <select value={experience} onChange={(e)=>setExperience(e.target.value)} className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-600">Days per week: {days}</label>
          <input type="range" min={1} max={7} value={days} onChange={(e)=>setDays(Number(e.target.value))} className="w-full" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-slate-600">Duration (weeks)</label>
          <select value={weeks} onChange={(e)=>setWeeks(Number(e.target.value))} className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            {[4,6,8,10,12,16].map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm text-slate-600">Equipment</label>
          <div className="flex flex-wrap gap-2">
            {allEquipment.map(eq => (
              <button type="button" key={eq} onClick={()=>toggle(equipment, setEquipment, eq)} className={`px-3 py-1.5 rounded-lg border ${equipment.includes(eq)?'bg-indigo-50 border-indigo-300 text-indigo-700':'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                {eq}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm text-slate-600">Focus areas</label>
          <div className="flex flex-wrap gap-2">
            {focuses.map(f => (
              <button type="button" key={f} onClick={()=>toggle(focus, setFocus, f)} className={`px-3 py-1.5 rounded-lg border ${focus.includes(f)?'bg-emerald-50 border-emerald-300 text-emerald-700':'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm text-slate-600">Constraints or injuries (optional)</label>
          <textarea value={constraints} onChange={(e)=>setConstraints(e.target.value)} rows={3} placeholder="e.g., avoid heavy overhead pressing due to shoulder" className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2.5 font-medium shadow-sm hover:bg-indigo-700 disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4"/>}
            {loading ? 'Generating plan...' : 'Generate plan'}
          </button>
        </div>
      </form>
    </section>
  )
}
