/**
 * Stores the JWT token and its expiry time in localStorage.
 * @param token - The JWT token string.
 * @param expiresIn - The expiry time as a UNIX timestamp (seconds).
 */
export function setAuthData(token: string, expiresIn: number) {
  localStorage.setItem('token', token);
  localStorage.setItem('expires_in', expiresIn.toString());
}

/**
 * Clears all authentication data from localStorage.
 */
export function clearAuthData() {
  console.log("sdmemde")
  localStorage.clear();
}

/**
 * Checks if the stored JWT token is expired.
 * @returns true if expired or not present, false otherwise.
 */
export function isTokenExpired(): boolean {
  const expiresIn = localStorage.getItem('expires_in');

  if (!expiresIn) return true;
  const now = Math.floor(Date.now() / 1000); // current time in seconds
  console.log("expiresIn", expiresIn, "now", now);
  return now >= parseInt(expiresIn, 10);
}

/**
 * Sets up a timer to clear auth data and call onExpire when the token expires.
 * @param onExpire - Callback to run when the token expires.
 */
export function setupTokenExpiryHandler(onExpire: () => void) {
  const expiresIn = localStorage.getItem('expires_in');
  if (!expiresIn) return;
  const now = Math.floor(Date.now() / 1000);
  const timeout = (parseInt(expiresIn, 10) - now) * 1000;
  if (timeout > 0) {
    setTimeout(() => {
      clearAuthData();
      onExpire();
    }, timeout);
  } else {
    clearAuthData();
    onExpire();
  }
}