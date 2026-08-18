const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const FILES_DIR = path.join(__dirname, 'files');

// Serve the static frontend (index.html, style.css, script.js)
app.use(express.static(FRONTEND_DIR));

// Resume downloads — real files on disk, served through the API
app.get('/api/resume/pdf', (req, res) => {
  res.download(
    path.join(FILES_DIR, 'Suryansh_Kumar_Pathak_Resume.pdf'),
    'Suryansh_Kumar_Pathak_Resume.pdf',
    (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ error: 'Resume PDF not found on server.' });
      }
    }
  );
});

app.get('/api/resume/docx', (req, res) => {
  res.download(
    path.join(FILES_DIR, 'Suryansh_Kumar_Pathak_Resume.docx'),
    'Suryansh_Kumar_Pathak_Resume.docx',
    (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ error: 'Resume DOCX not found on server.' });
      }
    }
  );
});

// Simple health check, useful once this is deployed
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Any unknown route falls back to the SPA's index page
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
