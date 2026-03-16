// Attach our listener with 'capture: true' to be the first to respond
window.addEventListener('beforeunload', (event) => {
    // Check if we are even on a meeting URL
    const path = window.location.pathname;
    const isMeetingUrl = path !== "/" && path !== "/landing";

    if (isMeetingUrl) {
        // Perform a "Just-in-Time" DOM check if a meeting is currently active.
        // We have a few methods to check for an active meeting, ranging from most stable to least stable, and we'll use them in a short-circuit manner as fallbacks.

        // We look for positive-indicators that only exist on the meeting screen like the microphone mute/unmute or the "Leave call" buttons.
        const micButton = document.querySelector('button[data-is-muted]');
        const leaveButton = document.querySelector('button[aria-label="Leave call"]');
        
        // We look for negative-indicators that only exist on the "You left" screen (when the meeting is over), like the "Rejoin" button.
        // These are based on current Google Meet IDs, and are subject to chnage, probably.
        const rejoinButton = document.querySelector('button[jsname="oI7Fj"]'); // "Rejoin" button
        const leftMessage = document.querySelector('h1[jsname="r4nke"]'); // "You left the meeting" heading

        if (leaveButton || micButton || (!rejoinButton && !leftMessage)) {
            // Intercept the leave event and stop Google Meet from getting it.
            // This is to stop Google's internal "You left" redirect logic from taking place unnecessarily.
            event.stopImmediatePropagation();
            
            // Trigger the native browser confirmation dialog
            event.preventDefault();

            const dialogMessage = chrome.i18n.getMessage("dialogMessage");
            // returnValue is a legacy feature, and best practice is to trigger the dialog by invoking event.preventDefault() on the BeforeUnloadEvent object, while also setting returnValue to support legacy cases.
            // A generic browser-specified string is displayed in the dialog, regardless of what we put here. Setting it to just about any truthy value (or non-empty string) will cause the dialog to be triggered.
            event.returnValue = dialogMessage;
            return dialogMessage;
        }
    }
}, { capture: true });

console.log(chrome.i18n.getMessage("consoleMessage"));