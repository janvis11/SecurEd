import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin } from "lucide-react";
import { toast } from "sonner";

const SOS = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnableLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast.success("Location fetched successfully!");
        setLoading(false);
      },
      (error) => {
        console.error(error);
        toast.error("Unable to fetch location. Please allow location access.");
        setLoading(false);
      }
    );
  };

  const emergencyNumbers = [
    { label: "Police", number: "100" },
    { label: "Ambulance", number: "108" },
    { label: "Fire", number: "101" },
    { label: "Women Helpline", number: "1091" },
    { label: "Disaster Management", number: "108" },
    { label: "Child Helpline", number: "1098" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-red-600 flex items-center justify-center gap-2">
            <AlertTriangle className="w-10 h-10" />
            Emergency SOS
          </h1>
          <p className="text-lg text-muted-foreground">
            Get help immediately in case of emergency
          </p>

          <section className="text-left bg-red-50 dark:bg-red-900/20 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-red-700">What is SOS?</h2>
            <p>
              The SOS feature is designed to help you in emergency situations:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Automatically detects and shares your current location</li>
              <li>Provides quick access to Indian emergency services</li>
              <li>Allows you to call emergency numbers with one tap</li>
              <li>Sends alerts to relevant authorities with your location</li>
            </ul>
          </section>

          <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-red-700 flex items-center gap-2">
              <MapPin className="w-6 h-6" /> Your Location
            </h2>
            {location ? (
              <p className="text-muted-foreground">
                Latitude: {location.latitude.toFixed(5)}, Longitude: {location.longitude.toFixed(5)}
              </p>
            ) : (
              <Button
                onClick={handleEnableLocation}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? "Fetching Location..." : "Enable Location"}
              </Button>
            )}
          </section>

          <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-red-700">Indian Emergency Numbers</h2>
            <div className="grid grid-cols-2 gap-4">
              {emergencyNumbers.map((emergency) => (
                <Button
                  key={emergency.number}
                  as="a"
                  href={`tel:${emergency.number}`}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
                >
                  {emergency.label} - {emergency.number}
                </Button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SOS;
