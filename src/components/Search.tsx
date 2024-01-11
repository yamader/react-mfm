"use client"

import { MfmSearch } from "mfm-js"
import { useRef } from "react"

function google(query: string) {
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`)
}

const Search = ({ query }: MfmSearch["props"]) => {
  const input = useRef<HTMLInputElement>(null)

  return (
    <div className="mfm_search">
      <input type="search" defaultValue={query} placeholder={query} ref={input} className="mfm_search_button" />
      <button
        onClick={() => {
          const current = input.current?.value
          if (current) google(current)
        }}
        className="mfm_search_button">
        検索
      </button>
    </div>
  )
}

export default Search
