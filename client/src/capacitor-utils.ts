import { Capacitor } from '@capacitor/core';

// Helper function to detect if app is running in Capacitor (native) environment
export const isNativeApp = () => {
  return Capacitor.isNativePlatform();
};

// Handle back button for Android devices
export const setupBackButtonHandler = (customHandler?: () => boolean) => {
  // Only work in native environment
  if (isNativeApp()) {
    document.addEventListener('ionBackButton', (ev: any) => {
      // Prevent default behavior
      ev.detail.register(10, () => {
        // If a custom handler is provided and it returns true, don't do default behavior
        if (customHandler && customHandler()) {
          return;
        }
        
        // Default behavior - go back in history or exit if on main page
        if (window.history.length > 1) {
          window.history.back();
        } else {
          // This would normally trigger exiting the app
          // But we're not implementing a full exit solution here
          console.log('Would exit app here');
        }
      });
    });
  }
};

// Helper to adapt to different screen sizes and platforms
export const getPlatformSpecificStyles = () => {
  if (isNativeApp()) {
    // Adjust for mobile native UI elements like status bars
    return {
      paddingTop: '16px',
      paddingBottom: '16px',
      // Any other platform-specific styles
    };
  }
  
  return {};
};