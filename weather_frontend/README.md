# Simple Weather Viewer (Frontend)

Vite + React frontend that lets users search for a city and view current weather with a clean "Ocean Professional" theme.

## Configure API Base

The frontend determines the API base URL in this order:

1. `VITE_API_BASE`
2. `VITE_BACKEND_URL`
3. `'/api'` (default)

Set `VITE_API_BASE` in a `.env` file or environment variable. See `.env.example` for guidance.

The app will request:
`GET {API_BASE}/weather?city=<CITY>`

Expected JSON fields (extra fields are ignored):
```json
{
  "city": "London",
  "tempC": 12.4,
  "condition": "Cloudy",
  "iconUrl": "https://example.com/icon.png",
  "humidity": 73,
  "windKph": 15.2,
  "feelsLikeC": 11.0
}
```

## Run Locally

- Install and start:
  ```
  npm install
  npm run dev
  ```

- Optional: create `.env` and set `VITE_API_BASE`:
  ```
  cp .env.example .env
  # edit .env and set VITE_API_BASE=https://your-weather-backend.example.com
  ```

## Tech Notes

- Vite + React 18
- No heavy UI dependencies
- Styling via `src/theme.css` with the Ocean Professional palette
- Error-safe JSON parsing and network failure handling
