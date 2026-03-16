/**
 * Local AI server for OKR tree analysis.
 * Run: OPENAI_API_KEY=sk-... node server/analyze.js
 * App sends document + department; server returns OKR tree JSON.
 * Keeps your API key on your machine instead of in the browser.
 */
import http from 'http';

const PORT = Number(process.env.PORT) || 3099;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

function buildSystemPrompt(dept) {
  return `You are an expert OKR strategist following the Continuous Discovery Habits framework (Teresa Torres).

CORE PRINCIPLES:
- OKRs define desired OUTCOMES (changes in user behavior, experience, or business performance), never outputs or solutions.
- Objectives are QUALITATIVE descriptions of desired outcomes.
- Key Results are QUANTITATIVE measures that prove the outcome is being achieved.
- Solutions, features, technologies, and implementation details must NEVER appear in OKRs.

Given a strategy document for the "${dept}" department, extract the underlying outcomes and structure them into a clean OKR tree.

Return ONLY valid JSON (no markdown, no code fences) matching this exact schema.
Hierarchy: Objective (outcome) → Key Results (metrics) → Initiatives (actions to move the metrics).

{
  "name": "<Department> Strategy <Year Range>",
  "type": "company",
  "color": "#9b30ff",
  "detail": "<One sentence describing the north star outcome>",
  "children": [
    {
      "name": "<Objective - the outcome you want to achieve>",
      "type": "objective",
      "color": "<hex color>",
      "companyOkr": "<Company OKR this supports>",
      "detail": "<One sentence describing the desired outcome>",
      "children": [
        {
          "name": "<Key Result - metric that proves the outcome is improving>",
          "type": "kr",
          "timeline": "<year or quarter>",
          "color": "<same hex as parent>",
          "detail": "<What this metric measures>",
          "children": [
            {
              "name": "<What the initiative is - solution or experiment>",
              "type": "initiative",
              "color": "<same hex as parent>",
              "detail": "<Why it should move this KR; how success will be evaluated. Parent KR = which metric it impacts.>"
            }
          ]
        }
      ]
    }
  ]
}

RULES:
1. Objective = the outcome you want to achieve. Must describe desired OUTCOMES — NEVER features, deliverables, or solutions.
2. Key Results = metrics that prove the outcome is improving. Must measure OBSERVABLE OUTCOMES.
3. Initiatives = solutions or experiments intended to move Key Results. Each must show: what it is, which KR it impacts (parent), why it moves that metric, how success is evaluated. Sit under Key Results.
4. Key Results should follow: "[Increase/Reduce] [metric] from [baseline] to [target]" when numbers are provided.
5. Each Objective should have 2-5 Key Results. Each Key Result can have 1+ Initiatives.
6. NEVER reference specific technologies, tools, platforms, or features (e.g. no "Braze", "CEP", "chatbot", "AI assistant"). If the document describes a solution, translate it into the outcome it intends to achieve.
7. Every node MUST have a "detail" field with a plain-English explanation of the intended behavior change.
8. Use distinct hex colors per strategic objective. Choose from: #9b30ff, #22d3ee, #06b6d4, #22c55e, #4ade80, #a855f7, #c084fc, #e879f9, #6366f1, #14b8a6.
9. Keep names concise (under 50 characters). Put context in "detail".
10. If the document states metrics/targets, use them. If not, describe the qualitative outcome.
11. Every objective MUST have a "companyOkr" field mapping to one of: "Grow Up‑Market", "Flawless at the Fundamentals", "Strengthen the P&L", "Invest and Innovate". Choose the best fit based on the objective's focus.
12. Return ONLY the JSON object. No explanatory text, no markdown.`;
}

async function callOpenAI(dept, text) {
  const truncated = text.substring(0, 60000);
  const systemPrompt = buildSystemPrompt(dept);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Here is the strategy document for the ${dept} department. Parse it into an OKR tree:\n\n${truncated}` },
      ],
      temperature: 0.3,
      max_tokens: 8000,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  let content = data.choices[0].message.content.trim();
  content = content.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(content);
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url.split('?')[0];

  if (req.method !== 'POST' || (url !== '/analyze' && url !== '/chat')) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Use POST /analyze or POST /chat.' }));
    return;
  }

  let body = '';
  for await (const chunk of req) body += chunk;
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    return;
  }

  if (!OPENAI_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server: OPENAI_API_KEY not set.' }));
    return;
  }

  if (url === '/chat') {
    const { messages, temperature, max_tokens } = payload;
    if (!Array.isArray(messages) || messages.length === 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Body must include "messages" (array).' }));
      return;
    }
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
          temperature: temperature ?? 0.4,
          max_tokens: max_tokens ?? 800,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI API error: ${response.status}`);
      }
      const data = await response.json();
      const content = data.choices[0].message.content.trim();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ content }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'Chat failed.' }));
    }
    return;
  }

  const { dept, text } = payload;
  if (!dept || typeof text !== 'string' || text.length < 50) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Body must include "dept" (string) and "text" (string, min 50 chars).' }));
    return;
  }

  try {
    const tree = await callOpenAI(dept, text);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tree));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message || 'Analysis failed.' }));
  }
});

server.listen(PORT, () => {
  console.log(`OKR analyze server: http://localhost:${PORT}`);
  if (!OPENAI_API_KEY) console.warn('WARNING: OPENAI_API_KEY not set. Set it to use AI analysis.');
});
