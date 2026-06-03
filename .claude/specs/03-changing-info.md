# Spec: Portfolio Personalization (Prahar Shah)

## Overview

Replace all remaining hardcoded personal content with config-driven values and update portfolio content so it accurately reflects Prahar Shah's profile, projects, skills, and technology stack.

This spec intentionally avoids layout, animation, styling, Three.js, and structural changes. The goal is to personalize content while preserving the existing design.

---

# Depends On

None.

Can be implemented independently.

---

# Components

## Modify: `src/components/Loading.tsx`

Replace:

```tsx
"Prahar Shah"
```

with:

```tsx
config.developer.fullName
```

Replace:

```tsx
"AI Engineer"
"Full Stack Developer"
```

with:

```tsx
config.developer.title
config.developer.subtitle
```

---

## Modify: `src/components/Landing.tsx`

Replace hardcoded role strings:

```tsx
AI Engineer
Full-Stack Developer
```

with:

```tsx
config.developer.title
config.developer.subtitle
```

---

## Modify: `src/components/Navbar.tsx`

Replace:

```tsx
PH
```

with:

```tsx
config.developer.logo
```

---

## Modify: Project Card Component

Where project cards are rendered from:

```tsx
config.projects.map(...)
```

add a project action:

```text
Visit Project →
```

Requirements:

* Uses `project.github`
* Opens in new tab
* No hardcoded URLs

Example:

```tsx
<a
  href={project.github}
  target="_blank"
  rel="noopener noreferrer"
>
  Visit Project →
</a>
```

---

## Modify: `src/components/SocialIcons.tsx`

Do NOT wire up the resume yet.

Leave existing behavior unchanged.

Do not add:

```tsx
config.resume.pdf
```

Do not create a resume file.

Resume functionality will be added in a future spec.

---

# Config Changes (`src/config.ts`)

---

## 1. Update `config.developer`

```ts
developer: {
  name: "Prahar",
  fullName: "Prahar Shah",
  logo: "PH",

  title: "AI & ML Engineer",

  subtitle: "Full-Stack Developer",

  description:
    "I enjoy building intelligent systems that can reason, retrieve information, and make decisions. My work spans agentic AI, large language models, medical AI, and full-stack applications. I'm particularly interested in creating practical AI products that solve real-world problems at scale.",
}
```

---

## 2. Update `config.about.description`

Replace with:

```text
I'm a Computer Science student at LNMIIT Jaipur exploring the intersection of AI systems, machine learning, and software engineering. From multi-agent fact-checking pipelines and RAG workflows to medical imaging models and full-stack web applications, I enjoy turning complex ideas into products people can actually use. When I'm not building AI projects, you'll usually find me solving algorithmic problems, experimenting with new technologies, or refining developer tools.
```

### Important

Do not reuse resume wording such as:

* "Experienced in..."
* "Focused on..."
* "Skilled in..."
* "Computer Science undergraduate focused on..."

Portfolio copy should feel personal and creator-oriented.

---

## 3. Replace `config.projects`

Replace existing placeholder projects with:

```ts
projects: [
  {
    id: 1,
    title: "VeriFlow",
    category: "Agentic AI",
    technologies: "Python, LangGraph, Gemini API, Tavily API, FastAPI, React",
    image: "/images/veriflow.png",
    github: "https://github.com/cyrotine/Backend-Veriflow",
    description:
      "A multi-agent fact verification platform that combines retrieval, reasoning, and evidence analysis to evaluate claims in real time. Built with LangGraph and optimized for low-latency verification across multiple sources.",
  },

  {
    id: 2,
    title: "Ai4Alzheimer",
    category: "Medical AI",
    technologies: "Python, TensorFlow, Keras, EfficientNet, Scikit-Learn",
    image: "/images/ai4alzheimer.png",
    github:
      "https://colab.research.google.com/drive/1m07HBqdY5lDPycoR9BvKpLBdTrj91X7V",
    description:
      "An MRI-based diagnostic system using transfer learning to identify stages of Alzheimer's disease. Trained on thousands of scans and optimized for strong predictive performance and stability.",
  },

  {
    id: 3,
    title: "Disease Diagnosis",
    category: "Machine Learning",
    technologies: "Python, Pandas, NumPy, Matplotlib, Scikit-Learn",
    image: "/images/disease-diagnosis.png",
    github:
      "https://colab.research.google.com/drive/1n92KUZzYnxgiK_0p54q6rPNq_PRd4_Eh",
    description:
      "A clinical analytics project focused on uncovering diagnostic patterns from biomarker data through statistical analysis, visualization, and machine learning workflows.",
  },
]
```

---

## 4. Update `config.skills`

```ts
skills: {
  develop: {
    title: "AI & ML ENGINEER",

    description:
      "Agentic AI, LLM applications & intelligent systems",

    details:
      "Designing multi-agent workflows, RAG pipelines, medical AI systems, and production-ready AI applications using modern LLM tooling.",

    tools: [
      "Python",
      "LangGraph",
      "Gemini API",
      "RAG",
      "Multi-Agent Systems",
      "FastAPI",
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "Computer Vision",
      "OCR",
      "Tavily",
    ],
  },

  design: {
    title: "FULL-STACK",

    description:
      "Modern web applications & backend systems",

    details:
      "Building responsive interfaces, scalable APIs, and developer-focused tooling with a strong engineering foundation.",

    tools: [
      "React",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Python",
      "C++",
      "Java",
      "Git",
      "GitHub",
      "REST APIs",
      "HTML",
      "CSS",
    ],
  },
}
```

---

## 5. Update Tech Stack

If a dedicated tech stack section exists, replace existing entries with:

```ts
techStack: [
  "Python",
  "C++",
  "Java",
  "JavaScript",
  "TypeScript",

  "React",
  "FastAPI",

  "LangGraph",
  "Gemini API",
  "RAG",
  "Multi-Agent AI",

  "TensorFlow",
  "Keras",
  "Scikit-Learn",

  "Pandas",
  "NumPy",
  "Matplotlib",

  "Computer Vision",
  "OCR (Tesseract)",

  "Tavily",

  "Git",
  "GitHub",
]
```

Remove placeholder technologies that are not part of Prahar's current workflow.

---

# Three.js / R3F

No changes.

---

# Animation

No changes.

---

# CSS

No changes.

---

# Files To Modify

* `src/config.ts`
* `src/components/Loading.tsx`
* `src/components/Landing.tsx`
* `src/components/Navbar.tsx`
* Project rendering component

---

# Files To Create

None.

---

# New Packages

None.

---

# Implementation Rules

* Keep existing layout unchanged
* Keep existing component structure unchanged
* Keep existing animations unchanged
* Keep existing styling unchanged
* Targeted edits only
* No large-scale refactors
* No new dependencies
* No hardcoded project URLs
* Use config-driven values wherever possible
* Do not remove `config.experiences`

---

# Definition Of Done

* Loading screen uses `config.developer.fullName`
* Loading marquee uses `config.developer.title`
* Loading marquee uses `config.developer.subtitle`
* Hero section uses config-driven titles
* Navbar logo uses `config.developer.logo`
* About section reflects Prahar's actual background
* Portfolio copy no longer sounds like a resume
* Work section shows exactly:

  * VeriFlow
  * Ai4Alzheimer
  * Disease Diagnosis
* Every project card contains:

  * Visit Project →
  * Opens GitHub/demo link in a new tab
* Skills section reflects AI/ML and Full-Stack expertise
* Tech Stack section reflects actual technologies used
* `npm run dev` succeeds
* `npm run build` succeeds
