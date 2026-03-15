function preventAccidentalClose(event) {
    // We only want to trigger the warning if you are in a meeting URL (e.g., /abc-defg-hij).
    // This ignores the main Google Meet home page (/).
    if (window.location.pathname !== "/" && window.location.pathname.length > 1) {
        
        // Cancel the event as stated by the standard.
        event.preventDefault();
        
        // Chrome requires returnValue to be set to trigger the native confirmation dialog.
        event.returnValue = '';
        
        return '';
    }
}

// Attach the listener to the window
window.addEventListener('beforeunload', preventAccidentalClose);

console.log("Google Meet Safe-Close extension is active. Accidental closures will be prevented.");