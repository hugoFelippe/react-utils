export const fetchLocalStorage = (key, defaultValue) => {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    return value ? value : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const clearLocalStorage = (key = null) =>
  key ? localStorage.removeItem(key) : localStorage.clear();
