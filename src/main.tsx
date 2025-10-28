import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Leaflet styles for maps
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(<App />);
