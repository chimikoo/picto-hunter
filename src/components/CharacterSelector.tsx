"use client"

import type { Character } from "../data/pictos"

interface Props {
  value: Character
  onChange: (value: Character) => void
}

export default function CharacterSelector({ value, onChange }: Props) {
  const characters: Character[] = ["verso", "lune", "maelle", "sciel", "monoco"]

  return (
    <div className="mb-8">
      <label className="block font-serif text-xl gold-text mb-3">Select Character</label>
      <select
        className="expedition-select w-full sm:w-64"
        value={value}
        onChange={(e) => onChange(e.target.value as Character)}
      >
        {characters.map((char) => (
          <option key={char} value={char}>
            {char.charAt(0).toUpperCase() + char.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
