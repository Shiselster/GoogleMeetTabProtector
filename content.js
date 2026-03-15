function preventAccidentalClose(event) {
    const path = window.location.pathname;

    // Ignore the home page (/) and the landing page (/landing) page.
    // Meeting IDs are usually alphanumeric strings like /abc-defg-hij
    const isActualMeeting = path !== "/" && 
                            path !== "/landing" && 
                            !path.startsWith("/help");

    if (isActualMeeting) {
        // Standard modern approach
        event.preventDefault();
        
        // Legacy fallback (using a truthy string)
        event.returnValue = "Are you sure you want to leave the meeting?";
        
        return "Are you sure you want to leave the meeting?";
    }
}

// Use 'capture: true' to ensure our listener fires as early as possible
window.addEventListener('beforeunload', preventAccidentalClose, { capture: true });

console.log("Google Meet Safe-Close: Protection active for this meeting.");