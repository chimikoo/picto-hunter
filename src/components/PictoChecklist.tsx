"use client"

import { useEffect, useState } from "react"
import { type Character, pictoMap } from "../data/pictos"

type Props = {
  character: Character
  buildId: string
  pictoIds: string[]
}

export default function PictoChecklist({ buildId, pictoIds }: Props) {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({})
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<"all" | "checked" | "unchecked">("all")

  useEffect(() => {
    const key = `picto-checklist-global`
    const stored = localStorage.getItem(key)
    setChecked(stored ? JSON.parse(stored) : {})
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const key = `picto-checklist-global`
    localStorage.setItem(key, JSON.stringify(checked))
  }, [checked, loaded])

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredIds = pictoIds.filter((id) => {
    if (filter === "checked") return checked[id]
    if (filter === "unchecked") return !checked[id]
    return true
  })

  const progress =
    pictoIds.length > 0 ? Math.round((pictoIds.filter((id) => checked[id]).length / pictoIds.length) * 100) : 0

  return (
    <div className="darker-bg p-6 border darkgold-border relative overflow-hidden">
      {/* Add subtle diagonal lines in the background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #D4B36A, #D4B36A 1px, transparent 1px, transparent 10px)",
          backgroundSize: "14px 14px",
        }}
      ></div>

      <div className="relative z-10">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-serif gold-text">Progress: {progress}%</h3>
            <div className="text-sm text-gray-400">
              {pictoIds.filter((id) => checked[id]).length}/{pictoIds.length} found
            </div>
          </div>
          <div className="w-full bg-gray-800 h-2">
            <div className="gold-bg h-2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilter("all")} className={`filter-button ${filter === "all" ? "active" : ""}`}>
              All
            </button>
            <button
              onClick={() => setFilter("checked")}
              className={`filter-button ${filter === "checked" ? "active" : ""}`}
            >
              Found
            </button>
            <button
              onClick={() => setFilter("unchecked")}
              className={`filter-button ${filter === "unchecked" ? "active" : ""}`}
            >
              Not Found
            </button>
          </div>
        </div>

        {filteredIds.length === 0 ? (
          <p className="text-gray-400 italic text-center py-8">No pictos match the current filter.</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIds.map((id) => {
              const picto = pictoMap[id]
              if (!picto) return null

              return (
                <li key={id} className={`picto-item ${checked[id] ? "found" : ""} p-4`}>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id={id}
                      checked={!!checked[id]}
                      onChange={() => toggle(id)}
                      className="mt-1 mr-4 h-5 w-5 dark-bg gold-border gold-text rounded-none focus:ring-0"
                    />
                    <label htmlFor={id} className="cursor-pointer">
                      <span className="font-serif gold-text">{picto.picto}</span>
                      <br />
                      <span className="text-sm text-gray-400">{picto.location}</span>
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
