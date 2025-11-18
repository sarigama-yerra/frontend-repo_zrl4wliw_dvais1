import { useEffect, useState } from 'react'

export default function LeagueSelector({ onSelect }) {
  const [leagues, setLeagues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leagues`)
        const data = await res.json()
        setLeagues(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-blue-200">Loading leagues...</div>

  return (
    <div className="flex items-center gap-3">
      <label className="text-blue-200">League</label>
      <select onChange={e => onSelect(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded border border-blue-500/30">
        <option value="">Select a league</option>
        {leagues.map(l => (
          <option key={l.id} value={l.id}>{l.name}</option>
        ))}
      </select>
    </div>
  )
}
