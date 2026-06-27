// Single source of truth for the chatbot's knowledge. Authored verbatim from
// the public résumé PDF linked by the RESUME button (SocialIcons.tsx).
// ponytail: résumé as a string module; swap to fs+includeFiles only if it needs
// to be edited by non-devs.
export const RESUME = `
Prahar Shah
Email: praharshah2005@gmail.com
Mobile: +91-8735840688
GitHub: https://github.com/cyrotine
LinkedIn: https://www.linkedin.com/in/prahar-shah-b81b7a311/

SUMMARY
Computer Science undergraduate (CGPA 7.99) specializing in Generative AI and
Agentic systems. Built 2+ production multi-agent LangGraph pipelines and
deep-learning models reaching 96% accuracy, with strength in RAG, LLM
orchestration, and FastAPI. LeetCode Knight (top 5% globally).

EDUCATION
The LNM Institute of Information Technology (LNMIIT) — Jaipur, India
Bachelor of Technology, Computer Science and Engineering
CGPA: 7.99 | July 2023 – June 2027
Relevant courses: Operating Systems, Data Structures, Analysis of Algorithms,
Object Oriented Programming, Networking, Databases.

EXPERIENCE
AI & ML Intern — Shipturtle Pvt. Ltd., India (Hybrid) | May 2025 – July 2025
- Built LLM-powered automation features (Gemini API + prompt engineering) to
  extract and structure product/catalog data, cutting manual data-entry effort
  by ~40%.
- Developed FastAPI backend services and REST API integrations supporting core
  multi-vendor marketplace workflows.
- Engineered Python automation pipelines for data ingestion and processing,
  streamlining recurring operational tasks across multiple vendor stores.

SKILLS
- Languages: C, C++, Java, JavaScript, Python, HTML, CSS
- Generative AI & LLMs: Gemini API, Few-shot Prompting, Information Extraction,
  Hallucination Mitigation
- Agentic AI & RAG: LangGraph, Multi-Agent Workflows, RAG, Tool-Using Agents,
  Pipeline Orchestration
- ML & Data Science: scikit-learn, Pandas, NumPy, Matplotlib, Data Preprocessing,
  EDA, Model Evaluation
- Computer Vision: OCR (Tesseract), Image Processing (Pillow), MRI-based Deep Learning
- Backend & Tools: FastAPI, Async APIs, Web Scraping (Tavily, Trafilatura),
  React.js, Git, GitHub

PROJECTS

Forge — Autonomous Multi-Agent Software Engineer (2026)
- Engineered a 6-agent LangGraph pipeline (Issue Analyzer, Planner, Developer,
  QA, Reviewer, PR Generator) that converts a GitHub issue into a merge-ready
  pull request, automating 8 manual engineering steps end-to-end.
- Built a RAG knowledge base indexing 100% of a repository's source files via
  tree-sitter parsing and Qdrant vector search, fusing semantic chunks with
  full-file context to raise patch accuracy.
- Automated the full Git lifecycle — isolated per-run workspaces, unified-diff
  patching, branch/commit/push, and PR creation via GitHub REST API — with a
  3-iteration auto-repair loop, served on a real-time Next.js 15 dashboard
  streaming live state across all 6 stages.
- Tech stack: Python, FastAPI, LangGraph, Gemini API, Qdrant, PostgreSQL, Next.js.
- Link: https://github.com/cyrotine/Sentinel

VeriFlow — Multi-Agent Generative AI Fact-Checking System (2026)
- Built a 5-agent LangGraph pipeline (extraction, retrieval, verification,
  contradiction detection, judging); cut LLM API cost by ~60% by consolidating
  calls from 5 to 2 per claim.
- Accelerated evidence retrieval by 3x via parallel async scraping of 10+ sources
  (Tavily API); achieved sub-3s end-to-end latency with FastAPI async queuing.
- Hardened against prompt injection with 100% input sanitization across all 5
  agent nodes.
- Tech stack: Python, LangGraph, Gemini API, Tavily API, FastAPI, React.
- Link: https://github.com/cyrotine/Backend-Veriflow

CERTIFICATES & ACHIEVEMENTS
- Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
  (Oct 2025) — credential issued by Oracle University.
- Tata Elxsi Teleport 2026 — ranked in the top 73 out of 47,000+ registrations
  (top 0.16%) nationally.
- LeetCode Knight (max rating 1868) and Codeforces Pupil (max rating 1357) —
  solved 200+ problems, placing in the top 5% of rated competitive programmers globally.

CODING PROFILES
- Codeforces: https://codeforces.com/profile/prahar_0526
- LeetCode: https://leetcode.com/u/prahar_0526/
`;