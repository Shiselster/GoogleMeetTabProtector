let isProtectionActive = true;

// Intercepts the leave event and stops Google Meet from getting it.
function preventAccidentalClose(event) {
    const path = window.location.pathname;
    const isMeetingUrl = path !== "/" && path !== "/landing";

    if (isProtectionActive && isMeetingUrl) {
        // Stop Google's own listeners from seeing this event
        event.stopImmediatePropagation();

        // Trigger the browser dialog
        event.preventDefault();
        event.returnValue = "Stay in meeting?";
        return "Stay in meeting?";
    }
}

//  If you click the "Leave call" button, we turn off protection.
document.addEventListener('click', (e) => {
    // Google Meet buttons usually have aria-labels. 
    // We look for the "Leave call" or "End call" buttons.
    const leaveButton = e.target.closest('button[aria-label="Leave call"], button[aria-label="End call"]');

    if (leaveButton) {
        console.log("Google Meet Safe-Close: Intentional hangup detected. Disabling protection.");
        isProtectionActive = false;
    }
}, { capture: true });

//  Watches the DOM. If the "You left the meeting" screen appears, 
//  disable protection immediately so the tab can be closed.
const observer = new MutationObserver(() => {
    // We look for common elements on the "You left" screen, like the "Rejoin" button
    const rejoinButton = document.querySelector('button[jsname="oI7Fj"]'); // Current Google Meet 'Rejoin' button ID
    const leftMessage = document.body.innerText.includes("You left the meeting");

    if (rejoinButton || leftMessage) {
        if (isProtectionActive) {
            console.log("Google Meet Safe-Close: Meeting ended.");
            isProtectionActive = false;
        }
    } else {
        // If we are back in a meeting (e.g., after a rejoin), re-enable protection
        const inCallUI = document.querySelector('[data-is-muted]');
        if (inCallUI && !isProtectionActive) {
            isProtectionActive = true;
        }
    }
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

// Attach our listener with 'capture: true' to be the first to respond
window.addEventListener('beforeunload', preventAccidentalClose, { capture: true });

const path = window.location.pathname;
const isMeetingUrl = path !== "/" && path !== "/landing";
if (isProtectionActive && isMeetingUrl) {
    console.log("Google Meet Safe-Close: Protection Enabled.");
} else {
    console.log("Google Meet Safe-Close: Protection inactive in landing page.");
}