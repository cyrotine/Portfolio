import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { lenis } from "./Navbar";
import { MdOpenInNew } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin the whole section and scroll the cards horizontally.
    mm.add("(min-width: 1025px)", () => {
      const section = document.querySelector(".work-section") as HTMLElement | null;
      const pin = document.querySelector(".work-pin") as HTMLElement | null;
      const track = document.querySelector(".work-track") as HTMLElement | null;
      if (!section || !pin || !track) return;

      const distance = () => track.scrollWidth - pin.clientWidth;
      // ponytail: hold the pin ~2.4× the travel so vertical scroll clearly stops and
      // TechStack stays hidden until the cards finish. scrub maps the full travel across
      // this length, so the cards still land exactly on release. Tune factor for feel.
      const HOLD = () => distance() * 2.4;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + HOLD(),
          pin: section,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    // Tablet/mobile: keep the original vertical fade-in stagger, no pin.
    mm.add("(max-width: 1024px)", () => {
      const tween = gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".work-track",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      return () => tween.kill();
    });

    // Keep ScrollTrigger in sync with Lenis smooth scroll. Deferred one frame so
    // Navbar's effect has assigned `lenis` before we subscribe (no-op if still null).
    const onScroll = () => ScrollTrigger.update();
    const raf = requestAnimationFrame(() => lenis?.on("scroll", onScroll));

    return () => {
      cancelAnimationFrame(raf);
      lenis?.off("scroll", onScroll);
      mm.revert();
    };
  }, []);

  return (
    <div className="work-section" id="projects">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-pin">
          <div className="work-track">
          {config.projects.map((project) => {
            const techs = project.technologies.split(",").map((t) => t.trim());
            const visibleTechs = techs.slice(0, 3);
            const extraCount = techs.length - 3;
            return (
              <div className="work-card" key={project.id}>
                <div className="work-card-image">
                  <span className="work-card-category">{project.category}</span>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="work-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="work-card-tags">
                    {visibleTechs.map((tech) => (
                      <span key={tech} className="work-tag">
                        {tech}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className="work-tag work-tag-more">
                        +{extraCount}
                      </span>
                    )}
                  </div>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-visit-btn"
                    data-cursor="disable"
                  >
                    <MdOpenInNew /> Visit Project
                  </a>
                )}
              </div>
            );
          })}
          </div>
        </div>
        <div className="work-footer">
          <a
            href={config.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="work-see-all"
            data-cursor="disable"
          >
            See All Works →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Work;
