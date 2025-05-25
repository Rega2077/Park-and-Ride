const cache = new Map();

// Set cache
export const setCache = (key, value) => {
  cache.set(key, {
    value,
    timestamp: Date.now()
  });
};

// Get cache (no expiry)
export const getCache = (key) => {
  const data = cache.get(key);
  if (!data) return null;
  return data.value;
};

// Get cache with TTL
export const getCacheWithTTL = (key, ttlInMs) => {
  const data = cache.get(key);
  if (!data) return null;

  const isExpired = Date.now() - data.timestamp > ttlInMs;
  return isExpired ? null : data.value;
};

// Invalidate a cache key manually
export const invalidateCache = (key) => {
  cache.delete(key);
};
