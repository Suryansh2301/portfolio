# Suryansh Kumar Pathak — Portfolio

A two-part project: a static frontend and a small Node/Express backend
that serves it and hands out the resume as real file downloads.

## Structure

```
portfolio/
├── frontend/
│   ├── index.html      # Page markup
│   ├── style.css        # All styling
│   └── script.js        # Active nav-link highlight, footer year
├── backend/
│   ├── server.js         # Express server
│   ├── package.json
│   └── files/
│       ├── Suryansh_Kumar_Pathak_Resume.pdf
│       └── Suryansh_Kumar_Pathak_Resume.docx
└── README.md
```

## Running it locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
cd backend
npm install
npm start
```

Then open **http://localhost:3000** — the backend serves the frontend
directly, so this one URL is all you need.

## How it fits together

- `backend/server.js` uses `express.static` to serve everything in
  `frontend/` (so `index.html`, `style.css`, `script.js` load normally).
- The **Download Resume** buttons on the page point to
  `/api/resume/pdf` and `/api/resume/docx`. The backend streams the
  actual files from `backend/files/` — nothing is base64-embedded in
  the HTML anymore.
- `GET /api/health` returns `{ "status": "ok" }`, useful once this is
  deployed somewhere and you want a quick uptime check.

## A note on opening `frontend/index.html` directly

Because the resume buttons now call a backend API, double-clicking
`frontend/index.html` in a browser will load the page and styling
fine, but those two download buttons will 404 — there's no server
behind them. Run the backend (above) for the full site to work, or
deploy both pieces together (see below).

## Deploying

Any Node host works since it's a single small Express app:
[Render](https://render.com), [Railway](https://railway.app), or a
basic VPS all work well for a project this size.

1. Push this whole `portfolio/` folder to a Git repo.
2. Set the service's root/start directory to `backend/`.
3. Build command: `npm install`. Start command: `npm start`.
4. The platform will set `PORT` automatically — `server.js` already
   reads `process.env.PORT`, so no code changes are needed.

If you'd rather host the frontend and backend on separate services
(e.g. frontend on GitHub Pages, backend on Render), update the two
`href="/api/resume/..."` links in `frontend/index.html` to your
backend's full URL instead of a relative path.

## Updating content

- **Resume**: replace the two files in `backend/files/` — keep the
  exact filenames, or update the paths in `server.js` to match.
- **Page copy**: edit `frontend/index.html` directly.
- **Colors/fonts/spacing**: edit `frontend/style.css`.
