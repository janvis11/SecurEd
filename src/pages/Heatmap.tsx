import { useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Heatmap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let L: any;
    let heat: any;
    let map: any;

    const load = async () => {
      // load leaflet and heat plugin dynamically
      L = await import("leaflet");
      await import("leaflet.heat");

      if (!mapRef.current) return;

  // Center on Pune, Maharashtra, India
  map = L.map(mapRef.current).setView([18.5204, 73.8567], 12); // Pune center

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // sample points [lat, lng, intensity]
      // Sample incident points across Pune (lat, lng, intensity)
      const points = [
        [18.531289, 73.8672785, 0.9], // AISSMS IOIT
        [18.5204, 73.8567, 0.6], // Pune center
        [18.5339, 73.8420, 0.5], // Shivajinagar/nearby
        [18.5076, 73.8133, 0.7], // Katraj area
        [18.5466, 73.9089, 0.4], // Wagholi area
      ];

      // @ts-ignore
      heat = (L as any).heatLayer(points, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
    };

    load();

    return () => {
      try {
        if (map) map.remove();
      } catch (e) {
        // noop
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <Card>
          <CardHeader>
            <CardTitle>Incident Heatmap</CardTitle>
            <CardDescription>Visualize recent incident density across the campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={mapRef} className="w-full h-[60vh] rounded-md overflow-hidden" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Heatmap;
