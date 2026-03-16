# Local OKR analyze server

The app can send your strategy document **to this server** when you click **Load OKR Tree**, so analysis runs on your machine and your API key never goes to the browser.

## Run the server

From the project root (or from `server/`):

```bash
# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-your-key"; node server/analyze.js

# Mac/Linux
OPENAI_API_KEY=sk-your-key node server/analyze.js
```

Server listens on **http://localhost:3099** (or set `PORT=3099` to change it).

## In the app

1. In **Local AI server**, enter: `http://localhost:3099`
2. Upload or paste your strategy document, select department, click **Load OKR Tree**
3. The app POSTs the document to `http://localhost:3099/analyze`; the server calls OpenAI and returns the OKR tree

No OpenAI API key is needed in the browser when using the local server.
