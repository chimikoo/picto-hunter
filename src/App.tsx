"use client";

import { useState, useEffect } from "react";
import CharacterSelector from "./components/CharacterSelector";
import BuildSelector from "./components/BuildSelector";
import PictoChecklist from "./components/PictoChecklist";
import { builds, type Character } from "./data/pictos";

export default function App() {
  const [character, setCharacter] = useState<Character>("verso");
  const [buildId, setBuildId] = useState<string>("");

  const characterBuilds = builds[character] || [];
  const selectedBuild = characterBuilds.find((b) => b.id === buildId);

  useEffect(() => {
    const saved = localStorage.getItem(`selected-build-${character}`);
    const available = characterBuilds.map((b) => b.id);

    if (saved && available.includes(saved)) {
      setBuildId(saved);
    } else if (available.length > 0) {
      setBuildId(available[0]);
    } else {
      setBuildId("");
    }
  }, [character]);

  useEffect(() => {
    if (buildId) {
      localStorage.setItem(`selected-build-${character}`, buildId);
    }
  }, [buildId, character]);

  const handleCharacterChange = (newCharacter: Character) => {
    setCharacter(newCharacter);
  };

  return (
    <main className="min-h-screen py-12 px-4 bg-[#0A0A0A] text-white">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-yellow-400 mb-4">EXPEDITION 33</h1>
          <h2 className="font-serif text-2xl md:text-3xl mb-2">PICTO CHECKLIST</h2>
          <div className="w-24 h-1 bg-[#D4B36A] mx-auto"></div>
        </header>

        <div className="relative overflow-hidden bg-[#121212] border border-[#A38A50] p-6 mb-8">
          <div
            className="absolute inset-0 opacity-5"
          />

          <div className="relative z-10">
            <CharacterSelector value={character} onChange={handleCharacterChange} />

            {characterBuilds.length === 0 ? (
              <p className="text-lg text-gray-400 mt-6 text-center py-8 italic">
                Currently no build available for{" "}
                <span className="font-serif text-yellow-400">{character}</span>.
              </p>
            ) : (
              <BuildSelector
                builds={characterBuilds}
                selectedBuildId={buildId}
                onChange={setBuildId}
              />
            )}
          </div>
        </div>

        {buildId && selectedBuild && (
          <PictoChecklist character={character} buildId={selectedBuild.id} pictoIds={selectedBuild.pictos} />
        )}
      </div>
    </main>
  );
}
