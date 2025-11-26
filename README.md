# JobDirect

JobDirect is a modern, good-looking job search web app built with React, Vite, Tailwind CSS, and TypeScript.  
It is designed as a lightweight, direct job search experience similar to Indeed or Bumeran, with filters by region and category.

## Features

- 🔍 Search for jobs by title, company, or keyword
- 🌎 Filter by region (Lima, Bogotá, Mexico City, Remote, etc.)
- 🏷 Filter by category (Technology, Marketing, Sales, Design, etc.)
- 📄 Job detail page with description, responsibilities, and requirements
- 📱 Responsive design with a modern, dark UI
- 🐳 Dockerfile included for production deployment

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Production build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build -t jobdirect .
docker run -p 5173:80 jobdirect
```

Or using docker-compose:

```bash
docker-compose up --build
```
