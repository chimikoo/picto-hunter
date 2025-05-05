"use client"

import type { Build } from "../data/pictos"

interface Props {
  builds: Build[]
  selectedBuildId: string
  onChange: (id: string) => void
}

export default function BuildSelector({ builds, selectedBuildId, onChange }: Props) {
  return (
    <div className="mb-8">
      <label className="block font-serif text-xl gold-text mb-3">Select Build</label>
      <select
        className="expedition-select w-full sm:w-64"
        value={selectedBuildId}
        onChange={(e) => onChange(e.target.value)}
      >
        {builds.map((build) => (
          <option key={build.id} value={build.id}>
            {build.name}
          </option>
        ))}
      </select>

      {builds.find((b) => b.id === selectedBuildId)?.description && (
        <p className="text-sm text-gray-400 mt-3 italic border-l-2 darkgold-border pl-3">
          {builds.find((b) => b.id === selectedBuildId)?.description}
        </p>
      )}
    </div>
  )
}
