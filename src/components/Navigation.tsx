import { Link, useLocation, useNavigate } from "react-router-dom";
import { Shield, Menu, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/simulations", label: "Simulations" },
    { to: "/learning", label: "Learning" },
    { to: "/govt-resources", label: "Govt Resources" },
    { to: "/safety-map", label: "Safety Map" },
    { to: "/heatmap", label: "Heatmap" },
    { to: "/chatbot", label: "AI Assistant" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSOS = () => {
    navigate("/sos"); // Navigates to SOS page
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span className="gradient-text">SecurEd</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Login Button */}
            <Link to="/auth">
              <Button variant="default" size="sm">
                Login
              </Button>
            </Link>

            {/* SOS Button */}
            <Button
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-700 text-white ml-2"
              size="sm"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              SOS
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.to) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="sm" className="w-full">
                  Login
                </Button>
              </Link>

              {/* Mobile SOS Button */}
              <Button
                onClick={() => {
                  handleSOS();
                  setIsOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white w-full"
                size="sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                SOS
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
