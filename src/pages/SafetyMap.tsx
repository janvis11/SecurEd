import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, AlertTriangle, Heart, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const SafetyMap = () => {
  const navigate = useNavigate();

  const safeZones = [
    { name: "Main Assembly Point", type: "Primary", location: "School Ground", icon: Shield, color: "bg-success" },
    { name: "Secondary Assembly", type: "Backup", location: "Basketball Court", icon: MapPin, color: "bg-secondary" },
    { name: "Medical Station", type: "Emergency", location: "Nurse's Office", icon: Heart, color: "bg-destructive" },
    { name: "Emergency Exit A", type: "Evacuation", location: "East Wing", icon: Home, color: "bg-primary" },
  ];

  const hazards = [
    { name: "Chemistry Lab", risk: "High", reason: "Flammable materials" },
    { name: "Stairs Near Cafeteria", risk: "Medium", reason: "Crowding risk" },
    { name: "Old Building Wing", risk: "High", reason: "Structural concerns" },
  ];

  // Small helper component to render a Leaflet map inside the card
  const MapContainerPlaceholder = () => {
    const mapRef = (el: HTMLDivElement | null) => {
      if (!el) return;

      // dynamic import to avoid SSR / initial bundle issues
      (async () => {
        const L = await import("leaflet");

        // create map if not already created
        // Center the campus map on AISSMS IOIT, Pune
        const map = L.map(el).setView([18.531289, 73.8672785], 17);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // sample coordinates for safe zones and hazards; these should be replaced with real geo coords
        // Sample coordinates on/around the AISSMS IOIT campus (approximate)
        const sampleSafeCoords = [
          [18.531400, 73.866900], // Main Assembly / open ground
          [18.531100, 73.867700], // Secondary assembly
          [18.531600, 73.867000], // Medical / clinic
          [18.531200, 73.868200], // Emergency exit
        ];

        const sampleHazardCoords = [
          [18.531000, 73.866200], // Lab block
          [18.530700, 73.866800], // Narrow stairwell
          [18.532000, 73.867800], // Old building wing
        ];

        // Add safe zone markers
        sampleSafeCoords.forEach((c: number[], idx: number) => {
          const marker = L.circleMarker(c, { radius: 8, color: "#16a34a", fillColor: "#16a34a", fillOpacity: 0.9 }).addTo(map);
          marker.bindPopup(`<strong>${safeZones[idx]?.name ?? 'Safe Zone'}</strong><br/>${safeZones[idx]?.location ?? ''}`);
        });

        // Add hazard markers
        sampleHazardCoords.forEach((c: number[], idx: number) => {
          const marker = L.circleMarker(c, { radius: 8, color: "#dc2626", fillColor: "#dc2626", fillOpacity: 0.9 }).addTo(map);
          marker.bindPopup(`<strong>${hazards[idx]?.name ?? 'Hazard'}</strong><br/>${hazards[idx]?.reason ?? ''}`);
        });

        // Add scale
        L.control.scale({ imperial: false }).addTo(map);
      })();
    };

    return <div ref={mapRef} className="w-full h-full" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto max-w-6xl space-y-6 p-6 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Safety Zones Map</h1>
            <p className="text-muted-foreground text-lg">Navigate campus safety points and evacuation routes</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        {/* Interactive Map Placeholder */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Campus Overview
            </CardTitle>
            <CardDescription>Click on markers to view detailed information about each location</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                <MapContainerPlaceholder />

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
                  <h4 className="font-semibold mb-2 text-sm">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success rounded"></div>
                      <span>Safe Zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded"></div>
                      <span>High Risk Areas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span>Emergency Exits</span>
                    </div>
                  </div>
                </div>
              </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Safe Zones List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Designated Safe Zones
              </CardTitle>
              <CardDescription>Emergency assembly and safety points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {safeZones.map((zone, index) => (
                <Card key={index} className="border hover:border-success transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${zone.color} flex items-center justify-center text-white flex-shrink-0`}>
                        <zone.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{zone.name}</h4>
                          <Badge variant="outline">{zone.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{zone.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Hazard Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                High-Risk Areas
              </CardTitle>
              <CardDescription>Areas to avoid during emergencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {hazards.map((hazard, index) => (
                <Card key={index} className="border-2 border-destructive/20 bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{hazard.name}</h4>
                          <Badge variant="destructive">{hazard.risk} Risk</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{hazard.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-muted/50 border-2 border-dashed">
                <CardContent className="p-4">
                  <p className="text-sm text-center text-muted-foreground">
                    <strong>Remember:</strong> During an emergency, follow evacuation routes and avoid these areas
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;
