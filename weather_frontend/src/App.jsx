import React, { useCallback, useState } from 'react';
import './theme.css';
import SearchBar from './components/SearchBar.jsx';
import DisplayCard from './components/DisplayCard.jsx';
import { getCurrentWeather, buildApiBase } from './services/WeatherService.js';

// PUBLIC_INTERFACE
/**
 * Main application shell for the weather viewer.
 */
function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [result, setResult] = useState(null);

  const doSearch = useCallback(async () => {
    setErrorMsg('');
    setResult(null);
    const city = query.trim();
    if (!city) {
      setErrorMsg('Please enter a city name.');
      return;
    }
    setLoading(true);
    try {
      const data = await getCurrentWeather(city);
      setResult(data);
    } catch (e) {
      setErrorMsg(e?.message || 'Something went wrong while fetching weather.');
    } finally {
      setLoading(false);
    }
  }, [query]);

  const apiBase = buildApiBase();

  return (
    <div>
      <header className="app-header">
        <div className="container">
          <h1 className="title">Simple Weather Viewer</h1>
          <p className="subtitle">
            Type a city and view current weather. API Base: <code>{apiBase}</code>
          </p>
        </div>
      </header>

      <main className="main">
        <div className="panel" role="region" aria-label="Weather panel">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={doSearch}
            loading={loading}
          />

          {loading ? (
            <div className="loader" aria-live="polite">
              <div className="spinner" aria-hidden="true"></div>
              <span>Loading current weather…</span>
            </div>
          ) : null}

          {errorMsg ? (
            <div className="error-banner" role="alert">
              {errorMsg}
            </div>
          ) : null}

          {result ? <DisplayCard data={result} /> : null}
        </div>
      </main>
    </div>
  );
}

/** Export the main App component */
export default App;
