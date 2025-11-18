import { useEffect, useState } from 'react'

function Section({ title, children }) {
  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-blue-500/20 text-white font-semibold">{title}</div>
      <div className="p-3 space-y-2">{children}</div>
    </div>
  )
}

export default function Matches({ leagueId }) {
  const [upcoming, setUpcoming] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!leagueId) return
    const load = async () => {
      const [u, r] = await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leagues/${leagueId}/matches/upcoming`).then(res => res.json()),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/leagues/${leagueId}/matches/results`).then(res => res.json())
      ])
      setUpcoming(u)
      setResults(r)
    }
    load()
  }, [leagueId])

  if (!leagueId) return null

  const Row = ({ m }) => (
    <div className="flex items-center justify-between text-blue-100">
      <div className="flex-1">{m.home} vs {m.away}</div>
      <div className="w-28 text-right text-blue-300/80 text-sm">{m.date ? new Date(m.date).toLocaleDateString() : '-'}</div>
      {m.score && <div className="w-20 text-right font-semibold">{m.score}</div>}
    </div>
  )

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Section title="Upcoming Matches">
        {upcoming.length === 0 && <div className="text-blue-300/70">No upcoming matches</div>}
        {upcoming.map(m => <Row key={m.id} m={m} />)}
      </Section>
      <Section title="Recent Results">
        {results.length === 0 && <div className="text-blue-300/70">No results yet</div>}
        {results.map(m => <Row key={m.id} m={m} />)}
      </Section>
    </div>
  )
}
