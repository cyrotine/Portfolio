import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { MdOpenInNew } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
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
          trigger: ".work-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-grid">
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
