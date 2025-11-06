import React from "react";
import EmbeddedLab from "@/components/EmbeddedLab";
import { Navigation } from "@/components/Navigation";

// Default demo: PhET Projectile Motion (openly embeddable on PhET's site)
const DEFAULT_PETHT_PROJECTILE = "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html";

const EmbeddedDemo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Embedded Simulation Demo</h1>
          <p className="text-muted-foreground mb-6">This page demonstrates safely embedding an external interactive simulation using an iframe. The demo uses a PhET simulation (openly embeddable).</p>

          <div className="rounded-lg overflow-hidden border">
            <EmbeddedLab src={DEFAULT_PETHT_PROJECTILE} title="PhET: Projectile Motion" height={"80vh"} />
          </div>

          <p className="text-xs text-muted-foreground mt-4">Note: Before embedding third-party content in production, verify the target provider's license and ensure embedding is permitted.</p>
        </div>
      </main>
    </div>
  );
};

export default EmbeddedDemo;
