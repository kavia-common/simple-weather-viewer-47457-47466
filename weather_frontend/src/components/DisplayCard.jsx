import React from 'react';

/**
// PUBLIC_INTERFACE
function DisplayCard({ data }) {
  /** Displays weather information.
   * Expects normalized data:
   * { city, tempC, condition, iconUrl, humidity, windKph, feelsLikeC }
   */
  if (!data) return null;

  const {
    city,
    tempC,
    condition,
    iconUrl,
    humidity,
    windKph,
    feelsLikeC
  } = data;

  return (
    <div className="result-card" aria-live="polite">
      <div className="result-header">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={condition || 'Weather icon'}
            width={40}
            height={40}
            style={{ borderRadius: 8, background: '#f3f4f6' }}
          />
        ) : null}
        <div className="city">{city}</div>
        {condition ? <span className="badge">{condition}</span> : null}
      </div>

      <div className="result-body">
        <div className="metric">
          <span className="label">Temperature</span>
          <strong>{tempC != null ? `${tempC} °C` : '—'}</strong>
        </div>
        <div className="metric">
          <span className="label">Feels like</span>
          <span>{feelsLikeC != null ? `${feelsLikeC} °C` : '—'}</span>
        </div>
        <div className="metric">
          <span className="label">Humidity</span>
          <span>{humidity != null ? `${humidity}%` : '—'}</span>
        </div>
        <div className="metric">
          <span className="label">Wind</span>
          <span>{windKph != null ? `${windKph} kph` : '—'}</span>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
