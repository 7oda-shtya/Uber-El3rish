import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSpinner, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { searchPlaces } from '../../utils/geo'

const LocationSearchInput = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    const handle = setTimeout(() => {
      searchPlaces(query).then((places) => {
        setResults(places)
        setLoading(false)
      })
    }, 450)
    return () => clearTimeout(handle)
  }, [query])

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='relative'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs' />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className='w-full bg-zinc-800 border border-zinc-700/60 rounded-xl pr-9 pl-8 py-2.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-zinc-500'
        />
        {loading && <FontAwesomeIcon icon={faSpinner} className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs animate-spin' />}
      </div>

      {results.length > 0 && (
        <ul className='bg-zinc-800/60 border border-zinc-700/40 rounded-xl overflow-hidden divide-y divide-zinc-700/40 max-h-48 overflow-y-auto'>
          {results.map((place, i) => (
            <li key={i}>
              <button
                onClick={() => onSelect(place)}
                className='w-full text-right px-3 py-2.5 text-xs text-zinc-200 hover:bg-zinc-700/50 flex items-center gap-2 transition-colors'
              >
                <FontAwesomeIcon icon={faLocationDot} className='text-zinc-500 text-[10px] shrink-0' />
                <span className='truncate'>{place.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LocationSearchInput
