import axios from 'axios';

// Create a counter to track active requests
let activeRequests = 0;
let loaderCallbacks: { show: (text?: string) => void; hide: () => void } | null = null;

// Set up the loader callbacks
export const setupApiInterceptor = (callbacks: { show: (text?: string) => void; hide: () => void }) => {
  loaderCallbacks = callbacks;
};

// Reset function to clear stuck requests
export const resetApiLoader = () => {
  console.log('Resetting API loader - clearing all active requests');
  activeRequests = 0;
  if (loaderCallbacks) {
    loaderCallbacks.hide();
  }
};

// Create axios instance with interceptors
export const apiClient = axios.create({
  timeout: 30000, // 30 second timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request started:', config.url);
    
    activeRequests++;
    console.log('Active requests:', activeRequests);
    
    // Show loader for the first request
    if (activeRequests === 1 && loaderCallbacks) {
      const loadingText = getLoadingText(config.url || '');
      console.log('Showing loader:', loadingText);
      loaderCallbacks.show(loadingText);
    }
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.log('API Request error in interceptor:', error);
    activeRequests = Math.max(0, activeRequests - 1);
    console.log('Active requests after request error:', activeRequests);
    
    if (activeRequests === 0 && loaderCallbacks) {
      console.log('Hiding loader due to request error');
      loaderCallbacks.hide();
    }
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.config.url);
    
    activeRequests = Math.max(0, activeRequests - 1);
    console.log('Active requests after response:', activeRequests);
    
    // Hide loader when all requests are complete
    if (activeRequests === 0 && loaderCallbacks) {
      console.log('Hiding loader - all requests complete');
      loaderCallbacks.hide();
    }
    
    return response;
  },
  (error) => {
    console.log('API Response error:', error.config?.url, error.message);
    
    activeRequests = Math.max(0, activeRequests - 1);
    console.log('Active requests after error:', activeRequests);
    
    // Hide loader when all requests are complete
    if (activeRequests === 0 && loaderCallbacks) {
      console.log('Hiding loader due to response error');
      loaderCallbacks.hide();
    }
    
    // Handle auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('customerDomain');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Get appropriate loading text based on URL
const getLoadingText = (url: string): string => {
  if (url.includes('/get-vendor-ip-detail')) {
    return 'Loading IP details...';
  }
  if (url.includes('/get-vendor-ip')) {
    return 'Loading IP addresses...';
  }
  if (url.includes('/login')) {
    return 'Signing in...';
  }
  if (url.includes('/domains')) {
    return 'Loading domains...';
  }
  if (url.includes('/vulnerabilities')) {
    return 'Loading vulnerabilities...';
  }
  if (url.includes('/risk-assessment')) {
    return 'Loading risk assessment...';
  }
  if (url.includes('/security-profile')) {
    return 'Loading security profile...';
  }
  
  return 'Loading...';
};

export default apiClient;
