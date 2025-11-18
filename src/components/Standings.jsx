import { useEffect, useState } from 'react'

export default function Standings({ leagueId }) {
  const [rows, setRows] = useState([])
  useEffect(() => {
    if (!leagueId) return
    const load = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leagues/${leagueId}/standings`)
      const data = await res.json()
      setRows(data)
    }
    load()
  }, [leagueId])

  if (!leagueId) return null

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-blue-500/20 text-white font-semibold">Standings</div>
      <div className="divide-y divide-blue-500/10">
        <div className="grid grid-cols-10 px-4 py-2 text-xs text-blue-300/80 uppercase">
          <div>#</div><div className="col-span-3">Team</div><div>P</div><div>W</div><div>D</div><div>L</div><div>F</div><div>A</div><div>Pts</div>
        </div>
        {rows.map(r => (
          <div key={r.team_id} className="grid grid-cols-10 px-4 py-2 text-blue-100">
            <div>{r.position}</div>
            <div className="col-span-3">{r.team_name}</div>
            <div>{r.P}</div>
            <div>{r.W}</div>
            <div>{r.D}</div>
            <div>{r.L}</div>
            <div>{r.F}</div>
            <div>{r.A}</div>
            <div className="font-semibold">{r.Pts}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
