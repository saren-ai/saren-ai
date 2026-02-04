"use client";

import { useState } from "react";
import { personaData } from "@/lib/sovereign-personas";
import type { PersonaCard as PersonaCardType } from "@/lib/sovereign-personas";
import PersonaCard from "./PersonaCard";
import PersonaDrawer from "./PersonaDrawer";

export default function PersonaGallery() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaCardType | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {personaData.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            onShowDetails={setSelectedPersona}
          />
        ))}
      </div>

      {/* Drawer */}
      {selectedPersona && (
        <PersonaDrawer
          persona={selectedPersona}
          onClose={() => setSelectedPersona(null)}
        />
      )}
    </>
  );
}
