# simple-weather-viewer-47457-47466

This repository contains a minimal Vite web frontend that provides a simple weather viewer.

## Weather Frontend

Path: `weather_frontend/`

- Framework: Vite + React (no heavy UI deps)
- Theme: Ocean Professional (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827)
- Features:
  - Search a city and view current weather
  - Loading and error states
  - Responsive, modern styling

### Configure API base

The app builds the API base URL in the following order:

1. `import.meta.env.VITE_API_BASE`
2. `import.meta.env.VITE_BACKEND_URL`
3. `'/api'` (default, useful when served behind a reverse proxy)

Set `VITE_API_BASE` in your environment or a `.env` file. See `weather_frontend/.env.example`.

Expected endpoint:

GET `${API_BASE}/weather?city=London`

Example response shape (extra fields are ignored):

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

### Run locally

1. Navigate to the frontend:
   ```
   cd weather_frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. (Optional) Create `.env` with your API base:
   ```
   cp .env.example .env
   # edit .env and set VITE_API_BASE
   ```
4. Start dev server:
   ```
   npm run dev
   ```

Dev server defaults to port 3000. The app will call:
`${VITE_API_BASE || VITE_BACKEND_URL || '/api'}/weather?city=<CITY>`

### Notes

- No third-party API keys are embedded in the frontend.
- HTTP/JSON errors and network failures are handled gracefully.