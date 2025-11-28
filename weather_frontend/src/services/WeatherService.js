//
// WeatherService - builds API base URL and fetches current weather for a city
//

// PUBLIC_INTERFACE
export function buildApiBase() {
  /**
   * Determine the API base URL.
   * Order: import.meta.env.VITE_API_BASE -> import.meta.env.VITE_BACKEND_URL -> '/api'
   */
  const env = import.meta?.env || {};
  const base =
    env.VITE_API_BASE?.trim() ||
    env.VITE_BACKEND_URL?.trim() ||
    '/api';
  // Ensure no trailing slash
  return base.replace(/\/+$/, '');
}

// PUBLIC_INTERFACE
export async function getCurrentWeather(city) {
  /**
   * Fetch current weather for a given city.
   * Returns normalized data:
   * {
   *   city, tempC, condition, iconUrl, humidity, windKph, feelsLikeC
   * }
   * Throws an Error on non-2xx responses or network failure.
   */
  if (!city || !city.trim()) {
    throw new Error('City is required');
  }
  const base = buildApiBase();
  const url = `${base}/weather?city=${encodeURIComponent(city.trim())}`;
  let res;
  try {
    // eslint-disable-next-line no-undef
    res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
  } catch {
    throw new Error('Network error: failed to reach weather service');
  }

  if (!res.ok) {
    const text = await safeReadText(res);
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    // attempt to parse text fallback gracefully
    const text = await safeReadText(res);
    throw new Error(`Invalid JSON response${text ? `: ${text}` : ''}`);
  }

  // Normalize response using expected fields with fallbacks
  const normalized = {
    city: data.city || data.name || city,
    tempC: pickNumber(data.tempC ?? data.temperatureC ?? data.temp ?? data.temperature, null),
    condition: data.condition || data.weather || data.description || '',
    iconUrl: data.iconUrl || data.icon || null,
    humidity: pickNumber(data.humidity, null),
    windKph: pickNumber(data.windKph ?? data.wind_kph ?? data.windSpeed ?? data.wind, null),
    feelsLikeC: pickNumber(data.feelsLikeC ?? data.feelslike_c ?? data.feels_like ?? data.apparentTempC, null)
  };

  return normalized;
}

async function safeReadText(res) {
  try {
    return await res.text();
  } catch {
    return '';
  }
}

function pickNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
