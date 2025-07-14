import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLoading } from '@/contexts/LoadingContext';

// Custom hook that automatically shows page loader on route changes
export const useAutoPageLoader = (enabled = true) => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!enabled) return;

    // Show loader immediately on route change
    const loadingText = getPageLoadingText(location.pathname);
    setLoading(true, loadingText);

    // Hide loader after a short delay to allow page to mount
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [location.pathname, setLoading, enabled]);
};

// Get appropriate loading text based on route
const getPageLoadingText = (pathname: string): string => {
  if (pathname.includes('/ip-addresses')) {
    return 'Loading IP Addresses...';
  }
  if (pathname.includes('/domains')) {
    return 'Loading Domains...';
  }
  if (pathname.includes('/vulnerabilities')) {
    return 'Loading Vulnerabilities...';
  }
  if (pathname.includes('/risk-assessments')) {
    return 'Loading Risk Assessments...';
  }
  if (pathname.includes('/security-profile')) {
    return 'Loading Security Profile...';
  }
  if (pathname.includes('/customer-portfolio')) {
    return 'Loading Customer Portfolio...';
  }
  if (pathname.includes('/customer-summary')) {
    return 'Loading Customer Summary...';
  }
  if (pathname.includes('/settings')) {
    return 'Loading Settings...';
  }
  if (pathname.includes('/login')) {
    return 'Loading Login...';
  }
  
  return 'Loading Page...';
};
