import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setAllTimeline } from "../utils/GsapScroll";
import BlackHoleGroup from "./BlackHoleGroup";

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRotation = useRef({ x: 0 });
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanedUp = false;
    let timeoutId: ReturnType<typeof setTimeout>;
    let tiltTrigger: gsap.core.Tween | null = null;

    gsap.set(container, { opacity: 0 });
    const progress = setProgress((value) => setLoading(value));

    progress.loaded().then(() => {
      if (cleanedUp) return;

      // Restore career/timeline scroll animations (originally called by the Character model)
      setAllTimeline();

      // Horizontal → vertical tilt as user scrolls into What I Do
      tiltTrigger = gsap.to(groupRotation.current, {
        x: Math.PI / 2,
        ease: "none",
        scrollTrigger: {
          trigger: ".whatIDO",
          start: "top 80%",
          end: "center 30%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      timeoutId = setTimeout(() => {
        if (!cleanedUp) gsap.to(container, { opacity: 1, duration: 1.2 });
      }, 2500);
    });

    return () => {
      cleanedUp = true;
      clearTimeout(timeoutId);
      gsap.killTweensOf(container);
      tiltTrigger?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div className="character-container">
      {/* z-index 0: sits behind page text (z-index 9) and navbar (12+).
          Canvas alpha:true — particles float over the dark page background. */}
      <div
        className="character-model"
        ref={containerRef}
        style={{ zIndex: 0 }}
      >
        <Canvas
          camera={{ position: [0, 5, 9], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.1} />
          <BlackHoleGroup rotationRef={groupRotation} />
          <EffectComposer>
            <Bloom
              intensity={1.4}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default Scene;
