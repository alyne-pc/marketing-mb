export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Get login URL - now just redirects to local login page
export const getLoginUrl = () => {
  return `${window.location.origin}/login`;
};

