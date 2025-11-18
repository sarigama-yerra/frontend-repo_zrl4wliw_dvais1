import { useEffect, useState } from 'react'
import LeagueSelector from './components/LeagueSelector'
import Standings from './components/Standings'
import Matches from './components/Matches'

function App() {
  const [leagueId, setLeagueId] = useState('')
  const [seeded, setSeeded] = useState(false)

  // Auto-seed on first load to provide demo data
  useEffect(() => {
    const seed = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/seed/maltese-youth-league`, { method: 'POST' })
        setSeeded(true)
      } catch (e) {
        console.error(e)
      }
    }
    seed()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Maltese Youth Football</h1>
          <LeagueSelector onSelect={setLeagueId} />
        </div>

        {!leagueId && (
          <div className="text-blue-200">Select a league to view standings and matches.</div>
        )}

        <Standings leagueId={leagueId} />
        <Matches leagueId={leagueId} />
      </div>
    </div>
  )
}

export default App
