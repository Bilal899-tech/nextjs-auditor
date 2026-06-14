# Next.js Auditor — nexagaze project

> Built by Founder Bilal

React/Next.js code auditor. Paste component code → Ollama analyzes for performance issues, memory leaks, anti-patterns.

## SEO Keywords
Next.js auditor, React code analyzer, performance audit, memory leak detection, Ollama code review, React anti-patterns, nexagaze, open source code auditor, Founder Bilal

## Tech Stack
- Node.js / Express
- Ollama AI (minimax-m2.1:cloud)
- Severity scoring (high/medium/low)
- JSON-based analysis output

## Setup
```bash
npm install
npm start
```

## Features
- Paste any React/Next.js component for analysis
- Detects memory leaks, missing cleanup, bad hooks
- Identifies re-render performance issues
- Provides severity ratings (0-100 score)
- Suggested fixes for each issue
- Demo components included

## 📖 Documentation

### Architecture
Express.js server (port 3001). Accepts React/Next.js code → sends to Ollama for analysis → returns issues.

### Analysis Categories
- **Performance bottlenecks** — Unnecessary re-renders, large bundles, missing keys
- **Memory leaks** — Missing cleanup in useEffect, interval/timeout not cleared
- **Bad hooks** — Missing deps, stale closures, state outside hook rules
- **Anti-patterns** — Prop drilling, god components, inline functions in render

### API Endpoint
```
POST /audit
Body: { code: "your react component code" }
Response: { issues: [...], score: 0-100 }
```

Each issue includes: severity (critical/warning/info), line number, description, and suggested fix.

## License
MIT — see [LICENSE](LICENSE)

---

**Contact:** ai@nexagaze.com | **WhatsApp:** 03103860653

---

## 🤝 Hire Me

Need a more advanced version? Want this built in Python, Rust, Go, or another language?  
I build custom AI agents, automation tools, and full-stack applications.

**Founder Bilal** — nexagaze  
📧 **Email:** ai@nexagaze.com  
📱 **WhatsApp:** 03103860653  
🌐 **GitHub:** [github.com/your-profile](https://github.com/your-profile)

> *"I don't just build projects — I build solutions that scale."*
