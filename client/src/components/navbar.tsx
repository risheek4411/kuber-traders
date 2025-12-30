import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Products", href: "#products" },
    { name: "Network", href: "#network" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
             <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
               K
             </div>
          </div>
          <div className={`font-display font-bold text-2xl tracking-tight transition-colors ${isScrolled ? "text-primary" : "text-white"}`}>
            Kuber<span className="text-secondary">Traders</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium tracking-wide hover:text-secondary transition-colors ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </button>
          ))}
          <Button 
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => handleNavClick("#contact")}
          >
            <Phone className="w-4 h-4 mr-2" />
            +91 99268 67455
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-current"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className={isScrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-foreground" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 text-lg font-medium text-foreground hover:text-primary"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                className="w-full bg-primary"
                onClick={() => handleNavClick("#contact")}
              >
                Call Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
