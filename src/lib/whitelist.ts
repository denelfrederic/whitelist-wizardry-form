
// Simple storage simulation for demonstration
// In a real application, this would connect to a database
const STORAGE_KEY = 'dadvisor_whitelist';
const MAX_SPOTS = 300;

interface WhitelistEntry {
  email: string;
  name: string;
  timestamp: number;
}

// Get current whitelist from localStorage
export const getWhitelist = (): WhitelistEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse whitelist data', e);
    return [];
  }
};

// Add a new entry to the whitelist
export const addToWhitelist = (name: string, email: string): { success: boolean; message: string } => {
  const whitelist = getWhitelist();
  
  // Check if whitelist is full
  if (whitelist.length >= MAX_SPOTS) {
    return { 
      success: false, 
      message: 'Sorry, all spots have been filled. Please check back later for general registration.' 
    };
  }
  
  // Check if email already exists
  if (whitelist.some(entry => entry.email === email)) {
    return { 
      success: false, 
      message: 'This email is already registered for the whitelist.' 
    };
  }
  
  // Add new entry
  const newWhitelist = [
    ...whitelist,
    { name, email, timestamp: Date.now() }
  ];
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newWhitelist));
  
  return { 
    success: true, 
    message: `Congratulations! You've secured a spot on our whitelist.` 
  };
};

// Get current whitelist count
export const getWhitelistCount = (): number => {
  return getWhitelist().length;
};

// Get max spots
export const getMaxSpots = (): number => {
  return MAX_SPOTS;
};
