import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "ACHIEVEMENTS", href: "#achievements" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  // Lenis smooth scroll init
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.stop();

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Desktop inline links — use Lenis scroll
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) lenis.scrollTo(target, { offset: 0, duration: 1.5 });
          }
        }
      });
    });

    window.addEventListener("resize", () => lenis?.resize());

    return () => {
      lenis?.destroy();
    };
  }, []);

  // Set initial hidden state for sidebar
  useEffect(() => {
    if (dropdownRef.current) {
      gsap.set(dropdownRef.current, { display: "none", x: "100%" });
    }
  }, []);

  // Sidebar open/close animation
  useEffect(() => {
    const dropdown = dropdownRef.current;
    const links = linksRef.current;
    if (!dropdown || !links) return;

    const isVisible = window.getComputedStyle(dropdown).display !== "none";

    if (isOpen) {
      gsap.set(dropdown, { display: "flex" });
      gsap.fromTo(
        dropdown,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.inOut" }
      );
      gsap.fromTo(
        Array.from(links.children),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", delay: 0.15 }
      );
    } else {
      if (!isVisible) return;
      gsap.to(dropdown, {
        x: "100%",
        duration: 0.35,
        ease: "power3.inOut",
        onComplete: () => { gsap.set(dropdown, { display: "none" }); },
      });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href) as HTMLElement;
    if (!target) return;
    if (window.innerWidth > 1024 && lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {config.developer.logo}
        </a>
        <a
          href={`mailto:${config.contact.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {config.contact.email}
        </a>

        {/* Desktop inline links — hidden below 1024px via CSS */}
        <ul className="nav-desktop-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a data-href={href} href={href}>
                <HoverLinks text={label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger — hidden at ≥1024px via CSS */}
        <button
          className={`nav-menu-btn${isOpen ? " nav-menu-open" : ""}`}
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle navigation"
          data-cursor="disable"
        >
          <span className="nav-menu-line" />
          <span className="nav-menu-line" />
        </button>
      </div>

      {/* Backdrop — closes sidebar on outside click */}
      {isOpen && (
        <div className="nav-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar panel */}
      <div className="nav-dropdown" ref={dropdownRef}>
        <ul className="nav-dropdown-links" ref={linksRef}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                className="nav-dropdown-item"
                onClick={() => handleNavClick(href)}
                data-cursor="disable"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
