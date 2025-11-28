import { useEffect, useRef, useState } from 'react';

/*
// PUBLIC_INTERFACE
*/
function SearchBar(props) {
  /** A search bar with input and submit button.
   * Props:
   * - value: string (controlled input value)
   * - onChange: (next: string) => void
   * - onSubmit: () => void
   * - loading: boolean
   */
  const { value, onChange, onSubmit, loading } = props;
  const [internal, setInternal] = useState(value ?? '');
  const debounceRef = useRef(null);

  // Keep internal state in sync with parent
  useEffect(() => {
    setInternal(value ?? '');
  }, [value]);

  // Debounce typing to call onChange after idle
  useEffect(() => {
    if (!onChange) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(internal);
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [internal, onChange]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div className="searchbar" role="search">
      <input
        type="text"
        placeholder="Search city (e.g., London)"
        aria-label="City name"
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        inputMode="search"
        autoCapitalize="words"
        autoCorrect="off"
        autoFocus
      />
      <button
        className="button"
        type="button"
        onClick={() => onSubmit?.()}
        disabled={loading}
        aria-busy={loading ? 'true' : 'false'}
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </div>
  );
}

export default SearchBar;
