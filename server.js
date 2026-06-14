import express from 'express';
import ollama from 'ollama';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static('.'));

const MODEL = 'minimax-m2.1:cloud';

app.post('/audit', async (req, res) => {
  const code = req.body.code || '';
  if (!code.trim()) return res.json({ issues: [], summary: 'No code provided' });

  const prompt = `You are a Next.js/React performance auditor. Analyze this component and find ALL issues.

Rules:
- Find memory leaks (missing cleanup in useEffect, closures, subscriptions)
- Find bad hooks (missing deps, incorrect use of useCallback/useMemo)
- Find re-render problems (inline functions/objects as props, key issues)
- Find performance anti-patterns (heavy computations in render, bad state management)
- Find missing error boundaries, key prop warnings

For each issue return: { "type": "performance"|"memory"|"hooks"|"anti-pattern", "severity": "high"|"medium"|"low", "line": <number>, "message": "<clear explanation>", "fix": "<suggested fix code>" }

Component code:
\`\`\`jsx
${code}
\`\`\`

Return ONLY a JSON object: { "issues": [...], "score": <0-100>, "summary": "<one line summary>" }`;

  try {
    const response = await ollama.chat({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      options: { temperature: 0.1 }
    });

    const raw = response.message.content;
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    let result;
    try { result = JSON.parse(cleaned); } catch {
      try { result = JSON.parse(cleaned.match(/\{[\s\S]*\}/)?.[0] || '{}'); } catch { result = {}; }
    }

    res.json({
      issues: result.issues || [],
      score: typeof result.score === 'number' ? result.score : 50,
      summary: result.summary || 'Analysis complete'
    });
  } catch (err) {
    res.json({ issues: [], score: 0, summary: 'Error: ' + err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n[nextjs-auditor] http://localhost:${PORT}`);
  console.log(`nexagaze project — built by Founder Bilal`);
  console.log(`Contact: ai@nexagaze.com | WhatsApp: 03103860653\n`);
});
